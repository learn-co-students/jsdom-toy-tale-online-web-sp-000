let addToy = false;
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

  document.addEventListener('DOMContentLoad', fetchToys());

  function fetchToys(){
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(json => createCards(json))
  }

    function createCards(json){
      const toyCollection = document.querySelector('div#toy-collection')

      for(const toy of json ){
        let createDiv = document.createElement('div')
        newDiv.className = "card"
        newName(toy, newDiv)
        newPhoto(toy, newDiv)
        totalLikes(toy, newDiv)
        addButton(toy, newDiv)
        toyCollection.appendChild(newDiv)

      }

    }

    function newName(toy, card){
      let toyName = document.createElement('h2')
      toyName.innerHTML = toy.name 
      card.appendChild(toyName)
    }

    function newPhoto(toy, card){
      let toyPhoto = document.createElement("img")
      toyPhoto.src = toy.image
      toyPhoto.className = "toy-avatar"
      card.appendChild(toyPhoto)
    }

    function totalLikes(toy,card){
      let likes = document.createElement('p')
      likes.innerHTML = `${toy.likes} likes`
      card.appendChild(likes)
    }

    function addButton(toy, card){
      let newButton = document.createElement('button')
      newButton.addEventListener('click', function(){
        increaseLikes(toy)
        window.location.reload(true)
      })
      newButton.className = 'like-btn'
      newButton.style = "width: 30px;height:30px;cursor:pointer;"
      newButton.innerText = "♥"
      card.appendChild(newButton)
    }

    form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', submitData)

    function subbmitData(){
      let formData = {
        "name": document.querySelectorAll('.input-text')[0].value,
        "image": document.querySelectorAll('.input-text')[1].value,
        "likes": "0"
      }

      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }

      fetch("http://localhost:3000/toys", configObj)
      .then(response => response.json())
      .then(json => console.log(json))
    }

    function increaseCount(toy) {

      let configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": parseInt(toy.likes) + 1
            })
      };
    
      fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
    }

  

