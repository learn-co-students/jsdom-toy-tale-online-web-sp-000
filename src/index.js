////npm install -g json-server
//json-server --watch db.json
let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  //fetch toys 
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => addCards(json))
    .catch(error => showError(error))
})

//add toy 
document.addEventListener('submit', function(e) => {
  // e.preventDefault()
  const configObject = getConfigObject()
  return fetch('http://localhost:3000/toys', configObject)
    .then(res => res.json())
    .then(json => addCards(json))
    .catch(error => showError(error))
})


//add cards  - toy info 
function addCards(toys) {
  if (toys.length) {
    toys.forEach(toy => {
      getToyAttributes(toy)
    })
  } else {
    getToyAttributes(toy)
  }
}
//catch function? 
function showError(e) {
  const container = document.querySelector('.container') //returns 1st element
  const errorMessage = e.message
  const div = document.createElement('div') //create div 
  div.innerText = errorMessage
  container.appendChild(div)
}

//add a new toy
//post request, telling fetch() this is a post request 
function getConfigObject() {
  const configuration = {
    method: "POST",
    headers: { // headers= metadata to send and accept json data 
      "Content-Type": "application/json",
      "Accept" : "application/json"
    }
  }
  const toyName = document.querySelector('input[name="name"]').value
  const toyImage = document.querySelector('input[name="image"]').value
  configuration.body = JSON.stringify({ //convert object to string 
    name: toyName,
    image: toyImage,
    likes: "0"
  })
  return configuration
}
// "{"name": "toyName", "image": "toyImage", "likes": "0"}""

//increase toys likes 
function increaseLikes(toy, target) {
  const configObject = {
    method: "PATCH", //patch request localhost/toys/:id
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  }
  return fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
    .then(res => res.json())
    .then(json => {
    // update the target's card's like number based on the json response
})
}

