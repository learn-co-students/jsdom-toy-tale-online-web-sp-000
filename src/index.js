let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  fetchToys()

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', function() {
    fetchNewToy();
  });
  
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

const toyData = "http://localhost:3000/toys"

function fetchToys() {
  return fetch(toyData)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    fetchedToys = json
    displayToys(fetchedToys)
  });
};

function displayToys(fetchedToys) {
  fetchedToys.forEach(toy => {

    let toyContainer = document.getElementById("toy-collection")
    let toyWrap = document.createElement('div')
    let toyName = document.createElement('h2')
    let toyImage = document.createElement('img')
    let toyLikeCounter = document.createElement('p')
    
    let likeButton = document.createElement('btn')
    
    let setLike = function() {
      console.log(toyLikeCounter)
      sendLike(toyLikeCounter);
    }
    
    likeButton.addEventListener("click", setLike );
    

    
    likeButton.className = 'like-btn';
    likeButton.innerText = 'LIKE!';
    toyLikeCounter.className = 'like-counter';
    toyLikeCounter.innerText = 0
    toyWrap.className = 'toy-card';
    toyImage.src = `${toy.image}`
    toyImage.className = 'toy-avatar';
    toyName.innerHTML = `${toy.name}`
    
    toyWrap.appendChild(toyName)
    toyWrap.appendChild(toyImage)
    toyWrap.appendChild(toyLikeCounter)
    toyWrap.appendChild(likeButton)
    toyContainer.appendChild(toyWrap)
    
  });
};

function sendLike(toyLikeCounter) {
    let number = toyLikeCounter.innerHTML;
  console.log(toyLikeCounter)
    number++;
    toyLikeCounter.innerHTML = number;
};

function fetchNewToy() {
  console.log('fetch toy function reached!')
  let formData = {
    name: document.getElementsByClassName("input-text")["name"].value,
    image: document.getElementsByClassName("input-text")["image"].value
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
}