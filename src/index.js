
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function getToys(){
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
}

function renderToys(toy){
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  
  let image = document.createElement('img')
  image.setAttribute('src', toy.image)
  image.setAttribute('class', 'toy-avatar')

  let p =document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-button')
  button.setAttribute('id', toy.id)
  button.innerText = 'like'
  button.addEventListener('click', (event) => console.log(event.target.dataset), likes(event) )
}

function likes(event){
  event.preventDefault()
  let another = parseInt(event.target.previousElementSibling.innerText)+1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': another 
    }),
  
    .then(response => response.json())
    .then(like_obj => event.target.previousElementSibling.innerText = `${another} likes`)
  }
}

getToys().then(toys => toys.forEach(toy => renderToys(toy)))