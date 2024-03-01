// Variabili globali
const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// Variabile artista degli album di benvenuto
const welcomeArtist = "Coldplay";

// Container card album suggeriti
const cardContainer = document.getElementById("suggestions-container");

// Input di ricerca
const inputField = document.getElementById("search-input");

// Contenitore del contenuto centrale
const midBox = document.getElementById("central-content");

let albums = [];
let artists = [];
let songs = [];
let rndAlbums = [];

window.onload = getResults();

async function getResults () {
    try {
        const res = await fetch(`${endPoint}${welcomeArtist}`);
        const json = await res.json();
        const data = json.data;
        data.forEach(record => {
            getAlbums(record.album);
        })
        getRandomAlbums(albums.length);  
        rndAlbums.forEach(album => {
             createAlbumCard(album);
        })
    } catch (error) {
        console.log(error);
    }
}

function getAlbums (record) {
    if(!isObjectInArray(albums, record)) {
        albums.push(record);
    }
}

function isObjectInArray (arr, obj) {
    return arr.some(item => {
        return JSON.stringify(item) === JSON.stringify(obj);
    });
}

function getRandomAlbums (albumsNumber) {
    const rndNumbers = [];
    while (rndNumbers.length <= 4) {
        const randomNumber = Math.floor(Math.random() * albumsNumber);
        if (!rndNumbers.includes(randomNumber)) {
            rndNumbers.push(randomNumber);
        }
    }
    rndNumbers.forEach(number => {
        rndAlbums.push(albums[number]);
    })
}

function createAlbumCard({title, cover_xl, id}) {

/*
    <div class="col-md-2">
        <div class="card text-bg-dark">
            <img src="/assets/cover di prova - index.png" class="card-img-top p-3 rounded" alt="...">
            <div class="card-body playlist-info">
                <h5 class="card-title playlist-name">Nome di prova</h5>
                <p class="card-text playlist-desc">Descrizione di prova</p>
            </div>
        </div>
    </div>
*/

    let cardAnchor = document.createElement("a");
        cardAnchor.classList.add("col-md-2", "link-underline", "link-underline-opacity-0");
        cardAnchor.href = `/album/album.html?albid=${id}`;
    let cardBody = document.createElement("div");
        cardBody.classList.add("card", "text-bg-dark");
    let albumCover = document.createElement("img");
        albumCover.classList.add("card-img-top", "p-3");
        albumCover.src = cover_xl;
    let cardText = document.createElement("div");
        cardText.classList.add("card-body", "playlist-info");
    let albumTitle = document.createElement("p");
        albumTitle.classList.add("card-text", "playlist-desc");
        albumTitle.innerText = title;

    cardContainer.appendChild(cardAnchor);
        cardAnchor.appendChild(cardBody);
            cardBody.appendChild(albumCover);
            cardBody.appendChild(cardText);
                cardText.appendChild(albumTitle);
}

/*
Funzione di ricerca
- findResults prende il contenuto dell'input e fa una fetch su quel contenuto FATTO
- cicliamo i dati ricevuti e creiamo tre array con i risultati (privi di duplicati) di album, artisti e canzoni
- su questi array chiamiamo la funzione per creare le card, in modo che rimandino alle relative pagine
*/

async function findResults() {
    albums = [];
    artists = [];
    songs = [];
    midBox.innerHTML = "";
    const searchValue = inputField.value;
    try {
        const res = await fetch(`${endPoint}${searchValue}`);
        const json = await res.json();
        const data = json.data;
        data.forEach(record => {
            getData(record);
        })
        createSearchResults();
    } catch (err) {
        console.log(err)
    }
}

function getData (record) {
    if(!isObjectInArray(albums, record.album)) {
        albums.push(record.album);
    }
    if(!isObjectInArray(artists, record.artist)) {
        artists.push(record.artist);
    }
    if(!isObjectInArray(songs, record)) {
        songs.push(record);
    }
}

let count = 1;

function createSearchResults () {

    if (albums.length > 0) {
        
        let albumSectionContainer = document.createElement("div");
        let albumSectionTitle = document.createElement("h3");
            albumSectionTitle.classList.add("text-light");
            albumSectionTitle.innerText = "Albums";
        let albumCardsContainer = document.createElement("div");
            albumCardsContainer.classList.add("container-fluid", "p-0");
        let albumCardsRow = document.createElement("div");
            albumCardsRow.classList.add("row", "g-1", "d-flex", "p-0", "justify-content-start");

        midBox.appendChild(albumSectionContainer);
            albumSectionContainer.appendChild(albumSectionTitle);
            albumSectionContainer.appendChild(albumCardsContainer);
                albumCardsContainer.appendChild(albumCardsRow);

        albums.forEach(album => {
            let cardAnchor = document.createElement("a");
                cardAnchor.href = `/album/album.html?albid=${album.id}`;
                cardAnchor.classList.add("col-md-2", "col-sm-4", "col-6", "link-underline", "link-underline-opacity-0");
            let cardBody = document.createElement("div");
                cardBody.classList.add("card", "text-bg-dark");
            let albumCover = document.createElement("img");
                albumCover.classList.add("card-img-top", "p-3");
                albumCover.src = album.cover_xl;
            let cardText = document.createElement("div");
                cardText.classList.add("card-body", "playlist-info");
            let albumTitle = document.createElement("p");
                albumTitle.classList.add("card-text", "playlist-desc", "text-light");
                albumTitle.innerText = album.title;

            albumCardsRow.appendChild(cardAnchor);
                cardAnchor.appendChild(cardBody);
                        cardBody.appendChild(albumCover);
                        cardBody.appendChild(cardText);
                            cardText.appendChild(albumTitle);
        });
    }

    if (artists.length > 0) {
        
        let artistSectionContainer = document.createElement("div");
        let artistSectionTitle = document.createElement("h3");
            artistSectionTitle.classList.add("text-light");
            artistSectionTitle.innerText = "Artists";
        let artistCardsContainer = document.createElement("div");
            artistCardsContainer.classList.add("container-fluid", "p-0");
        let artistCardsRow = document.createElement("div");
            artistCardsRow.classList.add("row", "g-1", "d-flex", "p-0", "justify-content-start");

        midBox.appendChild(artistSectionContainer);
            artistSectionContainer.appendChild(artistSectionTitle);
            artistSectionContainer.appendChild(artistCardsContainer);
                artistCardsContainer.appendChild(artistCardsRow);

        artists.forEach(artist => {
            let cardAnchor = document.createElement("a");
                cardAnchor.classList.add("col-md-2", "col-sm-4", "col-6", "link-underline", "link-underline-opacity-0");
                cardAnchor.href = `/IndexArtist/indexArtist.html?artid=${artist.id}`;
            let cardBody = document.createElement("div");
                cardBody.classList.add("card", "text-bg-dark", "h-100");
            let artistPic = document.createElement("img");
                artistPic.classList.add("card-img-top", "p-3");
                artistPic.src = artist.picture_xl;
            let cardText = document.createElement("div");
                cardText.classList.add("card-body", "playlist-info");
            let artistName = document.createElement("p");
                artistName.classList.add("card-text", "playlist-desc", "text-light");
                artistName.innerText = artist.name;

            artistCardsRow.appendChild(cardAnchor);
                cardAnchor.appendChild(cardBody);
                    cardBody.appendChild(artistPic);
                    cardBody.appendChild(cardText);
                        cardText.appendChild(artistName);
        });
    }

    if (songs.length > 0 ) {

        let songsSectionContainer = document.createElement("div");
        songsSectionContainer.classList.add("container", "pt-3")
        let songsSectionTitle = document.createElement("h3");
            songsSectionTitle.classList.add("text-light");
            songsSectionTitle.innerText = "Songs";
        let songsCardsContainer = document.createElement("div");
            songsCardsContainer.classList.add("container-fluid", "p-0");
        let songsCardsRow = document.createElement("div");
            songsCardsRow.classList.add("row", "g-1", "d-flex", "p-0", "justify-content-start");

        midBox.appendChild(songsSectionContainer);
            songsSectionContainer.appendChild(songsSectionTitle);
            songsSectionContainer.appendChild(songsCardsContainer);
                songsCardsContainer.appendChild(songsCardsRow);

        let songsTable = document.createElement("table");
            songsTable.classList.add("table", "table-dark");
            songsTable.setAttribute("id", "table-title");
        let tableHead = document.createElement("thead");
        let tableTitleRow = document.createElement("tr", "row");
        let numColName = document.createElement("th");
            numColName.classList.add("col-md-1", "text-white", "text-end", "fw-lighter");
            numColName.innerText = "#";
        let titleColName = document.createElement("th");
            titleColName.classList.add("col-md-6", "text-white", "fw-lighter");
            titleColName.innerText = "TITOLO";
        let playsColName = document.createElement("th");
            playsColName.classList.add("col-md-4", "text-white", "text-center", "fw-lighter");
            playsColName.innerText = "RIPRODUZIONI";
        let timeColName = document.createElement("th");
            timeColName.classList.add("col-md-1", "text-white");
        let timeIcon = document.createElement("i");
            timeIcon.classList.add("fa-regular", "fa-clock", "fw-lighter");

        songsSectionContainer.appendChild(songsTable);
            songsTable.appendChild(tableHead);
                tableHead.appendChild(tableTitleRow);
                    tableTitleRow.appendChild(numColName);
                    tableTitleRow.appendChild(titleColName);
                    tableTitleRow.appendChild(playsColName);
                    tableTitleRow.appendChild(timeColName);
                        timeColName.appendChild(timeIcon);

        songs.forEach(song => {

            let tableRow = document.createElement("tr");
                tableRow.classList.add("text-white", "fw-lighter", "py-1");
            let songNumb = document.createElement("th");
                songNumb.classList.add("text-end", "px-0");
                songNumb.innerText = count ++;
            let songTitleArtista = document.createElement("td");
                songTitleArtista.classList.add("px-1");
            let songTitle = document.createElement("p");
                songTitle.innerText = song.title;
                songTitle.classList.add("fw-bold", "pb-0");
            let songArtista = document.createElement("p");
                songArtista.classList.add("pt-0");
                songArtista.innerText = song.artist.name;
            let playedSong = document.createElement("td");
                playedSong.innerText = song.rank;
                playedSong.classList.add("text-center", "px-3");
            let songTime = document.createElement("td");
                songTime.classList.add("px-0");
            const minutes = Math.floor((song.duration % 3600) / 60);
            const remainingSeconds = song.duration % 60;
            let timingSong;
            if (remainingSeconds < 10) {
                timingSong = `${minutes}:0${remainingSeconds}`;
            } else {
                timingSong = `${minutes}:${remainingSeconds}`;
            }
            songTime.innerText = timingSong;
            
            songsTable.appendChild(tableRow);
                tableRow.appendChild(songNumb);
                tableRow.appendChild(songTitleArtista);
                    songTitleArtista.appendChild(songTitle);
                    songTitleArtista.appendChild(songArtista);
                tableRow.appendChild(playedSong);
                tableRow.appendChild(songTime);
        })
    }
}