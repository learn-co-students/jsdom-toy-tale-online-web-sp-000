const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

let newToyForm = document.querySelector('form.add-toy-form')

newToyForm.addEventListener('submit', e => {
  let inputs = e.target.querySelectorAll('input')
  let name = inputs[0].value
  let image = inputs[1].value
  makeToys(name, image)
})

function makeToys(name, image) {
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      image: `${image}`,
      likes: 0
    })
  };

  fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      const div = document.querySelector('div#toy-collection')
      let divCard = document.createElement('div')
      divCard.className = 'card'
      let h2 = document.createElement('h2')
      h2.innerHTML = object.name
      let img = document.createElement('img')
      img.className = 'toy-avatar'
      img.src = object.image
      let p = document.createElement('p')
      p.innerHTML = `${object.likes} Likes`
      let btn = document.createElement('button')
      btn.className = 'like-btn'
      btn.innerHTML = 'Like <3'
      divCard.appendChild(h2)
      divCard.appendChild(img)
      divCard.appendChild(p)
      divCard.appendChild(btn)
      div.appendChild(divCard)
    });
}

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let x = 0
      object.forEach(function(toy) {
        const div = document.querySelector('div#toy-collection')
        let divCard = document.createElement('div')
        divCard.className = 'card'
        let h2 = document.createElement('h2')
        h2.innerHTML = toy.name
        let img = document.createElement('img')
        img.className = 'toy-avatar'
        img.src = toy.image
        let p = document.createElement('p')
        p.innerHTML = `${toy.likes} Likes`
        let btn = document.createElement('button')
        btn.className = 'like-btn'
        btn.innerHTML = 'Like <3'
        btn.addEventListener('click', function() {
          toy.likes += 1
          p.innerHTML = `${toy.likes} Likes`
        })
        divCard.appendChild(h2)
        divCard.appendChild(img)
        divCard.appendChild(p)
        divCard.appendChild(btn)
        div.appendChild(divCard)
        x += 1
      })
    });
};

getToys();
