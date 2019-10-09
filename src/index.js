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
});


// OR HERE!
fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    response.forEach(function(toy) {
      let card = document.createElement('div')
      card.className = 'card'
      card.id = toy.id
      let h2 = document.createElement('h2');
      h2.innerHTML = toy.name
      let img = document.createElement('img');
      img.className = 'toy-avatar'
      img.src = toy.image
      let p = document.createElement('p');
      p.innerText = `${toy.likes} Likes`
      let btn = document.createElement('button');
      btn.className = 'like-btn'
      btn.innerText = 'Like <3';
      like(btn, p, toy);
      [h2, img, p, btn].forEach(function(element) {
        card.appendChild(element)
      })
      document.querySelector('div#toy-collection').appendChild(card)
    })
    console.log(response);
  });

function like(btn, p, toy) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    toy.likes ++;

    let formData = {
      likes: toy.likes
    };
     
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      p.innerText = `${toy.likes} Likes`;
    });
  });
}

function uploadToy() {
  let formData = {
    name: document.getElementById('toy-name').value,
    image: document.getElementById('toy-img-src').value,
    likes: 0
  };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      console.log(toy)
      let card = document.createElement('div')
      card.className = 'card'
      let h2 = document.createElement('h2');
      h2.innerHTML = toy.name
      let img = document.createElement('img');
      img.className = 'toy-avatar'
      img.src = toy.image
      let p = document.createElement('p');
      p.innerText = `${toy.likes} Likes`
      let btn = document.createElement('button');
      btn.className = 'like-btn'
      btn.innerText = 'Like <3';
      [h2, img, p, btn].forEach(function(element) {
        card.appendChild(element)
      })
      card.id = toy.id
      document.querySelector('div#toy-collection').appendChild(card)
    });
}

function uploadToyAction() {
  document.querySelector('input.submit').addEventListener('click', function(e) {
    e.preventDefault();
    uploadToy();
    document.getElementById('toy-name').value.innerHTML = "";
    document.getElementById('toy-img-src').value.innerHTML = "";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  uploadToyAction();
});