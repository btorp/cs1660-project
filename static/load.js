const searchButton = document.querySelector(".search-button button"),
  topNButton = document.querySelector(".top-n-button button");


// for when search is clicked
searchButton.addEventListener("click", function (e) {

  window.location.href = "search";

}, false);


// for when Top-N is clicked
topNButton.addEventListener("click", function (e) {

  window.location.href = "top-n"

}, false);
