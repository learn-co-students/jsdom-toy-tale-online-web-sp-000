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
  });
});


function handleForm() {
  let form = document.querySelector('form.add-toy-form');
  form.addEventListener('submit', e => {
    e.preventDefault()

    const inputs = document.querySelectorAll('input');
    const toy = {
      name: inputs[0].value,
      image: inputs[1].value,
      likes: 0
    }

    const conf = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      method: 'POST',
      body: JSON.stringify(toy)
    }

    return fetch('http://localhost:3000/toys', conf)
        .then(resp => resp.json())
        .then(toy => addAndAppend(toy))
        .catch(e => alert(e))
  })
}

handleForm()

let toyCollection = document.getElementById('toy-collection')

function fetchToys() {
  return fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(e => renderToys(e))
      .catch(e => {
        console.log("An error has occurred while fetching toys.")
      })
}

function renderToys(toys) {
    toys.forEach(toy => { addAndAppend(toy) });
}

function addAndAppend(toy) {
  let div = document.createElement('div')
  div.className = 'card'

  let h2 = document.createElement('h2')
  h2.textContent = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = 'toy-avatar'

  let p = document.createElement('p')
  p.textContent = `${toy.likes} Likes`

  let button = document.createElement('button');
  button.className = 'like-btn'
  button.innerText = 'Like <3'

  div.append(h2, img, p, button)
  toyCollection.appendChild(div)
}

fetchToys()
    .then(handleLikes)

function handleLikes() {

  function conf(likes) {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: 'PATCH',
      body: JSON.stringify({
        "likes": likes
      })
    }
  }

  function registerEvent(id, likeText, currentLikes) {
    console.log(`Registering ${id}...`)
    likeText.textContent = `${currentLikes + 1} Likes`

    fetch(`http://localhost:3000/toys/${id}`, conf(currentLikes + 1))
        .then(resp => resp.json())
        .then(e => console.log(e))
        .catch(e => alert(e))
  }

  let cards = document.querySelectorAll('div.card');
  let btns = document.querySelectorAll('button.like-btn')
  let id = 1;

  console.log('Total Cards: ' + cards.length)
  cards.forEach(c => {
    let likeText = c.getElementsByTagName('p')[0];
    let currentLikes = parseInt(likeText.textContent.split(' ')[0])
    let btn = btns[id]
    btn.addEventListener('click', registerEvent(id, likeText, currentLikes))
    id++;
  })

}