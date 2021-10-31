const mongoose = require('mongoose');

const dbconnection = async () => {
     
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion a la base de datos');
    }
}

module.exports = {
    dbconnection
}