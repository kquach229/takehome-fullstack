const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Make sure to install this package: npm install node-fetch

const app = express();
app.use(cors());
app.use(express.json());

// Local emoji reactions data
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

// Endpoint to add a reaction to emojiReactions
app.post('/addReaction', (req, res) => {
  const { timestamp, userId, emoji } = req.body;
  if (!emojiReactions[timestamp]) {
    emojiReactions[timestamp] = [];
  }
  emojiReactions[timestamp].push({ userId, emoji });
  res.status(200).send('Reaction added');
});

// Endpoint to get all emoji reactions
app.get('/getReactions', (req, res) => {
  res.json(emojiReactions);
});

// Proxy endpoint to handle external API requests and avoid CORS issues
app.get('/api/ohlcv', async (req, res) => {
  const { symbol, interval, startTime, endTime, countBack } = req.query;
  const url = `https://serverprod.vest.exchange/v1/ohlcv/klines?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}&countBack=${countBack}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
