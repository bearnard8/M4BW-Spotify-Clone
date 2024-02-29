const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/416239";
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
// input per ricerca
const btnSearch = document.getElementById("search-btn");
const inputSearch = document.getElementById("search-input");




window.onload = getResults();

async function getResults () {
    tablePopular.innerHTML = "";
    try {
        const res = await fetch(endPoint);
        const json = await res.json();
        getInfoTop(json);
        console.log(json)

        const song = await fetch(json.tracklist)
        const list = await song.json();
        const listData = list.data;
        listData.sort((a, b) => b.rank - a.rank);
        console.log(listData)
        listData.forEach(element => {
            if (num < maxNum ){
                createPopular(element);
                console.log(num);
            }
        });
        
    } catch (error) {
        console.log(error);
    }
    num =1;
}

btnOther.addEventListener("click", async () => {
    if(maxNum === 6) {
        maxNum = 11;
        btnOther.innerText = "Riduci";
        await getResults();
        console.log(maxNum)
    } else if (maxNum === 11) {
        maxNum = 6;
        
        await getResults();
        btnOther.innerText = "Visualizza altro";
        console.log(maxNum)
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

// close the right bar-side:
document.getElementById("rightbar-close").addEventListener("click",()=> {
    document.getElementById("right-barside").classList.add("d-none", "d-lg-none");
    document.getElementById("page-section").classList.remove("col-lg-8");
    document.getElementById("page-section").classList.add("col-lg-10");
});