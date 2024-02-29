// close the right bar-side:
document.getElementById("rightbar-close").addEventListener("click",()=> {
    document.getElementById("right-barside").classList.add("d-none", "d-lg-none");
    document.getElementById("page-section").classList.remove("col-lg-8");
    document.getElementById("page-section").classList.add("col-lg-10");
});


// random album in the song-bar:
