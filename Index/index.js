// Variabili globali
const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

// Variabile artista degli album di benvenuto
const welcomeArtist = "Coldplay";

// Container card album suggeriti
const cardContainer = document.getElementById("suggestions-container");

const albums = [];
const rndAlbums = [];

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