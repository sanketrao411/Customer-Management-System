// index.js
const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customers');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/customers', customerRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
