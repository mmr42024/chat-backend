/*
    path: /api/messages
*/

/*
    path: api/users
*/

const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getChat } = require('../controllers/mesages');



const router = Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;









