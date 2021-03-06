const PDFDocument = require("pdfkit");
const transactionService = require("./transactionDetail");
const dateService = require("./dateService");

function addHorizontalRule(doc, spaceFromEdge = 0, linesAboveAndBelow = 0.5) {
  doc.moveDown(linesAboveAndBelow);

  doc
    .moveTo(0 + spaceFromEdge, doc.y)
    .lineTo(doc.page.width - spaceFromEdge, doc.y)
    .stroke();

  doc.moveDown(linesAboveAndBelow);

  return doc;
}

async function buildPDF(res, transaction, txid) {
  try {
    const response = transaction;
    let total = response.fee;
    const doc = new PDFDocument();
    doc.pipe(res);
    doc.fontSize(28).text(`Bitcoin Transaction Receipt`, {
      align: "center",
    });
    doc.moveDown(0.8);
    doc
      .fontSize(20)
      .text(`Sender's Address:`, {
        align: "center",
        lineBreak: false,
      })
      .fillColor("#B2BEB5")
      .fontSize(20)
      .text(`${response.vin[0].address}`, { align: "center" });
    doc.moveDown(0.8);
    doc
      .fillColor("#B2BEB5")
      .fontSize(20)
      .text("Status", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(20)
      .text(response.status, { align: "right" });
    addHorizontalRule(doc, 70, 0);
    doc.moveDown(1);
    doc
      .fillColor("#B2BEB5")
      .text("Transaction ID", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(15)
      .text(txid, { align: "right" });
    addHorizontalRule(doc, 70, 0.4);
    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("#B2BEB5")
      .text("Beneficiary Address", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(20)
      .text("Amount", { align: "right" });
    addHorizontalRule(doc, 70, 0);
    response.vout.forEach((beneficiary) => {
      total = total + beneficiary.value;
      doc.moveDown(0.8);
      doc
        .fillColor("#B2BEB5")
        .fontSize(16)
        .text(beneficiary.address, 70, doc.y, { lineBreak: false })
        .fillColor("black")
        .fontSize(16)
        .text(`${beneficiary.value / 100000000} BTC`, { align: "right" });
    });
    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("#B2BEB5")
      .text("Fee", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(20)
      .text(`${response.fee / 100000000} BTC`, { align: "right" });
    addHorizontalRule(doc, 70, 0);
    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("#B2BEB5")
      .text("Pain On", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(20)
      .text(`${dateService.dateFormatter(response.time)}`, {
        align: "right",
      });
    addHorizontalRule(doc, 70, 0);
    doc.moveDown(1);
    doc
      .fontSize(20)
      .fillColor("#B2BEB5")
      .text("Total", 70, doc.y, { lineBreak: false })
      .fillColor("black")
      .fontSize(20)
      .text(`${total / 100000000} BTC`, {
        align: "right",
      });
    addHorizontalRule(doc, 70, 0);
    doc.end();
  } catch (error) {
    console.log(error);
  }
}

module.exports = { buildPDF };
