const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const cors = require('cors');
const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
const server = http.createServer(app);
const io = socketio(server);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', function (data) {
    socket.join(data.email);
  });

  let interval;

  // WHEN COUNTER ACTIVATED BY HOST, SEND 'COUNTER_STARTED' EVENT TO PARTICIPANT WITH COUNTDOWN VALUE
  // WE ARE USING SETINTERVAL() TO EMIT 'COUNTER' EVENT ON EVERY 1 SECOND DECREASE TO PARTICIPANT
  socket.on('counter_activated', (data) => {
    if (interval) {
      clearInterval(interval);
    }
    parseInt(data.time_val);
    let participantEmail = 'user11@example.com';
    // console.log('message: ' + data.email + ' ' + data.time_val);
    io.sockets.in(participantEmail).emit('counter_started', { msg: data.time_val });

    let counter = data.time_val;
    interval = setInterval(() => {
      --counter;

      if (counter <= 0) {
        clearInterval(interval);
        io.sockets.in(participantEmail).emit('counter_ended', { msg: 0 });
      } else {
        io.sockets.in(participantEmail).emit('counter', { msg: counter });
      }

    }, 1000);


  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
    clearInterval(interval);
  });

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build/index.html'));
});

server.on('error', (err) => {
  console.error(err);
});

server.listen(port, () => {
  console.log(`server is ready on port: ${port}`);
});
