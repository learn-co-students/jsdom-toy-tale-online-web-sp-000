
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
    toys.innerHTML += 
    `<div class='card'>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like</button>
    </div>`
  }
}

let form = document.querySelector("form")
let inputs = document.querySelectorAll("input")


form.addEventListener("submit", addNewToy)
function addNewToy(){
  let formData = {
    name: inputs[0].value,
    image: inputs[1].value
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
  .then(json=>alert(json))
}
