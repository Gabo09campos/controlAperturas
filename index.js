const express = require("express");
const http = require("node:http");
const conexion = require("./conexion.js");
const app = express();

app.use(express.static("./cliente"));
/** 
 * requerimos a express y creamos un servodor con http
 * creamos una constante para la aplicacion de express donde express es un servidor web http.
 * creamos una funcion de peticion(pet) y respuesta(rest).
 * 
 */
// app.use("/", function(pet, rest){
//     return rest.json({resultado : "exito"})
// });


/**
 * app es una aplicacion de express, use es una funcion de la aplicacion(app).
 * esta funcion le dice a la aplicacion de express que use o cree una nueva ruta que seria la cadena en el primer parametro, en este caso "/usuarios", cuando llegue una peticion http a la ruta usuarios va a correr la funcion en el segundo parametro de la funcion use.
 */
app.use("/usuarios", function(pet, rest){
    conexion.query("select * FROM usuarios", function(err, resultado){
        if(err){
            console.log(err)
            return
        }
        console.log(resultado)

        return rest.json({resultado : resultado})
    });
});

app.use("/login", function(pet, rest){
    conexion.query("select Nombre, T_ususario, Contraseña FROM usuarios", function(err, resultado){
       /**
        * if("T_usuario" == "Administrador"){
            location.href = "./index.html" 
       }else{
            location.href = "./listaAperturasUsuarios.html."
       }
       */
      
        if(err){
            console.log(err)
            return
        }
        console.log(resultado)

        return rest.json({resultado : resultado})
    });
});

/**
 * creamos un servidor http de node.js para acelerar el funcionanmiento.
 * le decimos el puerto en donde estara
 * creamos una function que nos muestre en consola si saliio bien
 */
let servidor = http.createServer(app);
servidor.listen(3000, function(){
    console.log("Te estoy escuchando");
});


