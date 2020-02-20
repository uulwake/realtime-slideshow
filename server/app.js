const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

io.on('connection', socket => {
  socket.on('nextSlide', slide => {
    io.emit('changeSlide', slide);
  });

  socket.on('prevSlide', slide => {
    io.emit('changeSlide', slide);
  });
});

http.listen(3000, () => console.log('Listening on port 3000'));
