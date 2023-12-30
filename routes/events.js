/*
Rutas de usuarios / auth
host + api/events

*/

const { Router } = require('express');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', [check()], getEvents);

//Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatorio').custom(isDate),
    check('end', 'La fecha de finalización es obligatorio').custom(isDate),
    validarCampos,
  ],
  createEvent
);

//Actualizar Evento1
router.put(
  '/:id',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatorio').custom(isDate),
    check('end', 'La fecha de finalización es obligatorio').custom(isDate),
    validarCampos,
  ],
  updateEvent
);

//Actualizar Evento1
router.delete('/:id', [check()], deleteEvent);

module.exports = router;
