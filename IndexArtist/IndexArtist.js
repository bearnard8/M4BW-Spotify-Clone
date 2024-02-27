const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=imagin_dragons";
// sezione top
const topSection = document.getElementById("top-section");
// nome artista
const nameArtist = document.getElementById("artist-title");





window.onload = getResults();

async function getResults () {

    const res = await fetch(endPoint);
    const json = await res.json();
    const data = json.data;
    getInfoTop(data[0].artist)
    console.log(data[0].artist)
}

function getInfoTop ({picture_xl, name}) {
    topSection.style.backgroundImage = `url(${picture_xl})`
    topSection.style.backgroundRepeat = "no-repeat";
    topSection.style.backgroundSize = "cover";

    nameArtist.innerText = name;
}