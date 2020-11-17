let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();

});

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => getToys(json))
}

function getToys(json){ 
  console.log(json)
  let divCollection = document.getElementById("toy-collection");
  for(let i = 0; i < json.length; i ++){
    let div = document.createElement("div");
    div.setAttribute('class', 'card');

    let h2 = document.createElement("h2");
    h2.innerHTML = json[i].name;

    let image = document.createElement("img");
    image.src = json[i].image;
    image.setAttribute = ("class", "toy-avatar")
    image.class = "toy-avatar"

    let p = document.createElement("p");
    p.innerHTML = `${json[i].likes} likes`;

    let button = document.createElement("BUTTON");
    button.innerHTML = "Like <3";
    button.setAttribute("class", "like-btn")
    
    divCollection.appendChild(div);
    div.appendChild(h2)
    div.appendChild(image);
    div.appendChild(p);
    div.appendChild(button)
  }
}

let configObj = {    
  method: 'POST',
  headers: {
  "Content-Type":  "application/json",
  "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  })
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
    "Content-Type":  "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = getToys(obj_toy)
      divCollect.append(new_toy)
    })  
  }