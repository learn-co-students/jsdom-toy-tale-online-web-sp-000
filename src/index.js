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

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      for(const toy in object) {
        makeToyCard(object[toy]);
      }
    });
 
  function makeToyCard(toy) {
    const toyCollection = document.querySelector("#toy-collection");
    
    let div = document.createElement("div");
    div.classList.add("card");

    let h2 = document.createElement("h2");
    h2.textContent = toy.name;

    let img = document.createElement("img");
    img.classList.add("toy-avatar");
    img.src = toy.image;

    let p = document.createElement("p");
    p.textContent = `${toy.likes} Likes`;
    p.classList.add("likes")

    let likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like";
    likeBtn.addEventListener("click", addLike);

    let id = document.createElement("p");
    id.textContent = toy.id;
    id.classList.add("toy-id");
    id.style.visibility = "hidden";

    toyCollection.appendChild(div);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(likeBtn);
    div.appendChild(id);
  }

  const addToyForm = document.querySelector("form.add-toy-form");
  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();

  let name = document.querySelector("input[name='name']").value;
  let image = document.querySelector("input[name='image']").value;

  let newToyData = {
    name: name,
    image: image,
    likes: 0
   };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyData)
   };

   makeNewToy(configObj)
  })
    
  function makeNewToy(configObj) {
    fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(function(object) {
      console.log(object);
    })
    .catch(function(error){
      console.log(error.message);
    })    
  }   

  function addLike() {
    let id = this.parentElement.querySelector("p.toy-id").textContent;
    let numLikes = parseInt(this.parentElement.querySelector("p.likes").textContent.split(" ")[0]) + 1;
    this.parentElement.querySelector("p.likes").textContent = numLikes + " Likes";

    likeObj = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({likes: numLikes})
    }
    
    fetch(`http://localhost:3000/toys/${id}`, likeObj)
    .then(resp => resp.json())
    .then(obj => console.log(obj))
    .catch(function(error){
      console.log(error.message)
    })
  }

});
