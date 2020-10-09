const path = require('path');
exports.home = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/home.html'));
};
exports.cart = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/cart.html'));
};

exports.confirmation = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/confirmation.html'));
};

exports.product = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/product.html'));
};

