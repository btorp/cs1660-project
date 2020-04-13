const fileSelect = document.querySelector("button"),
  fileElem = document.querySelector("input"),
  loadEngine = document.querySelector(".indices-button button");


// for when choose files is clicked
fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }  
}, false);


// for when files are selected
fileElem.addEventListener("change", function () {
  // reset list 
  document.querySelector(".file-list").innerHTML = "";

  // display selected folder name below button
  if (fileElem.files.length != 0) {
    const path = fileElem.files[0].webkitRelativePath;
    const folder = path.split("/")[0];
    const list_elem = document.createElement("li");
    list_elem.setAttribute("type", "none");
    list_elem.innerHTML = folder;
    document.querySelector(".file-list").appendChild(list_elem);
  }


  // create list elements and display below the button 
  /*
  for (let i = 0; i < fileElem.files.length; i++) {
    const file_name = fileElem.files[i].name;
    const list_elem = document.createElement("li");
    list_elem.setAttribute("type", "none");
    list_elem.innerHTML = file_name;
    document.querySelector(".file-list").appendChild(list_elem);
    console.log(file_name);
  }
  */

  //  change text of lower button to "Load Engine" if there are files selected, 
  //if not set it to "Construct Inverted Indices"
  //loadEngine.innerHTML = fileElem.files.length > 0 ? "Load Engine" : "Construct Inverted Indices";

}, false);


// for when load engine is pressed
loadEngine.addEventListener("click", function (e) {
  if (fileElem.files.length == 0) return;

  if (document.querySelector('ul').childElementCount == 0) return;

  folder = document.querySelector('li').innerHTML;

  fetch("/", {
    method: "POST",
    body: folder
  }).then(res => {
    console.log("success!", res);
    window.location.href = "load";
  });


}, false);