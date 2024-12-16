
const mongoose = require('mongoose');

const dbConnection  = async () => {
    try {
        
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Comuniquese con soporte.');
    }
}


module.exports = {
    dbConnection
}