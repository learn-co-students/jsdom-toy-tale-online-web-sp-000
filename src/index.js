const newToyButton = document.querySelector('#new-toy-btn');
// selects object with id new-toy-btn, remember to add the # for querySelector
const newToyForm = document.querySelector('.container');
// same thing with the .
// it's a bit weird because it's selecting for one object
// but it's still a class for some reason
// idk why this isn't an id but anyway, include the .

let toyCollect = document.querySelector('#toy-collection')
// # = toe pick
let addToy = false 
// this will be useful later - line

newToyButton.addEventListener('click', () => {
  addToy = !addToy 
  // setting addToy to true
  if (addToy) {
    newToyForm.style.display = 'block'
    newToyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
      // postToy function defined below, collects the response and makes it into an object
    })
  } else {
    newToyForm.style.display = 'none'
  }
})

function fetchToys() {
  return fetch('http://localhost:300/toys').then(function(response) { return response.json()})
}
// Fetch Andy's Toys: GET request to fetch all the toy objects. In this case, all the data on the page as a json object
// Because the function is basically a big return thing, FOR THESE PURPOSES it can be thought of as a variable called fetchToys

function postToy(input) {
  fetch('http://localhost:3000/toys', configObj)
  // Pretty bog standard HTTP Post fetch code
  .then(function (response) {
    return response.json()
    // or 'res => res.json()'
  })
  .then(function (object) {
    renderToys(object)
    // or also (object) => { renderToys(object) }
    // RenderToys is under the supplemental objects to this function
  })
}

const configObj = {
// Pretty bog-standard HTTP Post fetch code 
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
}
// Putting this here as a separate thing because it may be easier to think about if I type just this part ten times in rapid succession

const formData = {
  "name": input.name.value,
  "image": input.image.value,
  "likes": 0
  // The 'name' and 'image' are the keys from the container form
  // in HTML this is name="name" and name="image" in the input tag
}

function renderToys(obj) {
// Function creates the container for displaying the toys, container needs h2 tag/name, img tag/toy image src, p tag/likes, button tag/class = like-btn
  let h2 = document.createElement('h2')
  h2.innerText = obj.name
  // attribute comes from input tag name=name

  let img = document.createElement('img')
  img.setAttribute('src', obj.image)
  // attribute comes from input tag name=image
  img.setAttribute('class', 'toy-avatar')
  // setting the attribute of class, taking the attribute content from the css 

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  // attribute comes from 

  let button = document.createElement('button')
  button.setAttribute('class', 'button')
  // setting the attribute of class, taking the attribute content from the css
  button.setAttribute('id', toy.id)
  // setting the button id (remember ids are individual) as the toy id from the json db
  button.innerText = "like"
  button.addEventListener('click', (e) => {
    likes(e)
    // event listener for clicking the like button
  })

  let card = document.createElement('div')
  // container element for all of these things
  // remember you have to create each element then append the child elements
  card.setAttribute('class', 'card')
  card.append(h2, img, p, button)
  toyCollect.append(card)
}

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})
// arg => func. get all the toys, render each toy in the database into a card like the renderToys function up there.