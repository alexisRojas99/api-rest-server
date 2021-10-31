const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la Base de Datos`);
}

const existeEmail = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) throw new Error(`El correo ${correo} ya esta registrado`);
}

// Verifica si el usuario existe en la BD
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error(`El ID ${id} no existe`);
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}