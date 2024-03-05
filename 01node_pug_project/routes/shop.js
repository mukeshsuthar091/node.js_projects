const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  let products = adminData.products;
  res.render('shop', {prods: products, pageTitle: 'My Shop', path: '/'});
});

module.exports = router;
