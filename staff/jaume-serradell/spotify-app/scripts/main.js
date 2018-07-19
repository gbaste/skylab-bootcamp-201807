logic.token = 'BQDUaoMyx6PZAWkpR_RAG8vgJLdIsdmnK_Pg0VxXeG4c9vE96B7RVMRU0lXzjMyGHa3lzmxx9BXIYPpzM6kmNr7w04rM2dSijEqsxajHGNPJJwGkMSyoLE93VhwZm-i_9Ld5-Kka2hJC_c1NaTvPUk6wEvV_zlpP9eOIULmAGCD4fK_1CJXEB1HR5-_WRML7j8xxDQasoj8cDBQwTy0yLqV0BHP3lrL62CDiTnOAwQXDmhNIOHJN3MjM5N7-QGi1jcbkjV4xkew';
// NOTE: to reset token via web => https://developer.spotify.com/console/get-search-item

// my presentation logic

var $body = $('body');

var $container = $('<div class="container-flui">');

var search = new SearchPanel();

search.onSearch(function (query) {
    logic.searchArtists(query)
        .then(function (artists) {
            artistsList.updateResults(artists.map(function (artist) {
                return {
                    id: artist.id,
                    text: artist.name
                };
            }));

            albumsList.clear();
            tracksList.clear();
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});



$body.append(search.element);

var artistsList = new ResultsList();

artistsList.onItemClick(function (id) {
    logic.retrieveAlbumsByArtistId(id)
        .then(function (albums) {
            albumsList.updateResults(albums.map(function (album) {
                return {
                    id: album.id,
                    text: album.name
                };
            }));

            tracksList.clear();
            $trackContainer.clear();
        })
        .catch(function (error) {
            alert('Sorry, we have temporary problem, try again later.');
        });
});

// $body.append(artistsList.$element);
$body.append(artistsList.element);

var albumsList = new ResultsList();

albumsList.onItemClick(function (id) {
    logic.retrieveTracksByAlbumId(id)
        .then(function (tracks) {
            tracksList.updateResults(tracks.map(function (track) {
                return {
                    id: track.id,
                    text: track.name
                };
            }));

            $trackContainer.clear();
        });
});

$body.append(albumsList.element);

var tracksList = new ResultsList();

tracksList.onItemClick(function (id) {
    logic.retrieveTrackById(id)
        .then(function (track) {
            $trackContainer.clear();

            // var player = new TrackPlayer(track.name, track.album.images[0].url, track.preview_url, track.external_urls.spotify);
            var player = new SpotifyPlayer(track.id);

            $trackContainer.append(player.element);
        });
});

$body.append(tracksList.element);

var $trackContainer = $('<div>');

$trackContainer.clear = function () {
    this.empty();
};

$body.append($trackContainer);

