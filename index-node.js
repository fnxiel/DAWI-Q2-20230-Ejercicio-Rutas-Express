const http = require('http');
const fs = require('fs');
const path = require('path')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  console.log(req.url)
  
  if( req.url === '/otra-pagina'){
    fs.readFile(path.join(__dirname, 'pagina-principal.html'), (err, contenidoArchivo) => {
      res.setHeader('Content-Type', 'text/html');
      res.end(contenidoArchivo);
    })  
  } else if (req.url === '/json'){
    if(req.method === "GET"){
      fs.readFile(path.join(__dirname, 'mascota.json'), (err, contenidoArchivo) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(contenidoArchivo);
      })
    } else if (req.method === "POST"){
      res.setHeader('Content-Type', 'text/plain');
      res.end("Creamos una nueva mascota en el sistema");
    } else{
      res.setHeader('Content-Type', 'text/plain');
      res.end("Opcion invalida");
    }
    
  } 
  else{
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain');
    res.end("Este recurso no se encontró")
  }
  
  //res.end('Hola mundo');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});