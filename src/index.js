let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const inputForm = document.querySelector('.add-toy-form')
      inputForm.addEventListener("submit", (e) => {
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})


function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(obj => displayToys(obj))
}


function displayToys(allToys) {
  const imgArea = document.getElementById('toy-collection')
  for (let toy of allToys) {
    const card = document.createElement('div')
    card.classList.add('card')
    imgArea.appendChild(card)

    const name = document.createElement('h2')
    name.innerHTML = toy['name']
    card.appendChild(name)

    const image = document.createElement('img')
    image.src = toy['image']
    image.classList.add('toy-avatar')
    card.appendChild(image)

    const likes = document.createElement('p')
    likes.innerHTML = `${toy['likes']} likes` 
    card.appendChild(likes)

    const buton = document.createElement('button')
    buton.classList.add('like-btn')
    buton.innerHTML = "Like"
    buton.style.width="80px"
    card.appendChild(buton)

    const id = document.createElement('p')
    id.innerHTML = toy['id']
    card.appendChild(id)
    id.style.display = "none"

    buton.addEventListener("click", () => {
      const toyId = id.innerText
      console.log(`http://localhost:3000/toys/${toyId}`)
      
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
        })
      })
      likes.innerHTML = `${parseInt(likes.innerText.split(' ')[0]) + 1} likes`  
    })
  }
}


function postToy(toyData) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: 0, 
      id: toyData.id.value
    })
  })
}