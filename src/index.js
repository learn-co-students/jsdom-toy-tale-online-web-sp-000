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

function addImage(){ 
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(results => {
   results.forEach(toy => createToy(toy))
  })
}

function createToy(toy) {
  let container = document.querySelector('#toy-collection');
  let card = document.createElement('div')
  card.className = "card"
  container.appendChild(card)
  card.id = toy.id
  container.innerHTML = `<h2>${toy.name}</h2><img scr=${toy.image} class="toy-avatar" />`  
  
}

document.addEventListener("DOMContentLoaded", () => {
  addImage();
 
})