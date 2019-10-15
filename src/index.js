const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

function displayToys(toys) {
  for(toy of toys) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.setAttribute('id', toy.id);

    const nameH2 = document.createElement("h2");
    nameH2.innerText = toy.name;
    toyCard.appendChild(nameH2);

    const avatar = document.createElement("img");
    avatar.src = toy.image;
    avatar.className = "toy-avatar";
    toyCard.appendChild(avatar);

    const numberOfLikes = document.createElement("p");
    numberOfLikes.innerText = `${toy.likes} Likes`;
    toyCard.appendChild(numberOfLikes);

    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.innerText = "Like";
    toyCard.appendChild(likeButton);

    document.querySelector("#toy-collection").appendChild(toyCard);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      displayToys(json);
    })
});

document.querySelector(".submit").addEventListener("click", function(e) {
  e.preventDefault();
  toyName = document.querySelector(".add-toy-form input:nth-of-type(1)").value;
  toyURL = document.querySelector(".add-toy-form input:nth-of-type(2)").value;

  let formData = {
    "name": toyName,
    "image": toyURL,
    "likes": 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj);
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

document.addEventListener("click", function(e) {
  if(e.target.className = "like-btn") {
    const buttonClicked = e.target;
    const cardLiked = buttonClicked.parentElement;
    currentLikes = cardLiked.querySelector("p").innerText.split(" ")[0];
    newLikes = parseInt(currentLikes) + 1;
    cardLiked.querySelector("p").innerText = `${newLikes} Likes`;

    let formData = {
      "likes": newLikes
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(`http://localhost:3000/toys/${cardLiked.id}`, configObj);
  }
})

// OR HERE!
