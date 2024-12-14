const { addCatgory, updateCatgory, getCatgoryList, getCatgoryById, deleteCatgory } = require('../controller/categoryController');
const {authentication} = require('../middleware/authMiddleware');

const router = require('express').Router();

router.post('/category/addCategory', authentication, addCatgory);
router.post('/category/updateCatgory', authentication, updateCatgory);
router.post('/category/getCatgoryList', authentication, getCatgoryList);
router.get('/category/getCatgoryById/:id', authentication, getCatgoryById);
router.delete('/category/deleteCatgory/:id', authentication, deleteCatgory);


module.exports = router;