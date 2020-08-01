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

  document.querySelector('.submit').addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.querySelector('input[name="name"]').value;
    const image = document.querySelector('input[name="image"]').value;

    let formData = {
      name: name,
      image: image,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch('http://localhost:3000/toys', configObj)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(json) {
      const div = document.createElement('div');
      div.className = "card";
      const button = document.createElement('button');
      const name = document.createElement('h2');
      const image = document.createElement('IMG');
      const likes = document.createElement('p');
      button.innerHTML = "Like <3";
      button.classList ="like-btn";
      button.addEventListener('click', (e) => {
        likes(e)
      })
      name.innerHTML = json['name'];
      image.src = json['image'];
      image.classList = "toy-avatar";
      likes.innerHTML = json['likes'] + " likes";
      [name, image, likes, button].forEach(item => {
        div.appendChild(item);
      });
      document.getElementById('toy-collection').appendChild(div);
    })
  })

  function addLike(e) {
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
      .then((json => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }

  fetch('http://localhost:3000/toys')
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {
    for (const toy of json) {
      const div = document.createElement('div');
      div.className = "card"
      const button = document.createElement('button');
      const name = document.createElement('h2');
      const image = document.createElement('IMG');
      const likes = document.createElement('p');
      button.innerHTML = "Like <3";
      button.classList ="like-btn"
      button.id = toy['id'];
      button.addEventListener('click', (e) => {
        addLike(e)
      })
      name.innerHTML = toy['name'];
      image.src = toy['image'];
      image.classList = "toy-avatar";
      likes.innerHTML = toy['likes'] + " likes";
      [name, image, likes, button].forEach(item => {
        div.appendChild(item)
      });
      document.getElementById('toy-collection').appendChild(div)
    }
  })

});
