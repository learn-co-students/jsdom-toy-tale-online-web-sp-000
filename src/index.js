let addToy = false;
let divToyCollection = document.getElementById('toy-collection');
let toyInput = document.querySelectorAll(".input-text");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  getToys();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault();
        addNewToy();
        // addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => { 
    toys.forEach(toy => renderToys(toy))
  })
}

function renderToys(toy) {
  let h2 = document.createElement("h2")
  h2.innerText = toy.name
  
  let img = document.createElement("img")
  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")

  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    // alert(e.target.innerText)
    addLike(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  // console.log(divCard)
  divToyCollection.append(divCard)
}

function addNewToy() {
  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyInput[0].value,
      "image": toyInput[1].value,
      "likes": 0
    })
  }

  fetch("http://localhost:3000/toys", configurationObject)
  .then(response => response.json())
  .then(object => {
      let newToy = renderToys(object)
  })
}

function addLike(e) {
  e.preventDefault();
  let newLike = parseInt(e.target.previousElementSibling.innerText) + 1;

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept":  "application/json"
      },
      body: JSON.stringify({ "likes": newLike })
  })
  .then(response => response.json())
  .then(object => {
    e.target.previousElementSibling.innerText = `${newLike} likes`
    // alert(object.likes = newLike)
    // alert(object.name)
    // alert(e.target.id)
  })
}