let addToy = false;

function likeToy(p, id) {
  let text = p.innerText;
  let likes = 0;
  if (text == "1 Like") {
    p.innerText = "2 Likes";
    likes = 2;
  } else if (text == "0 Likes") {
    p.innerText = "1 Like";
    likes = 1;
  } else {
    text.replace(" Likes", "");
    likes = parseInt(text, 10) + 1;
    p.innerText = `${likes} Likes`;
  };
  updateToy(likes, id);
};

function updateToy(likesNum, id) {
  let formData = {
    likes: likesNum
  };

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(`http://localhost:3000/toys/${id}`, configObj);
};

function loadToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => parseToys(json));
};

function parseToys(toyData) {
  const toyList = document.getElementById("toy-collection");
  for (const toy of toyData) {
    let div = document.createElement('div');
    div.id = toy.id;
    div.className = "card";
    let h2 = document.createElement('h2');
    h2.innerText = toy.name;
    div.appendChild(h2);
    let img = document.createElement('img');
    img.src = toy.image;
    img.className = "toy-avatar";
    div.appendChild(img);
    let p = document.createElement('p');
    if (toy.likes == 1) {
      p.innerText = "1 Like";
    } else {
      p.innerText = `${toy.likes} Likes`;
    };
    div.appendChild(p);
    let button = document.createElement('button');
    button.className = "like-btn";
    button.innerText = "Like <3";
    button.addEventListener("click", () => {
      likeToy(p, toy.id);
    });
    div.appendChild(button);
    toyList.appendChild(div);
  };
};

function makeNewToy(toyName, toyImage) {
  let formData = {
    name: toyName,
    image: toyImage,
    likes: 0
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
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener("submit", () => {
    let toyName = toyFormContainer.querySelector("input[name='name']");
    let toyImage = toyFormContainer.querySelector("input[name='image']");
    makeNewToy(toyName.value, toyImage.value);
  });
  loadToys();
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


