// Obtain the credentials from the server.js file and use them in the script.js file to make the requests to the Spotify API.

// Save the credentials from the server.js file in a variable
let access_token;

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

$(function () {

  // Hacemos este fetch en cada una de las solicitudes que hagamos a la API de Spotify y asi obtener el access_token sin que nos vean la contraseña
  fetch('http://localhost:3000/spotify', {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      $.ajax({
        type: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', `Basic ${data.encodedCredentials}`);
        },
        dataType: 'json',
        data: { grant_type: 'client_credentials' },
      }).done((response) => {
        access_token = response.access_token;

      });
    }
    );

  var spotify = new Spotify();

  $('#artistName').on('input', function () {
    spotify.getSongs($('#artistName').val());
    spotify.getArtist($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {
    console.log(response);

    $('#artists').empty();

    if (response.artists.items.length === 0) {
      $('#artists').append(
        `
          <p>No artists with this name has been found...</p>
        `
      );
    } else {
      for (let i = 0; i < response.artists.items.length; i++) {
        $('#artists').append(
          `
          <div class="artist">
            <img src="${response.artists.items[i].images[0].url}" alt="artist image" width="100" height="100">
            <a href="https://open.spotify.com/intl-es/artist/${response.artists.items[i].id}" class="artistId" data-id="${response.artists.items[i].id}">${response.artists.items[i].name}</a>
          </div>
          `);
      }
    }
  });
};

Spotify.prototype.getSongs = function (song) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=track&q=' + song,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {
    console.log(response)

    $('#songs').empty();

    if (response.tracks.items.length === 0) {
      $('#songs').append(
        `
          <p>No songs with this name has been found...</p>
        `
      );
    } else {
      for (let i = 0; i < response.tracks.items.length; i++) {
        $('#songs').append(
          `
          <button class="song">
            <img src="${response.tracks.items[i].album.images[0].url}" alt="song image" width="100" height="100">
            <div class="songInfo">
              <a href="${response.tracks.items[i].external_urls.spotify}">${response.tracks.items[i].name}</a>
              <p>${response.tracks.items[i].artists[0].name}</p>
            </div>
          </button>
          `);
      }
    }


  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).done(function (response) {
    console.log(response);
  });
};




