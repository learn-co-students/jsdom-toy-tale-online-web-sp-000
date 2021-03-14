let addToy = false;
toyDiv = document.getElementById("toy-collection") 

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
    .then(resp => resp.json())
    .then(json => renderToys(json))
});

function renderToys(toys) {
  // iterate over toys from fetch()
  for (const toy in toys) {
    addToyInfo(toys[toy]) 
  }
}

function addToyInfo(toy) {
  // creates elements needed for each toy
  div = document.createElement("div")
  h2 = document.createElement("h2")
  img = document.createElement("img")
  p = document.createElement("p")
  btn = document.createElement("button")
  
  // assign toy info to each element
  div.class = "card"
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.id = "toy"
  p.innerText = `${toy.likes} likes`
  btn.innerText = "Like"
  btn.className = "like-btn"

  // add event listener to each button to listen for clicks & add likes to object
  /*btn.addEventListener("click", function(e) {
    fetch("http://localhost:3000/toys/:id", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": 
      }) 
    })
  }*/
  
  // attach each elemnt to div, then add div to toy-collection
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)
  toyDiv.appendChild(div)
}

function addNewToy(toyName, imageLink, likes) {
  console.log(addNewToy)
  // assigns key/values from form
  let formData = { 
    name: toyName, 
    image: imageLink,
    likes: likes }
  
  // handles post request from form
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.strigify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      console.log("function response")
      return response.json();
    })
    .then(function(object) {
      console.log(object)
      addToyInfo(object)
    })
    .catch(function(error){
      alert("Unable to save toy.")
      console.log(error.message)
    })
}


