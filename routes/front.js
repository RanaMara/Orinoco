const express = require('express');
const router = express.Router();

const frontController = require('../controllers/front');

router.get('/', frontController.home);
router.get('/panier', frontController.panier);
router.get('/confirmation', frontController.confirmation);
router.get('/produit/:produit', frontController.produit);

module.exports = router;