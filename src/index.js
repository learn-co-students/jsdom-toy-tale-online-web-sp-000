const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById( 'toy-collection' )
const formSubmit = document.querySelector( '.add-toy-form input[type="submit"]' )
const formName = document.querySelector( '.add-toy-form input[name="name"]' )
const formImage = document.querySelector( '.add-toy-form input[name="image"]' )
let addToy = false

const likeListener = event => {
  let newId = event.target.value
  let targetLike = document.querySelector( `#card-${newId} p` )
  let numLikes = parseInt( targetLike.textContent, 10 ) + 1
  targetLike.textContent = numLikes
  let postBody = {
    "likes": numLikes
  }

  let postObj = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify( postBody )

  }

  fetch( `http://localhost:3000/toys/${newId}`, postObj )

}

const createCard = obj => {
  let card = document.createElement( 'div' )
  card.className = 'card'
  card.id = `card-${obj.id}`

  let name = document.createElement( 'h2' )
  name.textContent = obj.name

  let img = document.createElement( 'img' )
  img.src = obj.image
  img.className = 'toy-avatar'

  let likes = document.createElement( 'p' )
  likes.textContent = obj.likes

  let likeButton = document.createElement( 'button' )
  likeButton.className = 'like-btn'
  likeButton.textContent = 'like'
  likeButton.value = obj.id
  likeButton.addEventListener( 'click', likeListener )

  card.appendChild( name )
  card.appendChild( img )
  card.appendChild( likes )
  card.appendChild( likeButton )
  return card
}

document.addEventListener( 'DOMContentLoaded', event => {
  fetch( 'http://localhost:3000/toys' )
    .then( response => response.json() )
    .then( toys => {
      for ( const toy of toys ) {
        toyCollection.appendChild( createCard( toy ))
      }
    })
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

formSubmit.addEventListener( 'click', event => {

  let postBody = {
    name: formName.value,
    image: formImage.value,
    likes: 0
  }

  let postObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify( postBody )
  }

  fetch ( 'http://localhost:3000/toys', postObj )
    
})


// OR HERE!
