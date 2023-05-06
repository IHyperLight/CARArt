const http=require('http');
const url=require('url');
const fs=require('fs');

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'png'  : 'image/png',
   'jpeg' : 'image/jpeg',
   'mp4' : 'video/mp4',
   'js' : 'text/javascript'
};

const servidor=http.createServer((pedido, respuesta) => {
  const objetourl = url.parse(pedido.url);
  let camino='archivos'+objetourl.pathname;
  if (camino=='archivos/')
    camino='archivos/index.html';
  fs.stat(camino, error => {
    if (!error) {
      fs.readFile(camino, (error,contenido) => {		  
        if (error) {
          respuesta.writeHead(500, {'Content-Type': 'text/plain'});
          respuesta.write('Error interno');
          respuesta.end();					
        } else {
          const vec = camino.split('.');
          const extension=vec[vec.length-1];
          const mimearchivo=mime[extension];
          respuesta.writeHead(200, {'Content-Type': mimearchivo});
          respuesta.write(contenido);
          respuesta.end();
        }
	  });
    } else {
      respuesta.writeHead(404, {'Content-Type': 'text/html'});
      respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
      respuesta.end();
    }
  });
});

servidor.listen(3000);

console.log('Servidor web iniciado');