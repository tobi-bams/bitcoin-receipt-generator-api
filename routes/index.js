const express = require("express");
const PDFDocument = require("pdfkit");
const getDetailService = require("../service/transactionDetail");
const pdfService = require("../service/pdfservice");

const router = express.Router();

router.get("/getReceipt", async (req, res) => {
  let transaction = await getDetailService.getTransactionDetails(
    req.query.txid
  );
  if (transaction.status === 200) {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
    });
    pdfService.buildPDF(res, transaction.data, req.query.txid);
  } else {
    if (transaction.response.data.message == "Odd-length string") {
      res
        .status(transaction.response.status)
        .json({ status: 500, message: "Invalid Transactioon Id" });
    } else {
      res.status(transaction.response.status).json(transaction.response.data);
    }
  }
});

module.exports = router;
