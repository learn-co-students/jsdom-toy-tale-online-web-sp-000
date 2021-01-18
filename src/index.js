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
});

fetchToys();
createToyCard();
createNewToy();


function fetchToys() {
  const toyUrl = 'http://localhost:3000/toys'
  return fetch(toyUrl)
    .then(response => response.json())
    .then(results => {
      results.forEach(toy => createToyCard(toy));
    });
}

function createToyCard(toy) {
  // creating elements on the DOM to create the overall card for each toy
  const toyCollection = document.querySelector("#toy-collection")

    let toyCard = document.createElement('div')
    let h2Holder = document.createElement('h2')
    let imgHolder = document.createElement('img')
    let pHolder = document.createElement('p')
    let buttonHolder = document.createElement('button')

    toyCard.classList.add('card')
    imgHolder.classList.add('toy-avatar')
    buttonHolder.classList.add('like-btn')

    toyCard.innerHTML = toy.id
    h2Holder.innerHTML = toy.name
    imgHolder.src = toy.image 
    pHolder.innerHTML = toy.likes 

    // appending the properties of the card and the card itself onto the DOM
    toyCard.appendChild(h2Holder)   
    toyCard.appendChild(imgHolder)  
    toyCard.appendChild(pHolder)    
    toyCard.appendChild(buttonHolder) 

  toyCollection.appendChild(toyCard)
}

  function createNewToy(id, name, image, likes)
    return fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        id,
        name, 
        image,
        likes
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(results) {
      console.log(results);
    })
