let addToy = false;
const URL = 'http://localhost:3000/toys';
const addBtn = document.querySelector('#new-toy-btn');
const toyCollection = document.querySelector('#toy-collection')
const likeBtn = document.querySelector('#like-btn')
  


  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
        const toyToAdd = document.querySelector('.add-toy-form')
        toyToAdd.addEventListener('submit', function(e) {
          e.preventDefault()

          const toyName = document.querySelector('#toy-name')
          const toyImage = document.querySelector('#toy-image')

          fetch(URL, { method: "POST",
              headers: 
              {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
              body: JSON.stringify({
                "name": toyName.value,
                "image": toyImage.value,
                "likes": 0
              })
          })
          .then(resp => resp.json())
          .then(newToy => {
                toyCollection.innerHTML += `<div class="card">
                <h2>${newToy.name} </h2>
                <img src="${newToy.image}"  class="toy-avatar" />
                <p>${newToy.likes}  Likes </p>
                <button id="${newToy.id}" class="like-btn">Like <3</button>
              </div>`                                      
          })
        })

    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
 fetch(URL, {method: "GET"
})
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(function(toy) {
        toyCollection.innerHTML += `<div class="card">
              <h2>${toy.name} </h2>
              <img src="${toy.image}"  class="toy-avatar" />
              <p>${toy.likes}  Likes </p>
              <button id="${toy.id}" class="like-btn">Like <3</button>
            </div>`
      })
    })

  toyCollection.addEventListener("click", function(e) {
    // console.log(e.target);
    let clickedToyId = e.target.id
    let pTag = e.target.previousElementSibling
    let likeNum = parseInt(pTag.innerText)
    

    fetch(`http://localhost:3000/toys/${clickedToyId}`, { method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {
        "likes": ++likeNum
        }
      )
    })
    .then(pTag.innerText = `${likeNum} Likes`)
})