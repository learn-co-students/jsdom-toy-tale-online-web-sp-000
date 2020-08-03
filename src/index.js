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
  fetchGetToys()
  fetchPostToys(name, image, likes)

  function fetchGetToys() {
    fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    }).then(function(response) {
      console.log(response);
      let toyCards = response
      let toyCollection = document.getElementById('toy-collection');
      for (const toyCard of toyCards) {
        let div = document.createElement('div')
        div.setAttribute('class', 'card');
        toyCollection.appendChild(div)
        let h2 = document.createElement('h2')
        let imgSrc = document.createElement('img')
        imgSrc.setAttribute('class', 'toy-avatar')
        let p = document.createElement('p')
        let button = document.createElement('button')
        button.setAttribute('class', 'like-btn')
        h2.innerText = toyCard.name
        div.appendChild(h2)
        imgSrc.src = toyCard.image
        div.appendChild(imgSrc)
        p.innerText = toyCard.likes
        div.appendChild(p)
        div.appendChild(button)
      }
    })
  }
  function fetchPostToys(name, image, likes) {
    let formData = {
      name: `${name}`,
      image: `${image}`,
      likes: `${likes}`
    };
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    };
    
    fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object)
    })
    .catch(function(error) {
      alert("Cannot create toys!");
      console.log(error.message);
    });
  };
});


