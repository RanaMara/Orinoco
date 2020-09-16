const path = require('path');
exports.home = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/home.html'));
};
exports.panier = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/panier.html'));
};

exports.confirmation = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/confirmation.html'));
};

exports.produit = (req, res, next) => {
  res.sendFile(path.join(__dirname+'/../views/produit.html'));
};

