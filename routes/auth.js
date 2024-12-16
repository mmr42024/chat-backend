/*
    path: api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');

const {createUser, login, renewToken} = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new',[
    check('name', 'Name required.').not().isEmpty(),
    check('password', 'Password required.').not().isEmpty(),
    check('email', 'Email required.').isEmail(),
    validateFields
], createUser);


router.post('/',[
    check('email', 'Email required.').isEmail(),
    check('password', 'Password required.').not().isEmpty(),
    validateFields
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;