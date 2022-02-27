const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

async function getTransactionDetails() {
  try {
    // const response = await axios.get(
    //   "https://www.blockonomics.co/api/tx_detail?txid=c4978bfc9b4cd632fb37eb5f69c7c686ae364d9cb1b32ec01c0f8bae72530a4e"
    // );
    const response = await axios.get(
      "https://blockchain.info/rawtx/c4978bfc9b4cd632fb37eb5f69c7c686ae364d9cb1b32ec01c0f8bae72530a4e"
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
getTransactionDetails();

app.listen("6000", () => {
  console.log("We are here");
});
