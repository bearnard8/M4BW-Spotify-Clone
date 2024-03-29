
const containerTopAlbum = document.getElementById("top-section");

const containerSong = document.getElementById("song-list");

const backgroundColor = document.getElementById("back-gradient");

const albumEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";

const paramAlbum = new URLSearchParams(window.location.search);
const idAlbum = paramAlbum.get("albid");


async function getData(){
    try {
        const result = await fetch(albumEndpoint+idAlbum)
        const json = await result.json();
        // console.log(json);
        createAlbumPage(json);
        
    } catch (error) {
        console.log(error);
    }
}

getData();


// FUNZIONE PER CREARE LA TESTA

function createAlbumPage({title, cover_medium, artist, tracks, duration }){

    containerTopAlbum.innerHTML="";
    containerSong.innerHTML = "";

    let containerImg = document.createElement("div");
    containerImg.classList.add("col-md-3");

    let imgAlbum = document.createElement("img");
    imgAlbum.src = cover_medium;

    let containerText = document.createElement("div");
    containerText.classList.add("col-md-9", "text-white");

    let albumTx = document.createElement("p");
    albumTx.innerText = "ALBUM";

    let albumTitle = document.createElement("p");
    albumTitle.innerText = title;
    albumTitle.classList.add("fw-bold");

    let boxArtist = document.createElement("div");
    boxArtist.classList.add("d-flex", "px-2");

    let artistName = document.createElement("p");
    artistName.innerText = artist.name + " •";
    artistName.classList.add("fw-bold");

    let boxTrackNumb = document.createElement("div");
    boxTrackNumb.classList.add("d-flex", "px-2", "gap-2", "fw-bold");

    let totalTracks = document.createElement("p");
    let countTrack = tracks.data;
    for (let i = 0; i < countTrack.length; i++) {
        i++;
        totalTracks.innerText=i++;
    }

    let trackTx = document.createElement("p");
    trackTx.innerText= "brani • ";
    
    
    let albumTiming = document.createElement("p");
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const remainingSeconds = duration % 60;
    let timingSong;

    if (hours === 0) {
        timingSong = `${minutes} minuti ${remainingSeconds} secondi`;
    } else if (hours === 1){
        timingSong = `${hours} ora ${minutes} minuti ${remainingSeconds} secondi`;
    } else if (remainingSeconds < 10){
        timingSong = `${hours} ore ${minutes} minuti 0${remainingSeconds} secondi`;
    } else {
        timingSong = `${hours} ore ${minutes} minuti ${remainingSeconds} secondi`;
    }


    albumTiming.innerText = timingSong;
    albumTiming.classList.add("fw-lighter");
    

    containerImg.appendChild(imgAlbum);
    containerText.appendChild(albumTx),
    containerText.appendChild(albumTitle);
    boxTrackNumb.appendChild(totalTracks);
    boxTrackNumb.appendChild(trackTx);
    boxArtist.appendChild(artistName);
    boxArtist.appendChild(boxTrackNumb);
    boxArtist.appendChild(albumTiming);
    containerText.appendChild(boxArtist);
    containerTopAlbum.appendChild(containerImg);
    containerTopAlbum.appendChild(containerText);
    containerTopAlbum.appendChild(containerText);

    let songArray = tracks.data;

    songArray.forEach(element => {
        songListDisplay(element);
        console.log(element);
    });

}

// FUNZIONE PER CREARE LA LISTA DELLE FUNZIONI
let count = 1;

function songListDisplay ({title, artist, rank, duration}){

    let tableRow = document.createElement("tr");
    tableRow.classList.add("row", "text-white", "fw-lighter", "py-1");

    let songNumb = document.createElement("th");
    songNumb.classList.add("col-md-1", "text-end", "px-0");
    songNumb.innerText = count ++;
 
    
    let songTitleArtista = document.createElement("td");
    songTitleArtista.classList.add("col-md-6", "px-3");

    let songTitle = document.createElement("p");
    songTitle.innerText = title;
    songTitle.classList.add("fw-bold");

    let songArtista = document.createElement("p");
    songArtista.innerText = artist.name;


    let playedSong = document.createElement("td");
    playedSong.innerText = rank;
    playedSong.classList.add("col-md-4", "text-center", "px-3");

    let songTime = document.createElement("td");
    songTime.classList.add("col-md-1", "px-0");
    const minutes = Math.floor((duration % 3600) / 60);
    const remainingSeconds = duration % 60;
    let timingSong;
    if (remainingSeconds < 10) {
        timingSong = `${minutes}:0${remainingSeconds}`;
    } else {
        timingSong = `${minutes}:${remainingSeconds}`;
    }
    songTime.innerText = timingSong;
    
    songTitleArtista.appendChild(songTitle);
    songTitleArtista.appendChild(songArtista);
    tableRow.appendChild(songNumb);
    tableRow.appendChild(songTitleArtista);
    tableRow.appendChild(playedSong);
    tableRow.appendChild(songTime);
    containerSong.appendChild(tableRow);
 
}


// FUNZIONE PER CREARE IL COLORE DI SFONDO RANDOM

let colorBack = ["blu", "rosso", "verde", "viola", "giallo", "lightblu", "rosa"];
let colorMix = colorBack[Math.floor(Math.random() * colorBack.length)];

backgroundColor.classList.add(colorMix);
console.log(colorMix);


// close the right bar-side:
document.getElementById("rightbar-close").addEventListener("click",()=> {
    document.getElementById("right-barside").classList.add("d-none", "d-lg-none");
    document.getElementById("page-section").classList.remove("col-lg-8");
    document.getElementById("page-section").classList.add("col-lg-10");
});

