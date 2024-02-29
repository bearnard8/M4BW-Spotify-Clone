// Variabili globali
const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// Variabile artista degli album di benvenuto
const welcomeArtist = "a";

// Container card album suggeriti
const cardContainer = document.getElementById("suggestions-container");

// Input di ricerca
const inputField = document.getElementById("search-input");

// Contenitore del contenuto centrale
const midBox = document.getElementById("central-content");

// close the right bar-side:
document.getElementById("rightbar-close").addEventListener("click",()=> {
    document.getElementById("right-barside").classList.add("d-none", "d-lg-none");
    document.getElementById("page-section").classList.remove("col-lg-8");
    document.getElementById("page-section").classList.add("col-lg-10");
});

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

function createAlbumCard({title, cover_xl}) {

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

    let cardBox = document.createElement("div");
    cardBox.classList.add("col-md-2");
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

    cardContainer.appendChild(cardBox);
        cardBox.appendChild(cardBody);
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
                cardAnchor.classList.add("col-md-2");
            let cardBody = document.createElement("div");
                cardBody.classList.add("card", "text-bg-dark");
            let albumCover = document.createElement("img");
                albumCover.classList.add("card-img-top", "p-3");
                albumCover.src = album.cover_xl;
            let cardText = document.createElement("div");
                cardText.classList.add("card-body", "playlist-info");
            let albumTitle = document.createElement("p");
                albumTitle.classList.add("card-text", "playlist-desc");
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
                cardAnchor.classList.add("col-md-2");
                cardAnchor.href = `/IndexArtist/indexArtist.html?artid=${artist.id}`;
            let cardBody = document.createElement("div");
                cardBody.classList.add("card", "text-bg-dark", "h-100");
            let artistPic = document.createElement("img");
                artistPic.classList.add("card-img-top", "p-3");
                artistPic.src = artist.picture_xl;
            let cardText = document.createElement("div");
                cardText.classList.add("card-body", "playlist-info");
            let artistName = document.createElement("p");
                artistName.classList.add("card-text", "playlist-desc");
                artistName.innerText = artist.name;

            artistCardsRow.appendChild(cardAnchor);
                cardAnchor.appendChild(cardBody);
                    cardBody.appendChild(artistPic);
                    cardBody.appendChild(cardText);
                        cardText.appendChild(artistName);
        });
    }

}