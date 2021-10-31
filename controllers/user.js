const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { existeEmail } = require("../helpers/db-validators");

const usuariosGet = async (req = request, res = response) => {
  // const { query = 'No query', nombre = 'No name' } = req.query;

  const { limite = 2, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const totalRegistros = await Usuario.countDocuments(query);

  // Coleccion de promesas con la finalidad que dependan de si mismas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])

  res.json({
    msg: "GET API - controlador",
    total,
    usuarios
    // totalRegistros,
    // usuarios
  });
};

const usuariosPost = async (req, res = response) => {


  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo existe
  // existeEmail(res);

  // Encriptar clave
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save(usuario);

  res.json({
    msg: "POST API - controlador",
    usuario
  });

};

const usuariosPut = async (req, res) => {

  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //Validar contra base de datos

  if (password) {
    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);

  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({
    ok: true,
    msg: "PUT API - controlador",
    usuario
  });
};

const usuariosDelete = async(req, res) => {

  const {id} = req.params;

  // Eliminar el Usuario por completo
  // const usuario = await Usuario.findByIdAndDelete(id);

  // Eliminar el Usuario por estado, es decir cambiar el estado a false
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  
  res.json({
    msg: "DELETE API - controlador",
    usuario
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    ok: true,
    msg: "PATCH API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
};
