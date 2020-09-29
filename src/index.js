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

});


function addToys(name, image, likes){
  
  let configObj = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify({name, image, likes})
  };


  return fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
          return response.json();
      })
      .then(function(object) {
          const card = document.createElement('div.card');
          const toyName = document.createElement('h2');
          const toyImage = document.createElement('img');
          const toyLikes = document.createElement('p');
          const toyLikeBtn = document.createElement('button')

          card.appendChild(toyName);
          card.appendChild(toyImage);
          card.appendChild(toyLikes);
          card.appendChild(toyLikeBtn);

          document.getElementsByName('toyName') = object.name
          document.getElementsByName('toyImage') = object.image
          document.getElementsByName('toyLikes') = object.likes

      })
      .catch(function(error) {
          alert("Error! Please retry again.");
          document.body.innerHTML = error.message;
      });
  }

