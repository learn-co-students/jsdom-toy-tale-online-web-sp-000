let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let allToyCards
  let allLikeButtons

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  let cardCont = document.getElementById("toy-collection");
  
  function displayToyCards(toys) {
    for (let i = 0; i < toys.length; i++) {
      let img = document.createElement("img");
      let toyLikes = document.createElement("p");
      let toyName = document.createElement("h2");
      let likeButton = document.createElement("button");
      let cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardCont.appendChild(cardDiv);
      img.src = toys[i].image;
      img.className = "toy-avatar";
      toyLikes.innerText = `${toys[i].likes} Likes`;
      toyName.innerText = toys[i].name;
      likeButton.innerHTML = "Like <3";
      likeButton.id = toys[i].id;
      cardDiv.appendChild(toyName);
      cardDiv.appendChild(img);
      cardDiv.appendChild(toyLikes);
      cardDiv.appendChild(likeButton);
    }
  }

  let allToys = [];

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(toys) {
      allToys = toys;
      displayToyCards(toys)
      allToyCards = document.querySelectorAll("div#toy-collection div")
      allLikeButtons = document.querySelectorAll("div button")
      addLike(allToyCards, allLikeButtons)
    });
  
  let submitButton = document.getElementsByClassName("submit")[0];
  submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    const newToy = {
      "name": document.getElementsByClassName("input-text").name.value,
      "image": document.getElementsByClassName("input-text").image.value,
      "likes": 0
    }
    allToys.push(newToy);

    let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    };

    fetch("http://localhost:3000/toys", configurationObject)
    .then(function(response){
      return response.json();
    })
    .then(function(toys) {
      cardCont.innerHTML = "";
      displayToyCards(allToys);
      allToyCards = document.querySelectorAll("div#toy-collection div")
      allLikeButtons = document.querySelectorAll("div button")
      addLike(allToyCards, allLikeButtons)
    });
  });

  function addLike(toyCards, likeButtons) {
    for(let i = 0; i < toyCards.length; i++) {
      let toyLikes
      fetch(`http://localhost:3000/toys/${likeButtons[i].id}`)
        .then(function(response) {
          return response.json();
        })
        .then(function(toy) {
          toyLikes = toy.likes
        });
  
      likeButtons[i].addEventListener("click", function(e) {
        const newLike = {
          "likes": toyLikes + 1
        }
  
        let configurationObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "applocation/json"
          },
          body: JSON.stringify(newLike)
        };
  
        fetch(`http://localhost:3000/toys/${likeButtons[i].id}`, configurationObject)
          .then(function(response) {
            return response.json();
          })
          .then(function(toy) {
            let likeCont = toyCards[i].querySelector("p")
            likeCont.innerText = `${toyLikes + 1} Likes`
          })
      })
    }
  }
})