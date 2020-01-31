let addToy = false

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

})


//get toys
function getAllToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

//RENDER
// create/render card and add it's elements
function renderToys(toy) {

let card = document.createElement("div")
card.setAttribute('class','card')
card.append(h2, img, p, btn)
toyForm.append(card)
//create card 

let h2 = document.createElement('h2')
h2.innerText = toy.name 
//create h2 for toy name

let img = document.createElement('img')
img.setAttribute('src', 'toy.image')
img.setAttribute('class', 'toy-avatar')
//create img toy pic

let p = document.createElement('p')
p.innerText = `${toy.likes} likes`
//create p for number of likes

let btn = document.createElement('button')
btn.setAttribute('class','like-btn')
btn.setAttribute('id',toy.id)
btn.innerText = 'like'
btn.addEventListener('click', (e) => {console.log(e.target.dataset);likes(e)})
//create like button

}


function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}


// Post new  toy 
function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy) // put toy into render function 
      card.append(new_toy)
    })
}

// Click like button
addBtn.addEventListener('click', () => {
  addToy = !addToy // hide form if true
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target) // click event 
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// loop through toy data 
getAllToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})
