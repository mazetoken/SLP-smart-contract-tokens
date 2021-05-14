const BITBOX = require("bitbox-sdk").BITBOX;
const { stringify } = require("@bitauth/libauth");
const {
  Contract,
  SignatureTemplate,
  CashCompiler,
  ElectrumNetworkProvider,
} = require("cashscript");
const path = require("path");

const { makePremiumWallet, makeAliceWallet } = require("./utils/makeWallets");
const findMintingBaton = require("./utils/findMintingBaton");
const { tokenId } = require("./config");

(async () => {
  // Initialise BITBOX
  const bitbox = new BITBOX();
  const premiumAmount = 1000; // 1000 satoshi investment to premium
  const hardCodedFee = 1200;

  // this is the premium address, could be your coompany/service bch address
  // which users should pay to this address to mint tokens for themselves
  const { premiumPkh, premiumBchAddr } = makePremiumWallet();

  // This is alice address, the hypothethical end-user
  const { alicePk, alicePkh, aliceBchAddr, aliceKeyPair, aliceCompressedWif } = makeAliceWallet();

  console.log("Alice address =>", aliceBchAddr);
  console.log("Alice private key WIF =>", aliceCompressedWif);

  // Compile the P2PKH contract to an artifact object
  const artifact = CashCompiler.compileFile(
    path.join(__dirname, "yieldContract.cash")
  );

  const provider = new ElectrumNetworkProvider("mainnet");
  const contract = new Contract(artifact, [premiumPkh, tokenId], provider);

  // Get contract balance & output address + balance
  const balance = await contract.getBalance();
  console.log("contract address =>", contract.address);

  let aliceUtxos = await provider.getUtxos(aliceBchAddr);
  // removing SLP utxos (this is not a reliable way to do it, it's only for test)
  aliceUtxos = aliceUtxos.filter((x) => x.satoshis > 546);

  // add signature template so these UTXOs will be signed as P2PKH
  aliceUtxos = aliceUtxos.map((utxo) => ({
    ...utxo,
    template: new SignatureTemplate(aliceKeyPair),
  }));

  const aliceBalance = aliceUtxos.reduce((sum, x) => sum + x.satoshis, 0);
  const totalPayments = premiumAmount + 546 + hardCodedFee;

  console.log("Alice balance =>", aliceBalance);

  if (aliceBalance > 10000) {
    console.log(
      "This contract still is not supporting change addresses. Please use a new address with smaller balance"
    );
    return;
  }

  // minimum 1000 should be paid to premium as investment
  // 1200 will be hard coded tx fee
  // 546 will be used for freshly minted tokens
  if (aliceBalance < totalPayments) {
    console.log(
      "Alice balance is %s please send 0.00003600 BCH to Alice address",
      aliceBalance
    );
    return;
  }

  // Find minting baton UTXO from the contract
  let mintingBaton;
  const utxos = await contract.getUtxos();

  try {
    mintingBaton = await findMintingBaton(utxos, tokenId);
  } catch (e) {
    console.log("Failed to find the minting Baton from the contract", e);
  }

  if (!mintingBaton) {
    console.log("Minting baton is not found!");
    return;
  }

  // Making the transaction to pay the premium and mint SLP to alice address using the minting baton
  // stored in the smart contract
  let tx = contract.functions
    .farm(alicePk, new SignatureTemplate(aliceKeyPair), premiumAmount)
    .from(aliceUtxos)
    .from(mintingBaton)
    .withOpReturn([
      "0x534c5000", // Lokad ID
      "0x01", // Token type
      "MINT", // Action
      `0x${tokenId}`, // Token ID
      "0x03", // Minting baton vout
      "0x00000000000186A0", // mint 1000 new tokens (considering 2 decimals)
    ])
    .to(aliceBchAddr, 546) // freshly minted tokens
    .to(premiumBchAddr, premiumAmount)
    .to(contract.address, 546)
    .withoutChange();

  // TODO: add change amount to the contract
  try {
    const result = await tx.send();
    console.log("transaction details:", stringify(result));
  } catch (e) {
    console.log(e);
  }
})();
