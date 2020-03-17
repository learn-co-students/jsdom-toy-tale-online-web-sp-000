let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    console.log(json)
    json.forEach(toy => {
      addToys(toy)
    })
   //with response data, make div class="card" for each toy & add it to collection div
   //curly braces nullify implicit return of =>
  })
}

function addToys(toy) {
  console.log(toy)
  var divCollect = document.querySelector('#toy-collection')
  const newDiv = document.createElement('div')
  const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
  let img = document.createElement('img')
    img.src = toy.image
  let p = document.createElement('p')
    p.innerHTML = toy.likes
  let button = document.createElement('button')
  newDiv.class = "card"
  button.class = "like-btn"
  img.class = "toy-avatar"
  newDiv.append(h2, img, p, button)

  //newDiv.innerHTML = toy.name
  divCollect.append(newDiv)
}

fetchToys()


//function addNewToy()