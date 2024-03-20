const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// init express
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Product } = require('./Product')

// Pages /////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.render("index");
    const test = Product.fromStorage('11111111');
    console.log(test)
});

app.get('/form', (req, res) => {
    res.render("form");
});
app.post('/submit', (req, res) => {
    console.log(req.body);

    const {
        id,
        nameOfAPI,
        brandName,
        manufacturer,
        batchNumber,
        batchSize,
        dateOfManufacture,
        dateOfExpiry,
        serialShippingContainerCode,
        licenseNumber,
        storageConditions
    } = req.body;

    const formValues = {
        id: id,
        nameOfAPI: nameOfAPI,
        brandName: brandName,
        manufacturer: manufacturer,
        batchNumber: batchNumber,
        batchSize: batchSize,
        dateOfManufacture: dateOfManufacture,
        dateOfExpiry: dateOfExpiry,
        serialShippingContainerCode: serialShippingContainerCode,
        licenseNumber: licenseNumber,
        storageConditions: storageConditions
    };

    product = new Product("user", formValues)
    console.log(product) 
    product.saveProduct()
});

app.get('/search', (req, res) => {
    res.render("search", { product: null });
});
app.post('/search', (req, res) => {
    const productId = req.body.productId;
    const product = Product.fromStorage(productId);
    if (product) {
        res.render("search", { product: product });
    } else {
        res.render("search", { product: null });
    }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
