// close the right bar-side:
document.getElementById("rightbar-close").addEventListener("click",()=> {
    document.getElementById("right-barside").classList.add("d-none");
    document.getElementById("page-section").classList.remove("col-8");
    document.getElementById("page-section").classList.add("col-10");
});
