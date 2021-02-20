const BITBOX = require("bitbox-sdk").BITBOX;
const { mnemonicAlice, mnemonicPremium } = require("../config");
const bitbox = new BITBOX();

function makePremiumWallet() {
  const seedForPremium = bitbox.Mnemonic.toSeed(mnemonicPremium);

  const hdNode = bitbox.HDNode.fromSeed(seedForPremium);
  const premiumHdNode = bitbox.HDNode.derive(hdNode, 0);
  const premiumKeyPair = bitbox.HDNode.toKeyPair(premiumHdNode);

  const premiumPk = bitbox.ECPair.toPublicKey(premiumKeyPair);
  const premiumPkh = bitbox.Crypto.hash160(premiumPk);
  const premiumBchAddr = bitbox.Address.toCashAddress(premiumHdNode.getAddress());

  return {
    premiumPk,
    premiumPkh,
    premiumBchAddr,
    premiumHdNode,
    premiumKeyPair,
  };
}

function makeAliceWallet() {
  const seedForAlice = bitbox.Mnemonic.toSeed(mnemonicAlice);

  const hdNode = bitbox.HDNode.fromSeed(seedForAlice);
  const aliceHdNode = bitbox.HDNode.derivePath(hdNode, "m/44'/245'/0'/0/0");
  const aliceKeyPair = bitbox.HDNode.toKeyPair(aliceHdNode);

  // Derive alice's public key and public key hash
  const alicePk = bitbox.ECPair.toPublicKey(aliceKeyPair);
  const alicePkh = bitbox.Crypto.hash160(alicePk);
  const aliceBchAddr = bitbox.Address.toCashAddress(aliceHdNode.getAddress());
  const aliceCompressedWif = bitbox.HDNode.toWIF(aliceHdNode);

  return {
    alicePk,
    alicePkh,
    aliceBchAddr,
    aliceKeyPair,
    aliceCompressedWif,
  };
}

exports.makePremiumWallet = makePremiumWallet;
exports.makeAliceWallet = makeAliceWallet;
