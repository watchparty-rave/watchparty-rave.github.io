const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servindo os arquivos estáticos da pasta 'client'
app.use(express.static(__dirname + '/../client'));

// Quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('Um usuário conectou.');

  // Propaga o evento "play" para os demais clientes
  socket.on('play', (data) => {
    socket.broadcast.emit('play', data);
  });

  // Propaga o evento "pause" para os demais clientes
  socket.on('pause', (data) => {
    socket.broadcast.emit('pause', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado.');
  });
});

// Inicia o servidor na porta 3000 (pode ser customizado)
http.listen(3000, () => {
  console.log('Servidor rodando na porta 3000.');
});