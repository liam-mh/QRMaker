const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');
const { saveQR, savePDF } = require ('./gcp');

async function generatePDF(id) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const fileName = `pdf_${id}.pdf`; 
        const filePath = `./server/outputs/${fileName}`;

        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(25).text('Hello, World!', 100, 100);
        doc.end();

        resolve(filePath); 
    });
}

async function generateQRCode(id) {
    const qrFileName = `qr_${id}.png`; 
    const qrFilePath = `./server/outputs/${qrFileName}`; 

    const qrContent = `https://storage.cloud.google.com/qr_store/pdfs/pdf_${id}.pdf`; 
    await QRCode.toFile(qrFilePath, qrContent); 
    
    return qrFilePath; 
}


const id = '0003420706';

generatePDF(id)
    .then(pdfFilePath => {
        console.log(`PDF generated successfully: ${pdfFilePath}`);
        return savePDF(id, pdfFilePath);
    })
    .then(() => {
        console.log('PDF saved to cloud bucket successfully');
        return generateQRCode(id);
    })
    .then(qrFilePath => {
        console.log(`QR code generated successfully: ${qrFilePath}`);
        return saveQR(id, qrFilePath);
    })
    .then(() => {
        console.log('QR code saved to cloud bucket successfully');
    })
    .catch(error => {
        console.error('Error:', error);
    });
