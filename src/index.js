const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
let divCollect = document.querySelector('#toy-collection');
const addToyForm = document.querySelector(".add-toy-form")

document.addEventListener("DOMContentLoaded", () => {
  getToys();
});

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy; //toggle syntax - if it was false it will now be true, if was true, will now be false
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

function getToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => makeToys(json));
}

function makeToys(json) {
  let toysHTML = json.map(function(json){
    return `
    <div class="card">
    <h2>${json.name}</h2>
    <img src=${json.image} class="toy-avatar" />
    <p>${json.likes} Likes </p>
    <button data-id=${json.id} class="like-btn">Like <3</button>
    </div>
    `
    /* if children already existed in the collection I would need to += to ADD the new elements. = overrides anything that already exists */
  })
  divCollect.innerHTML = toysHTML.join('') 
  /* .join creates and returns a new string by concatenating the elements of the array. This is an array of string separated by a "," so we are replacing the comment with nothing. It gets rid of the visable comma on the page */ 
}

addToyForm.addEventListener('submit', e => {
  e.preventDefault();
  makeNewToy(e.target);
  e.target.reset();  
  });

function makeNewToy(data) {
   fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify( {
        "name": data.name.value,
        "image": data.image.value,
        "likes": 0
  
    })
  })
  .then(res => res.json())
  .then(newToy => {makeToys(newToy)})
}

divCollect.addEventListener('click', (e) => {
  console.log(e.target);
})

// function incrementLikeCounter(e) {
//   e
// }