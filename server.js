require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // carpeta publica

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  // console.log(process.env.SPOTIFY_CLIENT_ID);
  // console.log(process.env.SPOTIFY_CLIENT_SECRET);
});