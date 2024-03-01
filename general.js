// close the right bar-side:
// document.getElementById("rightbar-close").addEventListener("click",()=> {
//     document.getElementById("right-barside").classList.add("d-none", "d-lg-none");
//     document.getElementById("page-section").classList.remove("col-lg-8");
//     document.getElementById("page-section").classList.add("col-lg-10");
// });
const rightClose = document.getElementById("rightbar-close");
const rightOpen = document.getElementById("rightbar-open");
const rightbar = document.getElementById("right-toggle");
const rightbar2 = document.getElementById("right-toggle-2")

rightClose.addEventListener("click", () => {
    rightClose.classList.toggle('d-none');
    rightOpen.classList.toggle('d-none');
    rightbar.classList.toggle('d-none');
    rightbar2.classList.toggle('d-none');
})

rightOpen.addEventListener("click", () => {
    rightClose.classList.toggle('d-none');
    rightOpen.classList.toggle('d-none');
    rightbar.classList.toggle('d-none');
    rightbar2.classList.toggle('d-none');
})



// random album in the song-bar:
