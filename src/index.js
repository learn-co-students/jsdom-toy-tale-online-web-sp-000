const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function() {
  fetchToys();
})


/// Fetch Andy's Toys
function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => renderToys(json));
}


/// Add toy
toyForm.addEventListener("submit", function(e){
e.preventDefault()
sendToyData(e.target)
})

//// post fetch to send toy data
//// method is post
//// use ".stringify" om json data
function sendToyData(form) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({name: form.name.value, image: form.image.value, likes: 0})
  })
  .then(response => response.json())
  .then(newToy => {
    const toyContainer = document.querySelector("#toy-collection")
    toyContainer.insertAdjacentHTML("beforeend", 
        `<div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p><span class="counter" data-id="${newToy.id}">${newToy.likes = 0}</span> Likes</p>
        <button class="like-btn" data-id="${newToy.id}">Like <3</button>
        </div>`)
    form.reset()
  })
}

////Increase toy's likes
let toyContainer = document.querySelector("#toy-collection")

toyContainer.addEventListener("click", function(e){
  if (e.target.className === "like-btn"){

    let id = e.target.dataset.id
    let targetSpan;

    document.querySelectorAll("span.counter").forEach(function(span){
      if (span.dataset.id === e.target.dataset.id)
        targetSpan = span 
    })
    targetSpan.innerText++

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        likes: parseInt(targetSpan.innerText)
      })
    })
    .then(response => response.json())
  }
    
  })

/// render card using example
///  <div class="card">
///<h2>Woody</h2>
///<img src=toy_image_url class="toy-avatar" />
///<p>4 Likes </p>
///<button class="like-btn">Like <3</button>
///</div>

function renderToys(json) {
  const toyContainer = document.querySelector("#toy-collection")
    json.forEach(toy => {
      const div = document.createElement("div")
      div.className = "card"
      div.innerHTML = 
        `<h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p><span class="counter" data-id="${toy.id}">${toy.likes}</span> Likes</p>
        <button class="like-btn" data-id="${toy.id}">Like <3</button>`
      toyContainer.append(div)
  })
}

///
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})