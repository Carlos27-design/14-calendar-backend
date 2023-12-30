/*
Rutas de usuarios / auth
host + api/auth

*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const { newUser, loginUser, reNewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
  '/new',
  [
    //Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  newUser
);
router.post(
  '/',
  [
    //middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener 6 caracteres').isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUser
);
router.get('/renew', validarJWT, reNewToken);

module.exports = router;
