const axios = require("axios");

async function findMintingBaton(utxos, tokenId) {
  const query = {
    v: 3,
    q: {
      find: { "tokenDetails.tokenIdHex": tokenId },
      limit: 30,
    },
  };

  const slpDbUrl = "https://slpdb.fountainhead.cash/q/";

  const { data } = await axios.get(
    slpDbUrl + Buffer.from(JSON.stringify(query)).toString("base64")
  );

  if (data.t[0].mintBatonUtxo) {
    return {
      txid: data.t[0].mintBatonUtxo.match(/^[0-9a-z]+/)[0],
      vout: data.t[0].mintBatonUtxo.match(/[0-9]+$/)[0],
      satoshis: 546, // fixed value
    };
  } else {
    throw new Error("mint Baton is not alive");
  }
}
module.exports = findMintingBaton;