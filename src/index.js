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

  loadToys();

  const addToyForm = document.querySelector("form.add-toy-form");

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToyName = addToyForm.querySelector("input[name='name']");
    const newToyImageUrl = addToyForm.querySelector("input[name='image']");

    submitNewToy(newToyName.value, newToyImageUrl.value);

    resetFormInput(newToyName);
    resetFormInput(newToyImageUrl);
  });
});

function loadToys() {
  const allToysUrl = "http://localhost:3000/toys";
  fetch(allToysUrl)
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => createToyCard(toy));
    });
}

function createToyCard(toy) {
  const toysContainer = document.getElementById("toy-collection");

  const newToyCard = document.createElement("div");
  newToyCard.className = "card";
  newToyCard.dataset.toyId = toy.id;

  const toyName = document.createElement("h2");
  toyName.innerText = toy.name;

  const toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.src = toy.image;

  const toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} Likes`;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "Like";
  likeButton.addEventListener("click", function (e) {
    const parentElement = e.target.parentElement;
    submitLikeIncrease(parentElement);
  });

  newToyCard.appendChild(toyName);
  newToyCard.appendChild(toyImage);
  newToyCard.appendChild(toyLikes);
  newToyCard.appendChild(likeButton);

  toysContainer.appendChild(newToyCard);
}

function updateToyCardLikes(toy) {
  const toyCard = document.querySelector(`div[data-toy-id="${toy.id}"]`);
  toyCard.querySelector("p").innerText = `${toy.likes} Likes`;
}

function submitNewToy(name, imageUrl) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: imageUrl,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((responseObject) => createToyCard(responseObject))
    .catch((error) => console.log(error.message));
}

function submitLikeIncrease(element) {
  const currentLikes = parseInt(
    element.querySelector("p").innerText.split(" ")[0]
  );

  fetch(`http://localhost:3000/toys/${element.dataset.toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: currentLikes + 1,
    }),
  })
    .then((response) => response.json())
    .then((responseObject) => updateToyCardLikes(responseObject));
}

function resetFormInput(element) {
  element.value = "";
}
