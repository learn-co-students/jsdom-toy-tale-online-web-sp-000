let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
// let divCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
   .then(r => r.json())
   .then(toys => {
    toysHtml = toys.map(function(toy){
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
      `
    })
    document.querySelector("#toy-collection").innerHtml = 
    toysHtml.join('')

   })
   toyForm.addEventListener("submit", function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then( r => r.json())
    .then( newToy => {
      let newToyHtml = `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>      
      `
      document.querySelector("#toy-collection").innerHTML +=
      newToyHtml
    })
   })
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    getToys().then(toys => {
      toys.forEach(toy => {
        
        renderToys(toy)
      })
    })
  });
});
