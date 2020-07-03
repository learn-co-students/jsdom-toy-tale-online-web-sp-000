let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block'
    } else {
      toyFormContainer.style.display = 'none'
    }
  })

  renderToys()

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', e => {
    const name = document.getElementsByName('name')[0]
    const image = document.getElementsByName('image')[0]
    e.preventDefault()
    submitForm(name.value, image.value)

    addToy = !addToy
    toyFormContainer.style.display = 'none'
    name.value = ''
    image.value = ''
  })
})

const renderToys = () => {
  fetch('http://localhost:3000/toys')
    .then(r => r.json())
    .then(o => o.forEach(toy => makeDiv(toy)))
}

const makeDiv = toy => {
  const div = document.createElement('div')
  const collection = document.getElementById('toy-collection')
  div.className = 'card'
  const h2 = document.createElement('h2')
  h2.innerHTML = toy.name
  const img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'
  const p = document.createElement('p')
  p.innerHTML = `${toy.likes} likes`
  p.id = `toy-likes-${toy.id}`
  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.innerText = 'like'
  btn.addEventListener('click', event => likeToy(toy, event))
  div.append(h2, img, p, btn)
  collection.appendChild(div)
}

const submitForm = (name, image) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
    .then(res => res.json())
    .then(toy => {
      makeDiv(toy)
    })
}

const likeToy = (toy, e) => {
  e.preventDefault()
  toy.likes++
  const formData = toy

  const configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(formData)
  }

  return fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(r => {
      return r.json()
    })
    .then(o => {
      updateLikes(o)
    })
}

const updateLikes = toy => {
  document.getElementById(
    `toy-likes-${toy.id}`
  ).innerHTML = `${toy.likes} likes`
}
