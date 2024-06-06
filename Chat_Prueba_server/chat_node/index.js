const http = require('http');
const socketIo = require('socket.io');

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor de chat con Socket.io');
});

// Inicializar socket.io con el servidor HTTP
const io = socketIo(server);

// Manejar la conexión de clientes
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Manejar mensajes entrantes
  socket.on('send_message', (message) => {
    console.log('Mensaje recibido: ', message);
    // Reenviar el mensaje a todos los clientes conectados
    io.emit('receive_message', message);
  });

  // Manejar la desconexión de clientes
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
