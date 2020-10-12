const express = require('express');
const router = express.Router();

const frontController = require('../controllers/front');

router.get('/', frontController.home);
router.get('/cart', frontController.cart);
router.post('/confirmation', frontController.confirmation);
router.get('/product/:productId', frontController.product);

module.exports = router;