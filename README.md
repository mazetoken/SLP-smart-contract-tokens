## REBEL (MAZE-REBEL) by [MAZE SLP Token](https://mazetoken.github.io)

Token id:4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968

Farm/mint amount: 1000 REBEL

REBEL is a smart contract SLP token. The token minting baton is stored in a contract that has the ability to mint REBEL tokens. This is another way to distribute SLP tokens in a decentralized, permissionless way. The code is based on [CashScript](https://cashscript.org/)

_This repository is forked from (root repository) https://github.com/p0o/yield-farming-bch-smart-contract_

_Read the article about "Yield Farming Bitcoin Cash Contract" by [p0oker](https://read.cash/@p0oker/yield-farming-in-bitcoin-cash-a-practical-guide-2eecbc74)_

The main difference between this repository and the root repository is that I had to make the code to use nodejs CJS Loader instead ES Module Loader, change derivationPath for Alice wallet, get Alice WIF and change token variables for "farming" REBEL. Some npm packages are updated too. Thanks to p0oker for his assistance.

_This is for educational purposes. Use it at your own risk. To create a token like REBEL try the root repository (you need to change variables in genesis.js and in src/config.js)._

## Tutorial (Windows):

### To farm/mint REBEL you need to:

- install [Nodejs](https://nodejs.org/en/) 14.x LTS

- download and unzip this repository

- open unzipped (yield-farming-bch-smart-contract) folder, go to src folder, open config.js in your favourite editor (eg. notepad) and type random 12 words passphrase (mnemonic) for your wallet in mnemonicAlice line (the wallet will be generated for you by the script - the derivation path is set to m/44'/245'/0'/0/0). Save the file (do not change anything else)

_*You may notice a mnemonic for premium wallet - do not bother to recover a wallet with that phrase - it will not work_

- open a command line (cmd or PowerShell), navigate to your yield-farming-bch-smart-contract directory (you have downloaded and unzipped) and type commands:

`npm i`

_*Igonore warnings/errors (keccak ..., secp256k1 ...)_

`node src/yieldFarming.js`

- you will see Alice BCH address, Alice wallet private key - WIF and contract BCH address. Copy and save Alice BCH address and private key - WIF (you will need it later)

- send 0.00003600 BCH to Alice BCH address (this is your wallet) from another wallet (do not send more than 0.00004000 BCH)

- run the command again:

`node src/yieldFarming.js`

- you will see contract working and 1000 REBEL will be sent to Alice (your) wallet. You can check it in [explorer](https://explorer.bitcoin.com) - paste Alice BCH address in the search field

- to mint another 1000 REBEL type `node src/yieldFarming.js` and send 0.00003600 BCH to Alice BCH address and then type again `node src/yieldFarming.js` (repeat this step to mint more tokens)

### To get into your wallet, that stores REBEL tokens, you can:

- create a new Electron Cash SLP wallet or another wallet that uses m/44'/245'/0'/0/0 derivation path, by importing Alice private key - WIF (you have saved before)

_To send REBEL tokens from Alice (your) wallet send some BCH (eg. 0.00000600 BCH) to Alice wallet first and than you can withdraw tokens to another wallet_

_*If you need any help go to MAZE SLP Token [Telegram Group](https://t.me/mazeslptoken)_

### Smart contract fees:

- 0.00001000 BCH is sent to Premium BCH address

- at least 0.00001200 BCH is for blockchain fees

- 0.00000546 BCH is locked in tokens

-----------------------------------------------------------------------------------------

#### _This is from the root repository:_

## Yield Farming Bitcoin Cash Contract

This is a smart contract with helper libraries to create a token and insert the minting baton into a smart contract that is able to provide everyone the ability to mint the token with a payment to a P2PKH address called premium.

## Use cases

There are numerous use cases for this type of contract including but not limited to:

- Reward tokens for other contracts (e.g DeFi, AnyHedge, etc)
- Governance Token distribution
- Decentralized token sales without custody
- Loyalty tokens to a merchant's customers
- Fundraiser without assurance contract (e.g GoFundMe )
- Decentralized Exchange (requires and oracle for rates)

## Getting started

Clone the project, install the dependencies with NPM:

```
npm install
```

Open the `config.js` and enter the variables except tokenId. Run genesis.js using nodejs:

```
node src/genesis.js
```

The CLI will ask you to send some BCH to an address. 4000 satoshis would be fine. Run it again and you should have your genesisTokenId. Copy the id and insert it in `config.js`

Now run yieldFarming.js using node:

```
node src/yieldFarming.js
```

CLI again ask you to send some BCH to Alice address to pay for the premium and tx fees. Same amount as before would be sufficient. Run the same file again and you should have your tokens minted using the smart contract.

## Disclaimer

There are not enough testing done to this smart contract. It's an experimental type of atomic transaction and should be used with your own responsibility.
