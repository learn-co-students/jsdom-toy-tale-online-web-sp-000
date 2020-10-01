let addToy = false;
const toys = [];

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

  getToys();

  document.querySelector('form.add-toy-form').addEventListener('submit', function(e){
    createToy(e.target);
    e.preventDefault();
  });

});






function getToys(){

  return fetch("http://localhost:3000/toys")
      .then(function(response) {
          return response.json();
      })
      .then(function(json) {
          renderToys(json)
      })
}



function renderToys(toyCollection){

  for (const toy of toyCollection){

      if (toy.name !== undefined){
        const card = document.createElement('div.card');
        const toyName = document.createElement('h2');

        const toyImage = document.createElement('img');
        toyImage.setAttribute("class", "toy-avatar")

        const toyLikes = document.createElement('p');
        const toyLikeBtn = document.createElement('button');
        toyLikeBtn.setAttribute("class", "like-btn");
        toyLikeBtn.addEventListener('click', function(e){
          increaseLikes(e);
        });

        card.appendChild(toyName);
        card.appendChild(toyImage);
        card.appendChild(toyLikes);
        card.appendChild(toyLikeBtn);
        document.getElementById('toy-collection').appendChild(card);

        toyName.innerText = toy.name
        toyImage.src = toy.image
        toyImage.class = "toy-avatar"
        toyLikes.innerText = toy.likes + " Likes"   
        toyLikeBtn.innerText = "Like <3"
      }
  }

}


function createToy(toyData){
    
  let configToy = {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({name: toyData.name.value, image: toyData.image.value, likes: 0})
  };
  

  return fetch("http://localhost:3000/toys", configToy)
      .then(function(response) {
          return response.json();
      })
      .then(function(json) {
          toys.push(json);
      })
      .catch(function(error) {
          alert("Error! Please retry again.");
          document.body.innerHTML = error.message;
      });
}


function increaseLikes(toyData){

  const newNumber = parseInt(toyData.target.parentElement.querySelector('p').innerText[0]) + 1

  let configToy = {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({likes: newNumber})
  };  

  return fetch(`http://localhost:3000/toys/${toyData.target.id}`, configToy)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        toyData.target.parentElement.querySelector('p').innerText[0] = `${newNumber} + " Likes`
    })
    .catch(function(error) {
        alert("Error! Please retry again.");
        document.body.innerHTML = error.message;
    });
}


