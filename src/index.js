let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")   
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      json.forEach(element => addToCollection(element));

    })


  fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
      },
  
      body: JSON.stringify({
            "name": "Jessie",
            "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
            "likes": 0
      })
    })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        addToCollection(json) 
      })    







function addToCollection(element){
  let toyCollDiv = document.getElementById("toy-collection")

  let createDiv = document.createElement("div")

  createDiv.id = element.id
  let headerTwo = document.createElement("h2")
  let toyImg = document.createElement("img")
  let likes = document.createElement("p")
  let likeButton = document.createElement("button")
  


      headerTwo.innerHTML = element.name 
      toyImg.src = element.image
      toyImg.className = "toy-avatar"
      likes.innerText = `${element.likes} likes`
      likeButton.className = "like-btn"
      likeButton.innerText = "Like <3"

      createDiv.className = "card"
      createDiv.appendChild(headerTwo)
      createDiv.appendChild(toyImg)
      createDiv.appendChild(likes)
      createDiv.appendChild(likeButton)
    
      toyCollDiv.appendChild(createDiv)


      likeButton.addEventListener('click', function(event){
        let getId = event.target.parentNode.id
        let likeCount = event.target.previousElementSibling.innerText
        let numOnly = likeCount.split(" ")[0]
        numOnly++

        likes.innerText = `${numOnly} likes`
        
    
        fetch(`http://localhost:3000/toys/${getId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }, 

          body: JSON.stringify({
            "likes": numOnly
          })
        })
      })
}})

