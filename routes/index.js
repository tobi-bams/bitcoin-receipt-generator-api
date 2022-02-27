const express = require("express");
const PDFDocument = require("pdfkit");
const getDetailService = require("../service/transactionDetail");
const pdfService = require("../service/pdfservice");

const router = express.Router();

router.get("/getRecipt", async (req, res) => {
  let transaction = await getDetailService.getTransactionDetails();
  if (transaction.status === 200) {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
    });
    pdfService.buildPDF(res, transaction.data);
  } else {
    console.log(transaction);
    res.status(500).json(transaction.response.data);
  }
});

module.exports = router;
