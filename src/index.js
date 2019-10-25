const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyContainer = document.querySelector("div#toy-collection");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  renderToys();

  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    buildToy(e.target);
  });
});

const renderToys = async () => {
  const toys = await getToys();
  displayToys(toys);
};

const getToys = async () => {
  try {
    const resp = await fetch("http://localhost:3000/toys");
    if (resp.status == 200) {
      return resp.json();
    }
  } catch (err) {
    console.log(err);
    alert(err);
  }
  return null;
};

const displayToys = async toys => {
  for (const toy of toys) {
    buildCard(toy);
  }
};

const buildCard = toy => {
  const div = document.createElement("div");
  div.className += " card";

  const header = document.createElement("h2");
  header.textContent = toy.name;

  const image = document.createElement("img");
  image.src = toy.image;
  image.className += " toy-avatar";

  const likes = document.createElement("p");
  likes.textContent = `${toy.likes} Likes`;

  const likeButton = document.createElement("button");
  likeButton.className += " like-btn";
  likeButton.textContent = "Like <3";

  div.append(header, image, likes, likeButton);
  toyContainer.append(div);
};

const buildToy = async toyData => {
  console.log(toyData);
  const response = await fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: toyData.name.value,
      image:
        "https://www.freeiconspng.com/uploads/slinky-png-transparent-1.png",
      likes: 0
    })
  });
  const toy = await response.json();
  buildCard(toy);
};

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
