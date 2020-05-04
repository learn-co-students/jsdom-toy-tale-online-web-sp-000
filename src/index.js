let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const newToyForm = document.querySelector(".add-toy-form");
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  newToyForm.addEventListener("submit", handlePost); 
  getToyObjects();
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

function handlePost(event) {
  let formData = createNewToyObjectFromForm(event);
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
 
  fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addDivsToToyCollectionDiv([object]);
    });

};

function createNewToyObjectFromForm(event) { 
  event.preventDefault();

  form = document.querySelector(".add-toy-form");
  let inputElements = form.getElementsByClassName("input-text");
  let inputValues = {};
  for (const inputElement of inputElements) {
    inputValues[inputElement.name] = inputElement.value;
  }
  inputValues.likes = 0;
  return inputValues;
};

function getToyObjects() {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    addDivsToToyCollectionDiv(object);
  });
};

function addDivsToToyCollectionDiv(toyCollectionArrayOfObjects) {
  for (const toy of toyCollectionArrayOfObjects) {
    // toy: {id: 1, name: "Woody", image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png", likes: 5}
    let cardParentDiv = document.getElementById('toy-collection');

    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'card');
    cardDiv.setAttribute('id', `toy-${toy.id}`);
    cardParentDiv.appendChild(cardDiv);
    
    let h2 = document.createElement('h2');
    h2.innerHTML = toy['name'];
    cardDiv.appendChild(h2);

    let img = document.createElement('img');
    img.setAttribute('class', 'toy-avatar');
    img.src = toy['image'];
    cardDiv.appendChild(img);

    let p = document.createElement('p');
    p.innerHTML = `${toy['likes']} Likes`;
    cardDiv.appendChild(p);

    let button = document.createElement('button');
    button.setAttribute('class', 'like-btn');
    button.innerHTML = "Like";
    let newLikeDiv = cardDiv.appendChild(button);
    newLikeDiv.addEventListener('click', handleLikeClick);
  }
};

function handleLikeClick() {
  let numLikes = increaseLikeOnPage(event);
  let toyId = parseInt(event.target.parentElement.id.split('-')[1]);
  let url = `http://localhost:3000/toys/${toyId}`;
  let formData = {"likes": `${numLikes}`};

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(url, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  });

}

function increaseLikeOnPage(event) {
  let pElement = event.target.parentElement.getElementsByTagName('p')[0]
  let pElementText = pElement.innerHTML; // "8 Likes"
  let numOfLikes = pElementText.split(" ")[0];
  let newNumLikes = parseInt(numOfLikes) + 1;
  pElement.innerHTML = `${newNumLikes} Likes`;
  return newNumLikes;
}
