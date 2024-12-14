const { addProduct, updateProduct, getProductList, getProductById, deleteProduct } = require('../controller/productController');
const {authentication} = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/product/addProduct', authentication, addProduct);
router.post('/product/updateProduct', authentication, updateProduct);
router.post('/product/getProductList', authentication, getProductList);
router.get('/product/getProductById/:id', authentication, getProductById);
router.delete('/product/deleteProduct/:id', authentication, deleteProduct);


module.exports = router;