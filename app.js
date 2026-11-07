const express = require("express");
const mongoose = require('mongoose');
const conectarBD = require("./config") //se importa el archivo config.js
const ModelUser = require("./model")

const app = express();
const router = express.Router(); 

app.use(express.json());

conectarBD();

router.post('/', async (req, res) => {
    try {
        const body = req.body; 
        const respuesta = await ModelUser.create(body); 
        res.send(respuesta); 
    } catch (error) {
        res.status(500).send("error al crear el usuario: " + error.message);
    }
});

 {

    app.use(router);
} 
    
    // Iniciamos el servidor
    app.listen(3005, () => {
      console.log("El servidor esta en el puerto 3005");
    });
  
  mongoose.connection.once ("open", async () => {
     try {
        // Creación del primer registro
        const usuario = await ModelUser.create({
            nomuser: "Alexis",
            password: "123456"
        });
         console.log("Usuario creado correctamente:", usuario);
      }
    catch (error){ 
      console.error("Error al guardar el usuario:", error );
    }

    // consultar 
  });
    router.get('/', async(req,res)=>{
      const respuesta=await ModelUser.find({})
      res.send(respuesta)
    })

    //consultar por ID
    router.get('/:id', async(req,res)=>{
      const id=req.params.id;
      const respuesta=await ModelUser.findById({_id:id})
      res.send(respuesta)
    })

  //Actulizar datos
  router.put('/:id', async(req, res)=>{
    const body=req.body;
    const id=req.params.id;
    const respuesta=await ModelUser.findByIdAndUpdate({_id:id},body);
    res.send(respuesta);
  })
  //eliminar
  router.delete('/:id', async(req,res)=>{
    const id=req.params.id;
    const respuesta=await ModelUser.deleteOne({_id:id})
    res.send(respuesta)
  })
