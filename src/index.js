let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.getElementsByClassName("add-toy-form")[0];
  const toyCollection = document.getElementById("toy-collection");
  
  toyForm.addEventListener("submit", e => {
    e.preventDefault();
    addNewToy(e.target);
  })

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
    // console.log(object);
    getToyData(object);
  });

function getToyData(object) {
  for (const toyData in object) {
    createToyCard(object[toyData]);
  }
}

function createToyCard(data) {
  // console.log(data)
  let div = document.createElement("div");
  div.setAttribute("class", "card");
  let name = data.name;
  let id = data.id;
  let image = data.image;
  let likes = data.likes;
  let h2 = document.createElement("h2");
  h2.innerText = name;
  let img = document.createElement("img");
  img.src = image
  img.setAttribute("class", "toy-avatar");
  let p = document.createElement("p");
  p.innerText = `${likes} likes`
  p.setAttribute("id", `${id}-likes`)
  let button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.textContent = "Like <3"
  button.addEventListener("click", () => {
    addLike(id);
  })
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
  toyCollection.appendChild(div);
}

function addLike(id) {
  const likes_element = document.getElementById(`${id}-likes`)
  let likes = likes_element.innerHTML
  let array = likes.split(" ")
  let i = parseInt(array[0])
  i++
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": i
    })
  })
  likes_element.innerHTML = `${i} likes`
}

function addNewToy(form) {
  let inputs = document.getElementsByClassName("input-text")
  let newName = inputs[0].value
  let newURL = inputs[1].value
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },  
    body: JSON.stringify({
      "name": newName,
      "image": newURL,
      "likes": 0
    })
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(object) {
    createToyCard(object);
  })
  .catch(function(error) {
  })
}

});