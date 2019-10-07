const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false


document.addEventListener("DOMContentLoaded", function() {
  getToys();
  document.getElementsByClassName('add-toy-form')[0].addEventListener("submit", createToy)
});


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => addToys(json))
}

function addToys(json) {
  const collection = document.getElementById('toy-collection');
  for (let i = 0; i < json.length; i++) {
    const div = document.createElement('div');
    div.className = 'card';
    const h2 = document.createElement('h2');
    h2.innerHTML = json[i].name;
    div.appendChild(h2);
    const img = document.createElement('img');
    img.setAttribute('src', json[i].image);
    img.className = 'toy-avatar';
    div.appendChild(img);
    const p = document.createElement('p');
    p.className = "like-data"
    p.setAttribute("data-name", json[i].name + " Likes");
    p.setAttribute("data-id", json[i].id);
    p.innerHTML = json[i].likes + " Likes";
    div.appendChild(p);
    const button = document.createElement('button');
    button.className = "like-btn";
    button.innerHTML = "Like <3"
    button.setAttribute("data-name", json[i].name);
    button.addEventListener("click", increaseLikes)
    div.appendChild(button);
    collection.appendChild(div);
  }
}

function createToy() {
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementsByName("name")[0].value,
      "image": document.getElementsByName("image")[0].value,
      "likes": 0
    })
  };
  fetch("http://localhost:3000/toys", configurationObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addToys(object);
    })
    .catch(function(error) {
      console.log(error)
    })
}

function increaseLikes(event) {
  const button = event.target
  const likes = document.querySelector('[data-name="' + button.dataset.name + ' Likes"]')
  console.log(likes.dataset.id)
  const newLikes = parseInt(likes.innerHTML[0]) + 1
  likes.innerHTML = newLikes + " Likes"

  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  };
  fetch("http://localhost:3000/toys/" + likes.dataset.id, configurationObject)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
    .catch(function(error) {
      console.log(error)
    })

}
