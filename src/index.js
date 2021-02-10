let addToy = false;
const toyCollection = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
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
    .then(function(json) {
        for (const element of json){
          renderCards(element)
        }
    });
}

fetchToys();

function renderCards(element){
  const div = document.createElement('div');
  div.className = "card";
  div.id = element.id;
  const h2 = document.createElement('h2');
  h2.innerHTML = element.name;
  const img = document.createElement('img');
  img.src = element.image;
  img.className = "toy-avatar";
  const p = document.createElement('p');
  p.innerHTML = element.likes + " Likes";
  const likeBtn = document.createElement("button");
  likeBtn.addEventListener('click', event => {
    let num = parseInt(likeBtn.previousElementSibling.innerHTML.split(' ')[0]);
    console.log(num)
    num += 1;
    let likes = likeBtn.previousElementSibling;
    likes.innerHTML = num + " Likes";
    const id = likeBtn.parentElement.id;
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": num
      })
    })
  });
  likeBtn.className = "like-btn";
  likeBtn.innerHTML = "Like <3";
  div.append(h2, img, p, likeBtn);
  toyCollection.appendChild(div);
}

function renderLastCard(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(function(json) {
    const lastCard = json.slice(-1)[0];
    renderCards(lastCard);
  });
}

function submitData(name, image){
  fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        image,
        "likes": 0
      })
    })
  renderLastCard();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("input[type=submit]").addEventListener("click", function(event) {
    let newName = document.querySelector("input[name=name]");
    let newImage = document.querySelector("input[name=image]");
    submitData(newName.value, newImage.value);
    event.preventDefault();
    newImage.value = "";
    newName.value = "";
    const toyFormContainer = document.querySelector(".container");
    toyFormContainer.style.display = "none";
  });
});


