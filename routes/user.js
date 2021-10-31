const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  usuariosGet,
  usuariosPatch,
  usuariosDelete,
  usuariosPut,
  usuariosPost,
} = require("../controllers/user");
const { esRolValido, existeEmail, existeUsuarioPorId } = require("../helpers/db-validators");
const router = Router();

// GET
router.get("/", usuariosGet);

// POST
router.post("/", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('correo', 'El correo no es valido').isEmail(),
  check('password', 'La clave debe contener al menos 6 caracteres').isLength({min: 6}),
  check('correo').custom(existeEmail),
  // check('rol', "No es un rol permitido").isIn('ADMIN_ROLE', 'USER_ROLE'),
  check('rol').custom((rol) => esRolValido(rol)),
  validarCampos
], usuariosPost);
 
// PUT
router.put("/:id",[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosPut);

// DELETE
router.delete("/:id", [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete);

// PATCH
router.patch("/", usuariosPatch);

module.exports = router;
