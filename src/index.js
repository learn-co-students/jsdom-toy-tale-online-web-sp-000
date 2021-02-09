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
  // My code starts here

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

    let likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");
    likeBtn.textContent = "Like";
    // button.addEventListener("click", addLike)

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(likeBtn);
  }

  // Add a New Toy

  

});
