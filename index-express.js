const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const path = require('path')
const app = express()
const port = 3000

let productos = []

app.use(bodyParser.json())

///Pagina principal
app.get('/', (req, res) =>{
    fs.readFile(path.join(__dirname, 'index.html'), (err, contenidoArchivo) => {
        res.setHeader('Content-Type', 'text/html');
        res.send(contenidoArchivo);
    })
})


///Productos
app.get('/productos', (req, res) =>{
    res.send(productos);
})

app.post('/productos', (req, res) =>{
    console.log("el valor del body es: ", req.body)
    const nuevoProducto = req.body

    productos.push(nuevoProducto)

    const codigoRespuesta = 201

    const respuesta = {
        codigo: codigoRespuesta,
        mensaje: "Se creó un nuevo producto, " + productos.length + " productos en existencia",
        detalles: {
            id: nuevoProducto.id,
            nombre: nuevoProducto.nombre
        }
    }
    res.status(codigoRespuesta).send(respuesta)
    //res.send(productos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

