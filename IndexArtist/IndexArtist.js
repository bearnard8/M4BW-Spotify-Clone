const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/search?q=imagine_dragons";
// sezione top
const topSection = document.getElementById("top-section");
// nome artista
const nameArtist = document.getElementById("artist-title");
// tabella popular
const tablePopular = document.getElementById("table-popular");
// btn other
const btnOther = document.getElementById("other");
// counter per numero canzoni
let num = 1;
// counter per visualizza altro
let maxNum = 6;




window.onload = getResults();

async function getResults () {

    try {
        const res = await fetch(endPoint);
        const json = await res.json();
        const data = json.data;
        getInfoTop(data[0].artist)

        const song = await fetch(data[0].artist.tracklist)
        const list = await song.json();
        const listData = list.data;
        listData.sort((a, b) => b.rank - a.rank);
        
        listData.forEach(element => {
            if (num < maxNum ){
                createPopular(element);
                console.log(element)
            }
        });
        
    } catch (error) {
        console.log(error);
    }

}

btnOther.addEventListener("click", async () => {
    if(maxNum === 6) {
        maxNum = 11;
        btnOther.innerText = "Riduci";
        await getResults();
        // console.log(maxNum)
    } else if (maxNum === 11) {
        maxNum = 6;
        tablePopular.innerHTML = "";
        await getResults();
        btnOther.innerText = "Visualizza altro";
        // console.log(maxNum)
    }
})

function getInfoTop ({picture_xl, name}) {
    topSection.style.backgroundImage = `url(${picture_xl})`
    topSection.style.backgroundRepeat = "no-repeat";
    topSection.style.backgroundSize = "cover";

    nameArtist.innerText = name;
}

function createPopular (song) {
    // durata canzone
    let time = parseInt(song.duration);
    const minutes = Math.floor((time % 3600) / 60);
    const remainingSeconds = time % 60;
    let timingSong;
    if (remainingSeconds < 10) {
        timingSong = `${minutes}:0${remainingSeconds}`;
    } else {
        timingSong = `${minutes}:${remainingSeconds}`;
    }
    // console.log(maxNum)
    let tr = document.createElement('tr');
    let th = document.createElement('td')
    let tdImg = document.createElement('td');
    let img = document.createElement('img');
    let name = document.createElement('td');
    let rank = document.createElement('td');
    let duration = document.createElement('td');
    
    // assegnazioni classi
    tr.classList.add('row', 'justify-content-center', 'align-items-baseline')
    th.classList.add('col-1'),
    tdImg.classList.add('col-2');
    name.classList.add('col-5');
    rank.classList.add('col-2');
    duration.classList.add('col-1');

    // assegnazione valori
    th.innerText = num++;
    img.src = song.album.cover_small;
    name.innerText = song.title;
    rank.innerText = song.rank;
    duration.innerText = timingSong;
    // console.log(num)
    // creazione elemento
    tdImg.appendChild(img)
    tr.appendChild(th);
    tr.appendChild(tdImg);
    tr.appendChild(name);
    tr.appendChild(rank);
    tr.appendChild(duration);
    tablePopular.appendChild(tr);
}
