
function createCard(name,imageURL,likes, id)
{
  const div = document.createElement("div");
  div.setAttribute("class", "card");
  div.innerHTML = `
    <h1>${name}</h1>
    <img src=${imageURL} class="toy-avatar" />
    <p data-id="${id}" data-likes="${likes}">${likes} Likes </p>
    <button class="like-btn" onClick="addLike(this)">Like <3</button>            
  `;
  toyCollection.appendChild(div);
}


function getToys() 
{   
    let configObj = {
      method: "GET",          
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    };
     
    return fetch("http://localhost:3000/toys", configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {  
        object.forEach(toy => {  
          createCard(toy.name,toy.image,toy.likes, toy.id);
        })        
      })
      .catch(function(error) {
        alert("Bad things! Ragnarők!");                 
        console.log(error.message);
      });
}

function addNewToy(name,imageURL) 
{ 
  // conditionally add toy to page
  createCard(name,imageURL,"0","0");

  // submit to server
  let configObj = {
    method: "POST",          
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": imageURL,
      "likes": 0
    })
  };
  
  return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {         
      console.log(object);
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");                 
      console.log(error.message);
    });  
}

function addLike(caller)
{
  // conditionally add likes to page  
  const parentDiv = caller.parentNode;
  const p = parentDiv.children[2];
  const updatedLikes = parseInt(p.getAttribute("data-likes")) + 1;
  const id = p.getAttribute("data-id");
  p.innerHTML = `${updatedLikes} Likes`;

  // submit to server
  let configObj = {
    method: "PATCH",          
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updatedLikes
    })
  };
  
  return fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {         
      console.log(object);
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");                 
      console.log(error.message);
    });   
}

let addToy = false;
const toyCollection = document.getElementById('toy-collection');

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

    document.getElementById("submit-btn").addEventListener("click", function(event){
      const inputData = document.getElementsByClassName("input-text");
      addNewToy(inputData[0].value,inputData[1].value);
      event.preventDefault()
    });    
  });

  getToys();
});
