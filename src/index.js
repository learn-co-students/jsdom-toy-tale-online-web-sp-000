let addToy = false;
let toyCollection = document.getElementById("toy-collection");
const form = document.querySelector(".add-toy-form");
const inputs = document.querySelectorAll(".input-text");

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
  newToy();
});

function getToys() {
  fetch("http://localhost:3000/toys").then(resp => resp.json()).then(function(json) {
    for (let i = 0; i < json.length; i++) {
      let div = document.createElement("div");
      div.classList.add("card")
      toyCollection.appendChild(div);
      div.innerHTML = `<h2>${json[i]["name"]}</h2>
      <img src=${json[i]["image"]} class='toy-avatar' />
      <p>${json[i]["likes"]} Likes</p>
      <button class='like-btn'>Like <3</button>`;
    }
  }).then(likeToy);
}

function newToy() {
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": inputs[0].value,
        "image": inputs[1].value,
        "likes": 0
      })
    };

    fetch("http://localhost:3000/toys", configurationObject).then(resp => resp.json()).then(function(json) {
      let div = document.createElement("div");
      div.classList.add("card")
      toyCollection.appendChild(div);
      div.innerHTML = `<h2>${json["name"]}</h2>
      <img src=${json["image"]} class='toy-avatar' />
      <p>${json["likes"]} Likes</p>
      <button class='like-btn'>Like <3</button>`;
    })
  })
}

function likeToy() {
  const buttons = document.getElementsByClassName("like-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      let text = buttons[i].previousElementSibling
      let textArray = text.innerText.split(" ");
      let numLikes = parseInt(textArray[0], 10);

      let configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": `${numLikes + 1}`
        })
      }
      
      fetch(`http://localhost:3000/toys/${i + 1}`, configurationObject);
      text.innerText = `${numLikes + 1} Likes`;
    });
  };
}


