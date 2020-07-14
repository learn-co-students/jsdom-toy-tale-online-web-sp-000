let addToy = false;

document.addEventListener("DOMContentLoaded", (
  fetch("http://localhost:3000/toys", {
  method: "GET", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    console.log(object)
    renderToys(object)
    // call a method that renders the toys
    // renderToys method => renderToy iterates through each toy and call second method to do the iterating
    // second method gets called and adds to the page (add listener)
    // document.body.innerHTML = object["id"];
  })
  .catch(function (error) {
      document.body.innerHTML = error
  })
)
);

function renderToys(object) {
  object.forEach(object => renderToy(object)
)}

function renderToy(object) {
  const toyCollection = document.querySelector("#toy-collection");
  const classCard = document.createElement("card");
  
  let h2 = document.createElement("h2")
  h2.innerText = object.name

  let img = document.createElement('img');
  img.src = object.image
  img.class = "toy-avatar"

  let p = document.createElement('p')
  p.innerText = `${object.likes} likes`

  classCard.setAttribute('class', 'card')
  classCard.append(h2, img, p)
  toyCollection.append(classCard)
}
