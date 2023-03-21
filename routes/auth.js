const { Router } = require('express');
const { register, login, renewToken, logout } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/renew',[
    validarJWT,
] ,renewToken);
router.post('/logout', logout)

module.exports = router;