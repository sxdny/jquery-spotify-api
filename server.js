
const express = require('express');
const app = express();
const port = 3000;

// Obtenemos el data del otro archivo
const getAccessToken = require('./lib/spotify');

let accessToken = await getAccessToken();

app.use(express.static('public')); // carpeta publica

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(accessToken);
});