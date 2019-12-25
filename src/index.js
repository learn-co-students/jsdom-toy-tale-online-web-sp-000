
let addToy = false
let toys = document.getElementById("toy-collection")



document.addEventListener("DOMContentLoaded", ()=>{
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
  
  fetchToys()
})


function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp=>resp.json())
  .then(json=>addJsonToBlock(json))
}


function addJsonToBlock(json){
  for (const toy of json){
    renderToys(toy)
  }
}

function renderToys(json){
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.setAttribute('id', `card${json.id}`)

  divCard.innerHTML = 
  `<h2>${json.name}</h2>
  <img src=${json.image} class="toy-avatar" />
  <p>${json.likes} Likes </p>
  <button class="like-btn" id=${json.id} onclick="addLikes(this)">Like</button>`

  toys.appendChild(divCard)
}

let form = document.querySelector("form")
let inputs = document.querySelectorAll("input")


form.addEventListener("submit", addNewToy)
function addNewToy(){
  event.preventDefault()
  let formData = {
    name: inputs[0].value,
    image: inputs[1].value,
    likes: 0
  }
  let obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch("http://localhost:3000/toys",obj)
  .then(resp=>resp.json())
  .then(json=>renderToys(json))
  
}

function addLikes(button){
  let toyID = button.id
  let likes = parseInt(document.querySelector(`#card${toyID} p`).innerText)+1
  let obj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
  fetch(`http://localhost:3000/toys/${toyID}`,obj)
   .then(resp=>resp.json())
   .then(json=>(json))

  document.querySelector(`#card${toyID} p`).innerText = `${likes} likes`

}
