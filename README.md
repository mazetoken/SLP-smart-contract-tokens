## REBEL (MAZE-REBEL) & VANDALS (MAZE_VANDALS) by [MAZE SLP Token](https://mazetoken.github.io)

REBEL & VANDALS are [cashscript](https://cashscript.org/) smart contract SLP Type-1 tokens. The token minting baton is stored in a contract that has the ability to mint REBEL or VANDALS tokens. This is another way to distribute SLP tokens in a decentralized, permissionless way

REBEL token id: 4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968

VANDALS token id: 30d05b44dc304db9cf56a6138c1dfdbb24f7c8d9e26c87a8079acc461e61b684

Farm/mint amount: 1000 REBEL or 1000 VANDALS

_This repository is forked from https://github.com/p0o/yield-farming-bch-smart-contract and prepared to mint REBEL and VANDALS_

_Read the article about "Yield Farming Bitcoin Cash Contract" by [p0oker](https://read.cash/@p0oker/yield-farming-in-bitcoin-cash-a-practical-guide-2eecbc74)_

The main difference between this repository and the original repository is that we use use nodejs CJS Loader instead ES Module Loader, wallet derivation path is changed, some npm packages (eg. cashscript) and REST API are updated too

## Tutorial (Windows; should work on Linux too):

### To farm/mint REBEL or VANDALS SLP tokens you need to:

- install [Nodejs](https://nodejs.org/en/) 14.x LTS

- clone or download and unzip this repository

- open unzipped folder, open .env file (in eg. notepad) and type random 12 words passphrase (mnemonic) - the wallet will be generated for you by the script (the derivation path is set to m/44'/245'/0'/0/0)

- change token environment in .env file to mint REBEL or VANDALS

- open a command line (cmd or PowerShell), navigate to the directory (you have downloaded and unzipped) and type commands:

`npm i`

_*Igonore warnings/errors (keccak ..., secp256k1 ...)_

`node src/yieldFarming.js`

- you will see Alice (yours) BCH address, Alice wallet private key (WIF) and contract address. Copy and save Alice BCH address and private key - WIF (you will need it later)

- send 0.00003400 BCH to Alice BCH address (this is your wallet) from another wallet (do not send more than 0.00003400 BCH at once)

- wait for a few minutes and type/paste the command again:

`node src/yieldFarming.js`

- you will see contract working and 1000 REBEL or VANDALS will be sent to your wallet

- to mint another 1000 tokens wait for a few minutes, type `node src/yieldFarming.js`, send 0.00003400 BCH to Alice BCH address, wait for a few minutes and then type again `node src/yieldFarming.js` (repeat this step to mint more tokens)

### To get into your wallet, where your tokens are, you can:

- create a new Electron Cash SLP wallet or another wallet that uses m/44'/245'/0'/0/0 derivation path, by importing Alice private key - WIF (you have saved before)

_To send REBEL tokens from Alice (your) wallet send some BCH (eg. 0.00000600 BCH) to Alice wallet first and than you can withdraw tokens to another wallet_

_*If you need any help go to MAZE SLP Token [Telegram Group](https://t.me/mazeslptoken)_

### To create a token like REBEL or VANDALS:

- remove token id from .env file (leave it empty "")

- set your token environment: name, symbol and your website url

- type command: `node src/genesis.js`

- you will get token id - paste it to .env tokenId field

- type command: `node src/yieldFarming.js`

_* defaul amount is 1000 SLP tokens with 2 decimals. You can change that in ... (convert decimals to hexadecimals) and then change DECIMALS in .env file_

-----------------------------------------------------------------------------------------

#### _This is from the original repository:_

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
