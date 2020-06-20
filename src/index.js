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
    const toyForm = document.querySelector(".add-toy-form")
      toyForm.addEventListener("submit", (e) => {
     
        e.preventDefault()
        submitData(e.target[0].value, e.target[1].value)
      })
  });

 


 

    function createToyCard(toy){
    
      toyCollection = document.getElementById("toy-collection")
      toyCard = document.createElement("div")
      toyCard.className = "card"
      // name
      toyName = document.createElement("h2")
      toyNameText = document.createTextNode(toy.name)
      toyName.appendChild(toyNameText)
      //img
      toyImage = document.createElement("img")
      toyImage.src = toy.image
      //likes
      toyLikes = document.createElement("p")
      toyLikesText = document.createTextNode(`${toy.likes} likes`)
      toyLikes.appendChild(toyLikesText)
      //likeButton
      toyButton = document.createElement("button")
      toyButton.className = "like-btn"
      toyButton.innerText = "Like"
      toyButton.addEventListener( "click", (e) => {
        e.preventDefault()
        submitLike(e.target.previousElementSibling.innerText, toy.id)
    
      })
      //appendings
      toyCard.appendChild(toyName)
      toyCard.appendChild(toyImage)
      toyCard.appendChild(toyLikes)
      toyCard.appendChild(toyButton)
      toyCollection.appendChild(toyCard)
    }

  function submitData(toyName, toyImage, toyLikes = 0){
    let toyObj = {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: toyLikes
      })
    }

    fetch("http://localhost:3000/toys", toyObj)
    .then(resp => resp.json())
    .then(obj => createToyCard(obj))
  }

  function submitLike(toyLikes,toyId){
  console.log(toyLikes)
    let newLikes = parseInt(toyLikes[0]) + 1
    console.log(newLikes)
    let likeObj = {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    }

    fetch(`http://localhost:3000/toys/${toyId}`, likeObj)
    .then(resp => resp.json())
    .then(obj => console.log(obj)) //Need to update view
  }
})
