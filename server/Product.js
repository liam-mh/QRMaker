const { response } = require("express");
const { storeData, readData } = require('./database');

class Values {
    constructor(id, nameOfAPI, manufacturer, batchNumber, batchSize, dateOfManufacture, dateOfExpiry, licenseNumber) {
        this.id = id;
        this.nameOfAPI = nameOfAPI;
        this.manufacturer = manufacturer;
        this.batchNumber = batchNumber;
        this.batchSize = batchSize;
        this.dateOfManufacture = dateOfManufacture;
        this.dateOfExpiry = dateOfExpiry;
        this.licenseNumber = licenseNumber;
    }
}

class Action {
    constructor(user, action, response = null) {
        this.user = user;
        this.action = action;
        this.date = getCurrentDate();
        this.response = response;
    }
}

class Response {
    constructor(accepted, reason) {
        this.accepted = accepted;
        this.reason = reason
    }
}

class Output {
    constructor(PDF, QR) {
        this.PDF = PDF;
        this.QR = QR;
    } 
}

class Product {
    constructor(user, values, output = null) {
        this.values = values;
        this.output = output;
        this.history = []
        this.addAction(user, "Created")
    }

    static fromStorage(id) {
        const data = readData(id);
        if (data) {
            const { user, values, output, history } = data;
            const product = new Product(user, values, output);
            product.history = history; 
            return product;
        } else {
            console.log(`Product with ID ${id} not found.`);
            return null;
        }
    }

    addAction(user, actionDescription, response = null) {
        const action = {
            date: getCurrentDate(),
            user: user,
            action: actionDescription,
            response: response
        };
        this.history.push(action);
    }

    toJson() {
        return {
            values: this.values,
            output: this.output,
            history: this.history
        };
    }

    saveProduct() {
        const jsonProduct = this.toJson();
        storeData(this.values.id, jsonProduct);
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
}

module.exports = {
    Product
}