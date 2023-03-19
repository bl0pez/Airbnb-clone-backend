const { Router } = require('express');
const { register, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/renew',[
    validarJWT,
] ,renewToken);

module.exports = router;