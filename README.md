## REBEL (MAZE-REBEL), VANDALS (MAZE-VANDALS) & CARTEL (MAZE-CARTEL) SLP trilogy by [MAZE SLP Token](https://mazetoken.github.io). If you need help ask in MAZE [Telegram Group](https://t.me/mazeslptoken)

REBEL, VANDALS and CARTEL are [cashscript](https://cashscript.org/) smart contract [SLP Type 1](https://slp.dev/specs/slp-token-type-1/) tokens. The token minting baton is stored in a contract that has the ability to mint REBEL, VANDALS or CARTEL tokens. This is another way to distribute SLP tokens in a decentralized, permissionless way

_*This is not an investment advice or recommendation_

REBEL, VANDALS and CARTEL are tokens of appreciation, loyalty or reward tokens or ...

REBEL token id: [4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968](https://simpleledger.info/token/4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968)

![rebel](img/Rebel320.png)

VANDALS token id: [30d05b44dc304db9cf56a6138c1dfdbb24f7c8d9e26c87a8079acc461e61b684](https://simpleledger.info/token/30d05b44dc304db9cf56a6138c1dfdbb24f7c8d9e26c87a8079acc461e61b684)

![VANDALS](img/Vandals320.png)

CARTEL token id: [7b5d1aa0918d96540997db8313e3b06231bc6fd84a020c282f9c774c7729abf9](https://simpleledger.info/token/7b5d1aa0918d96540997db8313e3b06231bc6fd84a020c282f9c774c7729abf9)

![CARTEL](img/Cartel320.png)

Farm/mint amount: 1000 REBEL, 1000 VANDALS or 1000 CARTEL

_This repository is forked from https://github.com/p0o/yield-farming-bch-smart-contract and prepared to mint REBEL, VANDALS or CARTEL_

_Read the article about "Yield Farming Bitcoin Cash Contract" by [p0oker](https://read.cash/@p0oker/yield-farming-in-bitcoin-cash-a-practical-guide-2eecbc74)_

The main difference between this repository and the original repository is that we use use nodejs CJS Loader instead ES Module Loader, wallet derivation path is changed, some npm packages (eg. cashscript) and REST API are updated too

## Tutorial (Windows; should work on Linux too):

### To farm/mint REBEL, VANDALS or CARTEL SLP tokens:

- install [Nodejs](https://nodejs.org/en/) 14.x LTS

- clone or download and unzip this repository (SLP-smart-contract-tokens). You can copy it to your drive C eg. C://SLP-smart-contract-tokens-main

- go to https://iancoleman.io/bip39/ to generate BIP39 mnemonic (12 words) and save it

- go to SLP-smart-contract-tokens-main folder, open .env file (in eg. notepad) and type/paste mnemonic you generated (12 words passphrase) - the wallet will be created for you later by the script (the derivation path is set to m/44'/245'/0'/0/0). You can use your own random mnemonic (12 words) but it might not work as expected (however it worked for me)

- change token environment in .env file to mint REBEL, VANDALS or CARTEL

- open a command line (cmd or PowerShell), navigate to the SLP-smart-contract-tokens-main directory (eg. type one by one: `cd ..` `cd ..` `cd SLP-smart-contract-tokens-main` and type commands:

`npm i`

_*Igonore warnings/errors (keccak ..., secp256k1 ...)_

`node src/yieldFarming.js`

- you will see Alice (yours) BCH address, Alice wallet private key (WIF) and contract address. Copy and save Alice BCH address and private key - WIF (you will need it later)

- send 0.00003400 BCH to Alice BCH address (this is your wallet) from another wallet (do not send more than 0.00003400 BCH at once)

- wait for a few minutes (untill the command line is ready) and type/paste the command again:

`node src/yieldFarming.js`

- you will see contract working and 1000 REBEL or VANDALS will be sent to your wallet (wait for a few minutes untill the command line is ready)

- to mint another 1000 tokens - if the command line is ready - type `node src/yieldFarming.js`, send 0.00003400 BCH to Alice BCH address, wait for a few minutes and then type again `node src/yieldFarming.js` (repeat this step to mint more tokens)

### To get into your wallet, where your tokens are:

- create a new Electron Cash SLP wallet with "Importing Bitcoin Cash addressess or private keys" option (do not create a standard wallet or multi-signature wallet) - use Alice private key (WIF you have saved before), go to Tokens tab - you should see your tokens there

_To send REBEL tokens from Alice (your) wallet send some BCH (eg. 0.00000600 BCH) to Alice wallet address first and than you can withdraw tokens to another wallet (send tokens and check "Also send BCH" - send max)_

_*If you need any help go to MAZE SLP Token [Telegram Group](https://t.me/mazeslptoken)_

### To create a token like REBEL, VANDALS or CARTEL:

- remove token id from .env file (leave it empty "")

- set your token environment: name, symbol and your website url

- type command: `node src/genesis.js`

_*Send some BCH (eg. 0.00003400) to the funding address if asked_

- you will get token id - paste it to .env tokenId field

- type command: `node src/yieldFarming.js`

_* default amount is 1000 SLP tokens with 2 decimals. You can change that in yieldFarming.js line 104 and yieldFarming.cash line 25 (convert amount decimals to hexadecimals) and then change DECIMALS in .env file; eg. 1000 tokens with 2 decimals is "0x00000000000186A0", 1000 tokens with 8 decimals is "0x000000174876E800", 500 tokens with 4 decimals is "0x00000000004C4B40" etc. You can use https://www.binaryhexconverter.com/decimal-to-hex-converter_

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
