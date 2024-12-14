const { signIn, signUp } = require('../controller/usersController');

const router = require('express').Router();

router.post('/user/signin', signIn);
router.post('/user/signup', signUp);


module.exports = router;