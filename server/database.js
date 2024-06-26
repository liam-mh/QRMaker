const fs = require('fs');

function storeData(id, jsonObject) {
    let data = {};
    try {
        const fileData = fs.readFileSync('firebase.json', 'utf8');
        data = JSON.parse(fileData);
    } catch (err) {
        console.error("Error reading file:", err);
    }

    data[id] = jsonObject;
    try {
        fs.writeFileSync('firebase.json', JSON.stringify(data, null, 2), 'utf8');
        console.log('Data stored successfully!');
    } catch (err) {
        console.error("Error writing file:", err);
    }
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