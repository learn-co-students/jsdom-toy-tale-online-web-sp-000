let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
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
     
