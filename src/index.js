let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  getToys()
  addBtn.addEventListener('click', (event) => {
    // hide & seek with the form
    event.preventDefault()
    console.log(event)
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        const toyArgument = {
          method: 'POST',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": `${event.target.name.value}`,
            "image": `${event.target.image.value}`,
            "likes": 0
      })
    }
      fetch('http://localhost:3000/toys', toyArgument)
      .then((response) => {
        return response.json()
      }) .then(function(object) {
        return object;
      })
    })} else {
      toyForm.style.display = 'none'
    }
  })
})

function addLikes(event) {
  //event.preventDefault()
  const putToyLikes = parseInt(`${event.target.likes}`) + 1
  fetch(`http://localhost:3000/toys/${event.target.id}`, toyLikeArgument)
  const toyLikeArgument = {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": `${putToyLikes}`
    })
  }
  .then((response) => {
    return response.json()
  }) .then(likesObject => {
    event.target.innerText = `${putToyLikes} likes`
  })

}

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(function(toyArgument){
      //return renderToys(toyArgument)
      toyArgument.forEach(toy => {
        renderToys(toy)
      })
  })
}

function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection")
  const toyCard = `<div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} likes </p>
  <button id="${toy.id}" class="like-btn" onclick="addLikes()">Like <3 </button>
  </div>`
  toyCollection.innerHTML += toyCard
  //let button = document.getElementById(`${toy.id}`)
}