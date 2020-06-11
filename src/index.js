let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let collection = document.querySelector("#toy-collection");
  function createToyCard(name, pic, likes) {
    let card = document.createElement("div");
    card.classList.add("card");
    let toyName = document.createElement("h2");
    toyName.innerHTML = `${name}`;
    card.appendChild(toyName);
    let toyPicture = document.createElement("img");
    toyPicture.src = `${pic}`;
    toyPicture.classList.add("toy-avatar");
    card.appendChild(toyPicture);
    let numOfLikes = document.createElement("p");
    numOfLikes.innerHTML = `${likes} likes`;
    card.appendChild(numOfLikes);
    let likeBtn = document.createElement('BUTTON');
    likeBtn.innerHTML = "Like <3";
    likeBtn.classList.add("like-btn");
    card.appendChild(likeBtn);
    collection.appendChild(card);
  }
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http:/localhost:3000/toys')
  .then(response => response.json())
  .then(function(toys) {
 
    for(let i = 0; i < toys.length; i++) {
      createToyCard(toys[i].name, toys[i].image, toys[i].likes);
    }
  })
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let toyName = document.getElementsByName("name")[0];
    let toyPic = document.getElementsByName("image")[0];
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({name: toyName.value, image: toyPic.value, likes: 0})
    };
    fetch('http:/localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(toy) {
      createToyCard(toy.name, toy.image, toy.likes);
    });
  });
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].querySelector(".like-btn").addEventListener("click", function() {
      console.log("button pressed");
      let likes = parseInt(cards[i].getElementsByTagName("p")[0].innerText.split(" ")[0]);
      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: `${likes + 1}`})
      };
      fetch(`http:/localhost:3000/toys/${i + 1}`, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(toy) {
        cards[i].getElementsByTagName("p")[0].innerText = `${likes + 1} likes`;
      });
    });
  }
});
