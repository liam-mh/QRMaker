const fs = require('fs');

function storeData(id, jsonObject) {
    // Read existing data from the file, or create an empty object if the file doesn't exist
    let data = {};
    try {
        const fileData = fs.readFileSync('firebase.json', 'utf8');
        data = JSON.parse(fileData);
    } catch (err) {
        console.error("Error reading file:", err);
    }

    // Store the JSON object in the data object with the id as the key
    data[id] = jsonObject;

    // Write the updated data back to the file
    try {
        fs.writeFileSync('firebase.json', JSON.stringify(data, null, 2), 'utf8');
        console.log('Data stored successfully!');
    } catch (err) {
        console.error("Error writing file:", err);
    }
}

function readData(id) {
    try {
        // Read the data from the file
        const fileData = fs.readFileSync('firebase.json', 'utf8');
        const data = JSON.parse(fileData);
        
        // Check if the ID exists in the data
        if (data.hasOwnProperty(id)) {
            // Return the values corresponding to the ID
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