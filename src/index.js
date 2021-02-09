let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
//warning: since its wrapped inside this. it can't be accessed from console. ecen if this callback is already run

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


  function fetchToys() {
    //using let because this thing might get changed and replace
    fetch("http://localhost:3000/toys").
    then( function(response) { return response.json() }).
    then( function(object) { 
      for ( const toy of object) {
        displayToy(toy)
      }
        })
  };

  function displayToy(toy) {
    let toyCollectionDiv = document.getElementById("toy-collection");
      const toyCardDiv = document.createElement("div");
      toyCardDiv.className = "card";
      toyCardDiv.id = `toyid-${toy.id}`
      toyCardDiv.innerHTML = `
        <h2>${toy.name}</h2>
        <img src="${toy.image}">
        <p>${toy.likes} Likes </p>
      `;
      let buttonElement = document.createElement("button");
      buttonElement.className = "like-btn";
      buttonElement.innerText = "Like <3";
      toyCardDiv.appendChild(buttonElement);
      toyCollectionDiv.appendChild(toyCardDiv);
      buttonElement.addEventListener("click", function(event) { processLike(event.target)});
    
  }


  fetchToys();


  function addNewToyToDB(name, image) {
    const data = {
        name: name,
        image: image,
        likes: 0
    };

    const configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }; 

    fetch("http://localhost:3000/toys", configObject).
    then( function(response) { return response.json() }).
    then( function(object) { displayToy(object) }).
    catch( function(error) { console.log(error.message) });
     
    
  
  };

  // addNewToyToDB("pearl", "https://drawcentral.com/wp-content/uploads/2015/04/how-to-draw-pearl1.jpg" )

  //when the like button is clicked, it  should find the parent div with class card, and then find the id


  function processLike(button) {
    const parentNode = button.parentNode;
    const nodeID = parentNode.id.split("-")[1]
    const likeCountElement = parentNode.querySelector("p")
    const currentLikes = parseInt(likeCountElement.innerText.split(" ")[0]) + 1;
    likeCountElement.innerText = `${currentLikes} Likes`

    const destURL = `http://localhost:3000/toys/${nodeID}`;
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: currentLikes 
      })
    };  

    fetch(destURL, configObject).
    then( function(response) { return response.json() }).
    then( function(object) { return }).
    catch( function(error) { console.log(error.message) });


  }


});

