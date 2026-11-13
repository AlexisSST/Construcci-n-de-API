const express = require("express");
const mongoose = require('mongoose');
const conectarBD = require("./config") //se importa el archivo config.js
const ModelUser = require("./model")

const app = express();
const router = express.Router(); 

app.use(express.json());

conectarBD();

router.post ('/registro', async (req, res) =>{
  try{
    const body = req.body; //En este espacio recibe nomuser y usuario desde postman
    const nuevoUsuario = await ModelUser.create(body); //esta linea guarda en MomgoDB

    /// devuelve un espacio personalisado y los datos que se crearon
    res.status(201).json({
      mensaje:"Usuario registrado satisfactoriamente",
      Usuario: nuevoUsuario
    });

  } catch(error){
    res.status(500).json({
      mensaje: "Error al crear el usuario", error: error.message
    });
  }
});
//Servicio de incio de sesion / Login (Ruta http://localhost:3005/login)
router.post('/login', async (req, res)=> {
  try{
    // ene sta liena se extrae el ususario y la ocntrraseña enviados en el Json desde postman
    const {nomuser, password}= req.body;

    //Se busca en la base de datos si existe el usuario y si coincide exactamente con ambos datos
    const usuarioEncontrado = await ModelUser.findOne({nomuser:nomuser,password:password});

    //se valida si la autenticacion fue existosa con la siguiente linea

    if (usuarioEncontrado){
      res.status(200).json({
        mensaje: "Autenticacion satisfactoria"
      });
    
    } else {
      // con la siguiente linea sino coincide la contraseña o el usuario no existe se devuelve el error
      res.status(401).json({
        mensaje: "Error en la autenticacion: usuario o contraseña incorrrecto"
      });
    }

    }catch (error){
      res.status(500).json({mensaje:"Error en el servidor", error: error.message});

    }
  
});  
    router.get('/consultar', async(req,res)=>{
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
  });
  
  app.use(router);

  // Iniciamos el servidor
    app.listen(3005, () => {
      console.log("El servidor esta en el puerto 3005");
    });
