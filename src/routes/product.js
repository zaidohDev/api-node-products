const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const index = require('./index.js');

router.get('/admin/:id', productController.show);
router.get('/:slug', productController.listSlugs);
router.get('/', productController.list);
router.get('/relacionados/:tags', productController.listTags);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;