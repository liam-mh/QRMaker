const fs = require('fs');
const { Firestore } = require('@google-cloud/firestore');
const serviceAccount = require('./gcpKey.json');

const firestore = new Firestore({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key
  }
});

async function storeData(id, data) {
    const docRef = firestore.collection('products').doc(id);
    await docRef.set(data);
    console.log('Data stored successfully!');
}
  

function readData(id) {
    try {
        const fileData = fs.readFileSync('firebase.json', 'utf8');
        const data = JSON.parse(fileData);
        if (data.hasOwnProperty(id)) {
            return data[id];
        } else {
            console.log(`Product with ID ${id} not found.`);
            return null;
        }
    } catch (err) {
        console.error("Error reading file:", err);
        return null;
    }
}

module.exports = {
    storeData,
    readData
}