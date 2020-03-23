let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', submitToy);
  fetchToys()
});

function increaseLikes(event) {
  event.preventDefault()
  console.log(event)
  let numberOfLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  
  let url = `http://localhost:3000/toys/:id`
  
  let bodyData = {
    likes: numberOfLikes
  }

  let obj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(bodyData)
  }

  fetch(url, obj)
  .then(response => response.json())
  .then(function() {
    event.target.previousElementSibling.innerText = `${numberOfLikes} likes`;
  })
  .catch(function(error) {
    console.log(error.message)
  })
}


function submitToy(event) {
  event.preventDefault();

  let inputs = document.querySelectorAll('.input-text');
  let name = inputs[0].value;
  let imageUrl = inputs[1].value;
  let url = 'http://localhost:3000/toys'
  
  let bodyData = {
    name: name,
    image: imageUrl,
    likes: 0,

  }
  let obj = {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify(bodyData)
  }

  fetch(url, obj)
  .then(response => response.json())
  .then(function(object) {
    let div = document.getElementById('toy-collection')
    let divCard = document.createElement('div')
      divCard.className = 'card'
      div.appendChild(divCard)

      let h2 = document.createElement('h2')
      h2.innerHTML = object.name
      divCard.appendChild(h2)
      let img = document.createElement('img')
      img.src = object.image
      img.className = 'toy-avatar'
      divCard.appendChild(img)
      let p = document.createElement('p')
      p.innerHTML = `${object.likes} likes`
      divCard.appendChild(p)
      let btn = document.createElement('button')
      btn.innerHTML = 'Like'
      btn.className = 'like-btn'
      btn.addEventListener('click', increaseLikes)
      divCard.appendChild(btn)
      console.log(object)
  })
  .catch(error => console.log(error.message))
}

function fetchToys() {
  let url = 'http://localhost:3000/toys'
  let obj = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    } 
  }
  fetch(url, obj)
  .then(response => response.json())
  .then(function(object) {
    let div = document.getElementById('toy-collection')
    for (const toy of object) {
      let divCard = document.createElement('div')
      divCard.className = 'card'
      div.appendChild(divCard)

      let h2 = document.createElement('h2')
      h2.innerHTML = toy.name
      divCard.appendChild(h2)
      let img = document.createElement('img')
      img.src = toy.image
      img.className = 'toy-avatar'
      divCard.appendChild(img)
      let p = document.createElement('p')
      p.innerHTML = `${toy.likes} likes`
      divCard.appendChild(p)
      let btn = document.createElement('button')
      btn.innerHTML = 'Like'
      btn.className = 'like-btn'
      btn.addEventListener('click', increaseLikes)
      divCard.appendChild(btn)
    }
  })
  .catch(function(error) {
    console.log(error.message)
  })
};
