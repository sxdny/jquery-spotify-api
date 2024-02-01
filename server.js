require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;


// Import the Spotify credentials from the .env file
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken = '';

// Convert the credentials to base64
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

app.post('/spotify', (req, res) => {
  res.json({ clientId, clientSecret, encodedCredentials });
});


app.use(express.static('public')); // carpeta publica

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});