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
      makeToyCards(object);
    })
});

function makeToyCards(json) {
  console.log(json);
  let toyCollection = document.getElementById('toy-collection');
  for(const element of json) {
    let toy = document.createElement('div');
    toy.className = "card";

    let name = document.createElement('h2');
    name.innerHTML = element.name;
    toy.appendChild(name);

    let toyImage = document.createElement('img');
    toyImage.className = "toy-avatar";
    toyImage.src = element.image;
    toy.appendChild(toyImage);

    let toyLikes = document.createElement('p');
    toyLikes.innerHTML = `${element.likes} Likes`;
    toy.appendChild(toyLikes);

    let toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.innerHTML = "Like <3";
    toy.appendChild(toyButton);

    toyCollection.appendChild(toy);
  }
}
