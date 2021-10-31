const express = require("express");
const cors = require('cors');
const { dbconnection } = require("../database/config");

// REST Server con Clases
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/user';

    // Conectar a la Base de Datos
    this.conectarDB();


    // Middlewares
    this.middleWares();

    // Lectura y Parseo del body
    this.app.use(express.json());
    
    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbconnection();
  }

  middleWares() {
    // CORS
    this.app.use(cors());    

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    
    this.app.use(this.usuariosPath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
