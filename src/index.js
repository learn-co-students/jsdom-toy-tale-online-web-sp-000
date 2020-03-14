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

  document.querySelector(".submit").addEventListener("click", function(event) {
    event.preventDefault();
    let name = document.querySelectorAll(".input-text")[0].value;
    let imgSrc = document.querySelectorAll(".input-text")[1].value;
    submitData(name, imgSrc, 0);
  });

  // document.querySelector("#like-button").addEventListener("click", function(event) {
  //   event.preventDefault();
  //   addLike();
  // });

});



function createToyH2(toyName) {
  let element = document.createElement("h2")
  element.innerText = toyName
  return element
}

function createToyImage(imageSrc) {
  let element = document.createElement("img")
  element.src = imageSrc
  element.class = "toy-avatar"
  return element
}

function createLikeDisplay(likeNumber) {
  let likeContainer = document.createElement("div")
  likeContainer.id = "like-container"
  let labelElement = document.createElement("span")
  labelElement.innerText = `${likeNumber} Likes `
  let likeButton = document.createElement("img")
  likeButton.id = "like-button"
  likeButton.src = "https://cdn.business2community.com/wp-content/uploads/2013/10/Facebook-Liking.jpg"
  likeButton.style.maxWidth = "16px"
  likeButton.style.display = "inline"
  likeContainer.appendChild(labelElement)
  likeContainer.appendChild(likeButton)
  return likeContainer
}

function fetchData(apiUrl) {
  fetch(apiUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for(let step = 1; step < 8; step++) {
      makeSystemCard(json[step])
    };
  })
}

function makeCard(object) {
  document.querySelectorAll(".input-text")[0].value = ""
  document.querySelectorAll(".input-text")[1].value = ""
  let cardElement = document.createElement("div")
  cardElement.className = "card"
  cardElement.append(createToyH2(object["name"]))
  let image = createToyImage(src)
  image.style.maxHeight = "400px";
  image.style.maxWidth = "240px";
  cardElement.append(image)
  cardElement.append(createLikeDisplay(object["likeCount"]))
  document.querySelector("#toy-collection").append(cardElement)
}

function makeSystemCard(object) {
  document.querySelectorAll(".input-text")[0].value = ""
  document.querySelectorAll(".input-text")[1].value = ""
  let cardElement = document.createElement("div")
  cardElement.className = "card"
  cardElement.append(createToyH2(object["name"]))
  let image = createToyImage(src)
  image.style.maxHeight = "400px";
  image.style.maxWidth = "240px";
  cardElement.append(image)
  cardElement.append(createLikeDisplay(object["likeCount"]))
  document.querySelector("#toy-collection").append(cardElement)
}

function submitData(name, src, likeCount){
  let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "name": name,
        "src": src,
        "likeCount": likeCount
    })
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      makeCard(object)
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        document.querySelector("body").append(error.message);
    });
}

function addLike(){
  let configObj = {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "likeCount": likeCount
    })
  }

  fetch("http://localhost:3000/toys/:id", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
      makeCard(object)
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        document.querySelector("body").append(error.message);
    });
}
