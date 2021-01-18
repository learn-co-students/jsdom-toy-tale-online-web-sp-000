let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {

  fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
        // map is a function that takes an array and turns it in a point-to-point transformation
        // map takes a callback function, in this case will take the toy 
        let toysHTML = toys.map(function(toy){
          return `
          <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id='${toy.id}' class="like-btn">Like <3</button>
          </div>
          `
        });
        document.querySelector('#toy-collection').innerHTML = toysHTML.join('')
      })

      toyFormContainer.addEventListener('submit', function(event){
        event.preventDefault();
        let toyName = event.target.name.value 
        let toyImage = event.target.image.value
     
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage, 
      likes: 0
    }) 
  })
  .then(response => response.json)
  .then(newToy => {
    let newToyHTML = `
          <div class="card">
          <h2>${newToy.name}</h2>
          <img src=${newToy.image} class="toy-avatar" />
          <p>${newToy.likes} Likes </p>
          <button data-id='${toy.id}' class="like-btn">Like <3</button>
          </div>
          `
    document.querySelector('#toy-collection').innerHTML += newToyHTML
  })
})

  document.querySelector('#toy-collection').addEventListener('click', (event) => {
    if (event.target.className === 'like-btn'){
      let currentLikes = parseInt(event.target.previousElementSibling.innerText) 
      let newLikes = currentLikes + 1
      event.target.previousElementSibling.innerText = newLikes + " Likes"

      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Accept: 'application/json'
        }, 
        body: JSON.stringify({
          likes: newLikes
        })
      })
    }
  })


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})


// function createToyCard(toy) {
//   // creating elements on the DOM to create the overall card for each toy
//   const toyCollection = document.querySelector("#toy-collection")

//     let toyCard = document.createElement('div')
//     let h2Holder = document.createElement('h2')
//     let imgHolder = document.createElement('img')
//     let pHolder = document.createElement('p')
//     let buttonHolder = document.createElement('button')

//     toyCard.classList.add('card')
//     imgHolder.classList.add('toy-avatar')
//     buttonHolder.classList.add('like-btn')

//     toyCard.textContent = toy.id
//     h2Holder.innerHTML = toy.name
//     imgHolder.src = toy.image 
//     pHolder.innerHTML = toy.likes 

//     // appending the properties of the card and the card itself onto the DOM
//     toyCard.appendChild(h2Holder)   
//     toyCard.appendChild(imgHolder)  
//     toyCard.appendChild(pHolder)    
//     toyCard.appendChild(buttonHolder) 

//   toyCollection.appendChild(toyCard)
// }

// // toy-form-container, add eventlistener to this form, listen for submit, add function
// const toyFormContainer = document.querySelector(".container");

// toyFormContainer.addEventListener('submit', function(event){
//   event.preventDefault();
//   console.log("string")
// })


// // function createNewToy(id, name, image, likes)
// // fetch('http://localhost:3000/toys', {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //     "Accept": "application/json"
// //   },
// //   body: JSON.stringify({
// //     id,
// //     name,
// //     image,
// //     likes
// //   })
// // })
// //   .then(function (response) {
// //     return response.json()
// //   })
// //   .then(function (results) {
// //     console.log(results);
// //   })