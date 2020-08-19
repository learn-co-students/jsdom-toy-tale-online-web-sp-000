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

function fetchToys () {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let toyCol = document.querySelector("#toy-collection");
      let i = 0;
      while (i < object.length) {
        let el = document.createElement("div");
        el.classList.add("card");
        let h2 = document.createElement("h2");
        let img = document.createElement("img");
        let p = document.createElement("p");
        let button = document.createElement("button");
        button.id = object[i].id;
        h2.innerText = object[i].name;
        img.src = object[i].image;
        img.classList = "toy-avatar"
        p.innerText = `${object[i].likes} likes`;
        p.setAttribute("data-likes", object[i].likes);
        button.classList.add("like-btn");
        let here = toyCol.appendChild(el);
        here.appendChild(h2);
        here.appendChild(img);
        here.appendChild(p);
        here.appendChild(button);
        button.addEventListener("click", (event) => {
          console.log("liked", event.target);
          let numLikes = event.target.previousElementSibling.getAttribute("data-likes");
          numLikes = parseInt(numLikes) + 1
          let formData = {
            "likes": `${numLikes}`
          }

          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          }

          fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            console.log(object.likes);
          });
        });
        i++;
      }
    });
  });
}

function addNewToy () {
  let newToyForm = document.querySelector(".add-toy-form");

  newToyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let newUserToyName = document.querySelector("#userToyName").value;
    let newUserToyImage = document.querySelector("#userToyImage").value;
    
    let formData = {
      formToyName: newUserToyName,
      formToyImage: newUserToyImage,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
      // I know this is repeated code
      let toyCol = document.querySelector("#toy-collection");
      let el = document.createElement("div");
      el.classList.add("card");
      let h2 = document.createElement("h2");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      h2.innerText = object.formToyName;
      img.src = object.formToyImage;
      p.innerText = object.likes;
      button.classList.add("like-btn");
      let here = toyCol.appendChild(el);
      here.appendChild(h2);
      here.appendChild(img);
      here.appendChild(p);
      here.appendChild(button);
      button.addEventListener("click", () => {
        console.log("liked");
      });
    })
    .catch(function(error) {
      alert("error");
      console.log(error.message);
    });
  });
}

let likeButtons = document.getElementsByClassName("like-btn");
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[0].addEventListener("click", () => {
    console.log("liked");
  });
}


fetchToys();
addNewToy();
// increaseToyLikes();