const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.send(`Roger that! ${message}`);
  });

  socket.send('Welcome to the WebSocket server!');
});

let emojiReactions = {
  '2024-06-24T00:00:00Z': [
    { userId: 'user1', emoji: '🚀' },
    { userId: 'user2', emoji: '😎' },
  ],
  '2024-06-24T01:00:00Z': [
    { userId: 'user3', emoji: '😡' },
    { userId: 'user4', emoji: '😭' },
  ],
};

app.post('/addReaction', (req, res) => {
  const { timestamp, userId, emoji } = req.body;
  if (!emojiReactions[timestamp]) {
    emojiReactions[timestamp] = [];
  }
  emojiReactions[timestamp].push({ userId, emoji });
  res.status(200).send('Reaction added');
});

app.get('/getReactions', (req, res) => {
  res.json(emojiReactions);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
