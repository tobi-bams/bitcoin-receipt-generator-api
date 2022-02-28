const axios = require("axios");

async function getTransactionDetails(txid) {
  try {
    const response = await axios.get(
      `https://www.blockonomics.co/api/tx_detail?txid=${txid}`
    );
    // const response = await axios.get(
    //   "https://blockchain.info/rawtx/c4978bfc9b4cd632fb37eb5f69c7c686ae364d9cb1b32ec01c0f8bae72530a4e"
    // );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { getTransactionDetails };
