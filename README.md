## REBEL (MAZE-REBEL) by [MAZE SLP Token](https://mazetoken.github.io)

Token id:4b42d3f9c9aa48b78efc1fc05d4c92314352409d387880e5803358522a33e968

Mint amount: 1000 REBEL

REBEL is a smart contract SLP token. The token minting baton is stored in a contract that has the ability to mint REBEL tokens. This is another way to distribute SLP tokens in a decentralized, permissionless way. The code is based on [CashScript](https://cashscript.org/)

_This repository is forked from https://github.com/p0o/yield-farming-bch-smart-contract_

_Read the article about "Yield Farming Bitcoin Cash Contract" by [p0oker](https://read.cash/@p0oker/yield-farming-in-bitcoin-cash-a-practical-guide-2eecbc74)_

The main difference between this repository and the root repository is that I had to make the code to use nodejs CJS Loader instead ES Module Loader, change derivationPath for Alice wallet, change token variables for minting REBEL. Some npm packages are updated too. Thanks to p0oker for his assistance.

_This is for educational purposes. Use it at your own risk. To create a token like REBEL try the root repository first (you need to change variables in genesis.js and in src/config.js)._

## Tutorial:

### To mint REBEL you need to:

- install nodejs

- download or clone this repository

- open src/config.js in your favourite editor (eg. notepad) and type random 12 words passphrase (mnemonic) for your wallet in mnemonicAlice line (the wallet will be generated for you by the script - the derivation path is set to m/44'/245'/0'/0/0). Save the file (do not change anything else ; you may notice a mnemonic for premium wallet - do not bother to recover a wallet with that phrase - it will not work)

- open a command line and run commands:

`npm install`

`node src/yieldFarming.js`

- you will see Premium BCH address, Alice BCH address and contract BCH address

- send 0.00004000 BCH to Alice BCH address (this is your wallet) from another wallet (do not send more than 0.00004000 BCH)

- run the command again:

`node src/yieldFarming.js`

- you will see contract working and 1000 REBEL will be sent to your wallet (you can check it in [explorer](https://explorer.bitcoin.com))

- you can use wallet.fullstack.cash to import your passphrase (mnemonic) - you will get your private key from there and then you can copy it and paste, while creating a new wallet, in Electron Cash SLP wallet or another wallet that uses m/44'/245'/0'/0/0 derivation path

- to mint another 1000 REBEL type `node src/yieldFarming.js` and send 0.00004000 BCH to Alice BCH address and then type again `node src/yieldFarming.js` (repeat this step to mint more tokens)

### Smart contract fees:

- at least 0.00001000 BCH is sent to Premium BCH address to keep the smart contract token mintinig available

- 0.00001200 BCH is for blockchain fees

- 0.00000546 BCH is in dust

-----------------------------------------------------------------------------------------

#### _This is from root repository:_

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
