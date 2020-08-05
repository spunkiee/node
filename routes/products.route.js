const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/all-products', (__, res) => {
    // console.log(__dirname);
    // res.send('../views/products.html');

    res.sendFile(path.join(__dirname, '../views/products.html'));
});

module.exports = router;