const mongoose = require("mongoose");
//se guarda la direccion de la base de datos

const dbURI = "mongodb+srv://profsstalexis_db_user:Millonarios25.@cluster0.olmxo7v.mongodb.net/login_node?retryWrites=true&w=majority";

const conectarBD = () => {
    mongoose.connect(dbURI)
    .then(() => console.log("Conexion exitosa a Mongo DB desde config.js"))
    .catch((error) => console.log("Error no se logro conectar la base de datos:",error));

};

// se exporta la funcion a la carpeta app.js para que esta la pueda importar
module.exports=conectarBD;
