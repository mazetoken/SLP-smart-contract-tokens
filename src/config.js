const dotenv = require('dotenv');
dotenv.config();
// Premium is the address that create the SLP initially
const mnemonicPremium = "cowboy spaceship lens vampire freak decrypt question business halos mminer achieve visit";

// Alice is the end user
const mnemonicAlice = process.env.MNEMONIC;

// You need to provide Token ID after running the genesis.js transaction
const tokenId = process.env.tokenId;

exports.mnemonicAlice = mnemonicAlice;
exports.mnemonicPremium = mnemonicPremium;
exports.tokenId = tokenId;