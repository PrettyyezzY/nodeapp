const express = require('express');
const shopController = require('../controllers/shopController')
const router = express.Router();

router.get('/', shopController.shop_get);

router.post('/', shopController.shop_post);

router.get('/:id', shopController.shop_details);

router.put('/:id', shopController.shop_put);

router.delete('/:id', shopController.shop_delete);


module.exports = router;