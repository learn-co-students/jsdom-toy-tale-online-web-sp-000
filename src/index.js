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
function fetchToys() {
   fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => showToys(json));


}


function showToys(json) {
  let toyCollection = document.getElementById("toy-collection")
  json.forEach(element => {
    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    let button = document.createElement("button")
    button.className = "like-btn"
    button.id = element.id
    button.innerText = "Like Me!"
    button.addEventListener("click", function(event) {
      addLikes(event)
    })
    let h2 = document.createElement("h2")
    h2.innerHTML = element.name
    let img = document.createElement("img")
    img.src = element.image
    img.alt = element.name
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText = `${element.likes} Likes`

    cardDiv.append(h2, img, button, p)
    toyCollection.appendChild(cardDiv)
  });


}

function addNewToy() {
  toyForm.children[0].addEventListener("submit", function() {
    debugger;
    let values = document.getElementsByClassName("input-text")
    submitToys(values[0].value, values[1].value)
  })
}
function submitToys(name,image, likes = 0) {

  return fetch("http://localhost:3000/toys", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      name, 
      image, 
      likes
    })
  })
  .then(response => response.json())
  // .then(json => console.log("json", json))\

}

  function addLikes(event) {
    let likeToAdd = document.getElementById(event.target.id)
    let int = parseInt(likeToAdd.nextSibling.innerText[0])
    let numToUpdate = int + 1
    console.log("int", int)
    event.preventDefault()
    // debugger;
     fetch(`http://localhost:3000/toys/${int}`, {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      }, 
      body: JSON.stringify({
        "likes": numToUpdate
      })
    })
    .then(response => response.json())
    .then(json =>  {likeToAdd.nextSibling.innerText = `${json.likes} likes`})


  }





document.addEventListener("DOMContentLoaded", function() {
  fetchToys()
  addNewToy()

})