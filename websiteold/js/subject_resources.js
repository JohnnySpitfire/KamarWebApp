let subjectSearch = document.getElementsByClassName("subject-search")[0];
let subjectSearchButton = document.getElementsByClassName("subject-search-button")[0];
let searchQuery = "";

const ToggleSearchStyle = (() =>{
    setTimeout(() => {
        subjectSearch.classList.toggle("subject-search-active");
        subjectSearchButton.classList.toggle("subject-search-button-active");  
    }, 100);
});

const getSearchQuery = (subjectSearch => {
    searchQuery = subjectSearch.value;
    subjectSearch.value = "";
});

subjectSearch.addEventListener("mouseover", ToggleSearchStyle); 
subjectSearch.addEventListener("mouseleave", ToggleSearchStyle);

subjectSearchButton.addEventListener("click",getSearchQuery)
subjectSearch.addEventListener("keypress", (event =>{
    if (event.keyCode === 13){
        getSearchQuery();
    }
}));
