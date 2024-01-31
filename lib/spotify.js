require('dotenv').config();
// En este archivo accederemos a las variables de entorno

// Importamos mis credenciales de Spotify
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let data;

// Codificamos en base64 las credenciales
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// Solicitamos el token de acceso y lo guardamos en una variable

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
}

module.exports = getAccessToken; // <-- Para exportar los valores

