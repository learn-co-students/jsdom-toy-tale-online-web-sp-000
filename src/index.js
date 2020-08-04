let addToy = false;

function updateLikes(toyId, currentLikes) {
  newLikeAmount = currentLikes + 1
  let updateData = {
    likes: newLikeAmount
  }

  let configObj = {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(updateData)
  }

  fetch(`http://localhost:3000/toys/${toyId}`, configObj)


}

function createToyCard(toyData) {
  const toyContainerNode = document.querySelector('#toy-collection')
  const divNode = document.createElement('div')
  divNode.setAttribute('class', 'card')
  toyContainerNode.appendChild(divNode)
  const h2Node = document.createElement('h2')
  h2Node.innerText = toyData['name']
  divNode.appendChild(h2Node)
  const imgNode = document.createElement('img')
  imgNode.setAttribute('src', toyData['image'])
  imgNode.setAttribute('class', 'toy-avatar')
  divNode.appendChild(imgNode)
  const pNode = document.createElement('p')
  pNode.innerText = `${toyData['likes']} likes`
  divNode.appendChild(pNode)
  buttonNode = document.createElement('button')
  buttonNode.innerText = 'Like <3'
  buttonNode.setAttribute('class', 'like-btn')
  buttonNode.setAttribute('value', `${toyData['id']}`)
  buttonNode.addEventListener('click', (e) => {
    e.preventDefault()
    updateLikes(e.target.value, toyData['likes'])
  })
  divNode.appendChild(buttonNode)
}


function submitData(name, image) {
  let formData = {
    name: name,
    image: image,
    likes: 0
  }
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(json => console.log(json))

}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    for (const toyData of json) {
      createToyCard(toyData)
    }
  })

  const formNode = document.querySelector('form.add-toy-form')
  formNode.addEventListener('submit', (e) => {
    const inputs = formNode.querySelectorAll('input')
    const nameInput = inputs[0]
    const imageInput = inputs[1]

    submitData(nameInput.value, imageInput.value)

  })

});
