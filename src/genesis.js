const dotenv = require('dotenv');
dotenv.config();
const BITBOXSDK = require("bitbox-sdk");
const BigNumber = require("bignumber.js");
const slpjs = require("slpjs");
const { stringify, opFromAltStack, hexToBin } = require("@bitauth/libauth");
const {
  Contract,
  SignatureTemplate,
  Transaction,
  ElectrumNetworkProvider,
} = require("cashscript");
const { compileFile } = require ("cashc");
const path = require("path");
const { makePremiumWallet } = require("./utils/makeWallets");

// FOR MAINNET UNCOMMENT
const BITBOX = new BITBOXSDK.BITBOX({ restURL: process.env.REST_URL });

const {
  premiumBchAddr,
  premiumPkh,
  premiumCompressedWif,
  premiumPk,
  premiumKeyPair,
} = makePremiumWallet();

const fundingAddress = slpjs.Utils.toSlpAddress(premiumBchAddr);
const fundingWif = premiumCompressedWif;
const tokenReceiverAddress = fundingAddress;
const bchChangeReceiverAddress = premiumBchAddr;
// temporarily keeping the minting baton in our address so we can get the Token Id after genesis
let batonReceiverAddress = fundingAddress;

const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);

let balances;
(async function () {
  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);
  console.log("Premium address:", premiumBchAddr);
  console.log("BCH balance:", balances.satoshis_available_bch);

  if (balances.satoshis_available_bch < 1000) {
    console.log(
      "Funding address does not have enough balance! Please send some bch there first => ",
      premiumBchAddr
    );
    return;
}

  // 2) Select decimal precision for this new token
  let decimals = process.env.DECIMALS;
  let name = process.env.NAME;
  let ticker = process.env.SYMBOL;
  let documentUri = process.env.DOC_URL;
  let documentHash = null;
  let initialTokenQty = 1;

  // 3) Calculate the token quantity with decimal precision included
  initialTokenQty = new BigNumber(initialTokenQty).times(10 ** decimals);

  // 5) Use "simpleTokenGenesis()" helper method
  let genesisTxid;
  try {
    genesisTxid = await bitboxNetwork.simpleTokenGenesis(
      name,
      ticker,
      initialTokenQty,
      documentUri,
      documentHash,
      decimals,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress,
      balances.nonSlpUtxos.map((x) => ({ ...x, wif: fundingWif }))
    );
  } catch (e) {
    console.log("Token genesis transaction failed", e);
    return;
  }

  console.log("GENESIS txn complete! Token Id =>", genesisTxid);
  console.log("[Progress] Making the contract now ...");

  // Compile the P2PKH contract to an artifact object
  const artifact = compileFile(
    path.join(__dirname, "yieldContract.cash")
  );
  const provider = new ElectrumNetworkProvider("mainnet");
  const contract = new Contract(artifact, [premiumPkh, genesisTxid], provider);

  // Get contract balance & output address + balance
  const balance = await contract.getBalance();
  console.log("contract address:", contract.address);

  console.log("[Progress] sending the baton to the contract...");

  // 1) Get all balances at the funding address.

  balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress);

  if (balances.slpBatonUtxos[genesisTxid]) {
    console.log("You have the minting baton for this token");
  } else {
    throw Error("You don't have the minting baton for this token");
  }

  // 2) Fetch critical token decimals information using bitdb
  let tokenDecimals;

  const tokenInfo = await bitboxNetwork.getTokenInformation(genesisTxid);
  tokenDecimals = tokenInfo.decimals;
  console.log("Token precision: " + tokenDecimals.toString());

  // WAIT FOR ASYNC METHOD TO COMPLETE

  // 3) Multiply the specified token quantity by 10^(token decimal precision)
  let mintQty = new BigNumber(0).times(10 ** decimals);

  // 4) Filter the list to choose ONLY the baton of interest
  // NOTE: (spending other batons for other tokens will result in losing ability to mint those tokens)
  let inputUtxos = balances.slpBatonUtxos[genesisTxid];

  // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
  inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);

  // 6) Set the proper private key for each Utxo
  inputUtxos.forEach((txo) => (txo.wif = fundingWif));

  // 7) MINT token using simple function
  let mintTxid;

  batonReceiverAddress = slpjs.Utils.toSlpAddress(contract.address);

  mintTxid = await bitboxNetwork.simpleTokenMint(
    genesisTxid,
    mintQty,
    inputUtxos,
    tokenReceiverAddress,
    batonReceiverAddress,
    bchChangeReceiverAddress
  );
  console.log("MINT txn complete:", mintTxid);
})();