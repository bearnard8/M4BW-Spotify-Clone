
const containerTopAlbum = document.getElementById("top-section");

const containerSong = document.getElementById("song-list");

const albumEndpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/1121401";


async function getData(){
    try {
        const result = await fetch(albumEndpoint)
        const json = await result.json();
        // console.log(json);
        createAlbumPage(json);
        
    } catch (error) {
        console.log(error);
    }
}

getData();




function createAlbumPage({title, cover_medium, artist, tracks, duration }){

    let containerImg = document.createElement("div");
    containerImg.classList.add("col-md-4");

    let imgAlbum = document.createElement("img");
    imgAlbum.src = cover_medium;

    let containerText = document.createElement("div");
    containerText.classList.add("col-md-8", "text-white");

    let albumTx = document.createElement("p");
    albumTx.innerText = "ALBUM";

    let albumTitle = document.createElement("p");
    albumTitle.innerText = title;
    albumTitle.classList.add();

    let boxArtist = document.createElement("div");
    boxArtist.classList.add("d-flex", "px-2");

    let artistName = document.createElement("p");
    artistName.innerText = artist.name + " •";

    let boxTrackNumb = document.createElement("div");
    boxTrackNumb.classList.add("d-flex", "px-2");

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




