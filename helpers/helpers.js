const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateAccountNumber() {
    const min = 1_000_000;
    const max = 9_999_999;
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

function createPDF(accountNumber, transfers, currencyCode) {
  //return the file name if success
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(`./public/${accountNumber}.pdf`));
  doc
  .font('Helvetica-Bold')
  .fontSize(28)
  .text('GinkoBank');

  doc
  .font('Helvetica')
  .fontSize(18)
  .text(`No. Rekening ${accountNumber}`);

  

  doc.moveDown()

  doc
  .fontSize(18)
  .text('Daftar Transfer');

  transfers.forEach((transfer, i) => {
    doc
    .fontSize(14)
    .text(`${i + 1}  ${transfer.createdAt.toISOString().split('T')[0]}  ${transfer.relativeType(accountNumber)}  ${transfer.formattedAmount}  ${currencyCode}  ${transfer.info}`);
  })


  doc.end();
  return `${accountNumber}.pdf`;
}


module.exports = {generateAccountNumber, createPDF};
  