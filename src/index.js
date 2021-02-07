let addToy = false;

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
  getToys()
});

const collection = document.getElementById("toy-collection")

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    for(const element of data){
      renderToys(element)
    }
  });
}

const form = document.getElementsByClassName("add-toy-form");
form[0].addEventListener("submit", (e) => {
    postToys(e)
})

function postToys(e){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(object => {
    renderToys(object);
    console.log(object)
  })
  .catch(function(error){
    document.body.innerHTML = error.message
  })
}

function renderToys(toy){
  let h2 = document.createElement("h2");
  h2.innerText = toy.name

  let img = document.createElement("img");
  img.setAttribute("class", "toy-avatar")
  img.src = toy.image

  let p = document.createElement("p");
  p.setAttribute("id", `${toy.id}`)
  p.innerHTML = `${toy.likes} likes`

  let btn = document.createElement("button");
  btn.setAttribute("class", "like-btn")
  btn.innerText = "Like <3"
  btn.addEventListener('click', (e) => {
      likes(e)
  })

  let div = document.createElement("div");
  div.setAttribute("class", "card")
  div.append(h2, img, p, btn)
  collection.appendChild(div);
}

function likes(e){
  e.preventDefault()

  let id = e.target.previousElementSibling.id
  let currentLikes = e.target.previousElementSibling.innerText.split(" ")[0]
  let updated = parseInt(currentLikes) + 1

   fetch(`http://localhost:3000/toys/${id}`, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
     },
     body: JSON.stringify({
       "likes": `${updated}`
     })
    })
     .then(resp => resp.json())
     .then(object => {
       e.target.previousElementSibling.innerText = `${updated} likes`;
     })
}
