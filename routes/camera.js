const express = require('express');
const router = express.Router();

const cameraCtrl = require('../controllers/camera');

router.get('/', cameraCtrl.getAllCameras);  //Returns an array of all elements
router.get('/:id', cameraCtrl.getOneCamera); // Returns the element corresponding to given_id identifier
router.post('/order', cameraCtrl.orderCameras); //Returns the contact object, the products array and order_id (string)

module.exports = router;