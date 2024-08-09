const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const [customers] = await db.query('SELECT * FROM customers');
    res.render('customers.ejs', { customers });
});

router.get('/add', (req, res) => {
    res.render('add_customer');
});

router.post('/add', async (req, res) => {
    const { name, email, phone } = req.body;
    await db.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    res.redirect('/customers');
});


router.get('/edit/:id', async (req, res) => {
    const [customers] = await db.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    res.render('edit_customer', { customer: customers[0] });
});


router.post('/edit', async (req, res) => {
    const { id, name, email, phone } = req.body;
    await db.query('UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, id]);
    res.redirect('/customers');
});


router.get('/delete/:id', async (req, res) => {
    await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.redirect('/customers');
});

module.exports = router;
