let addToy = false;

// fetch toy data
function fetchToys() {
    fetch('http:localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      showToys(json)
    })
  }

// render toys on page
  function showToys(json) {
    console.log(json)
    let toyContainer = document.getElementById('toy-collection')
    json.forEach(toy => {
      let cardDiv = document.createElement('div')
      let h2 = document.createElement('h2')
      let image = document.createElement('img')
      let paragraph = document.createElement('p')
      let button = document.createElement('button')
      let allToys = document.getElementById('toy-collection')

      cardDiv.className = "card"
      image.className = "toy-avatar"
      button.className = "like-btn"
      h2.textContent = toy.name
      image.src = toy.image
      paragraph.textContent = `${toy.likes} Likes`
      paragraph.setAttribute("class", "toy-p-" + toy.id)
      button.textContent = "Like <3"
      button.value = toy.id

      cardDiv.appendChild(h2)
      cardDiv.appendChild(image)
      cardDiv.appendChild(paragraph)
      cardDiv.appendChild(button)
      toyContainer.appendChild(cardDiv)

      button.addEventListener('click', event => {
        event.preventDefault()
        getToy(event.target.value)
        })
    })
  }

// add new toy to database, clear page, re-render toys
  function addNewToy(target) {
    let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {"name": target.name.value,
      "image": target.image.value,
      "likes": 0}
    )
    };
    return fetch('http://localhost:3000/toys', configurationObject)
    .then(function (response) {
      let toyContainer = document.getElementById('toy-collection')
      toyContainer.innerHTML = "";
      fetchToys()
      return response.json();
    })
    .catch(function(error) {
    alert("Error!");
    console.log(error.message);
    });
  }

// get a specific toy object in order to patch data
  function getToy(toyId) {
      fetch('http:localhost:3000/toys/' + `${toyId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(json){
        console.log(json)
        addLike(json)
      })
    }

// patch data to update amount of likes, re-render <p> element to update likes
  function addLike(json) {
    let configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "likes": json.likes + 1
      }
    )
  }
  return fetch(`http://localhost:3000/toys/` + `${json.id}`, configurationObject)
  .then((response) => response.json())
  .then((data) => {
      console.log('Success:', data)
      let likedToy = document.querySelector('.toy-p-' + json.id)
      console.log(likedToy)
      likedToy.innerHTML = `${data.likes} Likes`
    })
  }

// DOM events
document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");

  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        addNewToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });
  })
