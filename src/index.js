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
  });//end of click button to add new toy event listener

  retrieveToys()
  parseToys(toys)
  createToyCard(name, image, likes)
}); //end of domcontentloadedeventlistner



  const toyCollection = document.querySelector("#toy-collection")

  //create a functiont o create a toy info card
  function createToyCard(name, image, likes, id) {
    let card = document.createElement("div");
    let h2 = document.createElement("H2");
    let img = document.createElement("IMG")
    let p = document.createElement("p")
    let button = document.createElement("button")
    card.className = "card"
    img.className = "toy-avatar"
    img.src = image
    h2.textContent = name //assign h2 value of name
    p.className = "likes"
    p.textContent = likes
    button.className = "like-btn"
    card.appendChild(h2) //assing h2 to card div
    card.appendChild(img) //add img to card div
    card.appendChild(p) //add likes to card div
    card.appendChild(button)//add like button to card div

    toyCollection.appendChild(card)//adds new div to toycollection div
//make sure that only adding evetn listener for each click
    button.addEventListener("click", event => {
      addLike(id)
      })
  }//end of createToyCard function

  function retrieveToys() {//fetch toys
    fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //console.log(json)
      toys = json
      parseToys(toys)
    })
  }

  function parseToys(toys) {
    const allToys = toys
      for (const toy of allToys) {
      //  console.log(toy)
        let name = toy.name;
        let likes = toy.likes;
        let image = toy.image;
        let id = toy.id;
        createToyCard(name, image, likes, id)
      }
  }

  function submitNewToy(name, image, likes=0) {
    return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "image": image,
        "likes" : 0
      })
    })
    .then(function(response) {
      return response.json();
    })
      .then(function(object) {
        createToyCard(name, image, likes)
      })
    }
  //add event listener to create a new toy button to call submitNewToy(name, imageUrl)
  document.querySelector(".submit").addEventListener("click", function (event) {
    let name = document.querySelector("input[name='name']").value
    let image = document.querySelector("input[name='image']").value
    event.preventDefault()
    submitNewToy(name, image, likes=0)
  })


function addLike(id) {
  //figure out
  console.log(event)
  currentLikes = event.target.previousSibling.innerHTML
  newLikeCount = parseInt(currentLikes) + 1;
  event.target.previousSibling.textContent = newLikeCount
  let likes = parseInt(newLikeCount)
  updateLikeCount(likes, id);
}
  //update like coutn by click to patch request to server
function updateLikeCount(likes, id) {
   fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(json)
{
  //console.log(json)
})
}
