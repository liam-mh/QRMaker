const keyFilePath = 'server/gcpKey.json';
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: keyFilePath });

async function uploadFile(bucketName, filename, destination=null) {
    await storage.bucket(bucketName).upload(filename, {
        destination: destination,
    });
    console.log(`${filename} uploaded to ${bucketName}/${destination}.`);
}

async function savePDF(id, filePath) {
    const fileName = `pdf_${id}.pdf`;
    const destination = `pdfs/${fileName}`;
    await uploadFile('qr_store', filePath, destination);
}

async function saveQR(id, filePath) {
    const fileName = `qr_${id}.png`;
    const destination = `qrs/${fileName}`;
    await uploadFile('qr_store', filePath, destination);
}

async function generateSignedUrl(id, expirationTimeSeconds, method = 'GET') {
    // Get a reference to the file
    const file = storage.bucket('qr_store').file(`pdfs/pdf_${id}.pdf`);

    // Generate the signed URL
    const [url] = await file.getSignedUrl({
        action: method,
        expires: Date.now() + expirationTimeSeconds * 1000, // Expiration time in milliseconds
    });

    return url;
}

async function main() {
    const signedUrl = await generateSignedUrl('10', 36);
    console.log('Signed URL:', signedUrl);
}
main()


module.exports = {
    savePDF,
    saveQR
};
