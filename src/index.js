let addToy = false;

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
  })
})

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

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => { toys.forEach(toy => {
                    let newEl = document.createElement('div')
                    newEl.setAttribute('class', 'card')
                    let h2 = document.createElement('h2')
                    h2.innerHTML = toy.name
                    let img = document.createElement('img')
                    img.src = toy.image
                    img.setAttribute('class', 'toy-avatar')
                    let like = document.createElement('p')
                    like.innerHTML = `${toy.likes} Likes`
                    let button = document.createElement('button')
                    button.setAttribute('class', 'like-btn')
                    button.setAttribute('id', toy.id)
                    button.innerText = 'Like <3'
                    button.addEventListener('click', (e) => {
                      likes(e)
                    })
                    newEl.append(h2, img, like, button)
                    document.getElementById("toy-collection").append(newEl)
                })
}).catch(function(error) {
  console.log(error.message)
})})

function newToy (toyData) {
  let formData = {
    "name": toyData.name.value,
    "image": toyData.image.value,
    "likes": 0
    };

  let configObj = {
      method: "Post",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
                    let newEl = document.createElement('div')
                    newEl.setAttribute('class', 'card')
                    let h2 = document.createElement('h2')
                    h2.innerHTML = toy.name
                    let img = document.createElement('img')
                    img.src = toy.image
                    img.setAttribute('class', 'toy-avatar')
                    let like = document.createElement('p')
                    like.innerHTML = `${toy.likes} Likes`
                    let button = document.createElement('button')
                    button.setAttribute('class', 'like-btn')
                    button.setAttribute('id', toy.id)
                    button.innerText = 'Like <3'
                    button.addEventListener('click', (e) => {
                      likes(e)
                    })
                    newEl.append(h2, img, like, button)
                    document.getElementById("toy-collection").append(newEl)
  })
  .catch(function(error) {
    document.body.innerHTML = error.message
  });
}
