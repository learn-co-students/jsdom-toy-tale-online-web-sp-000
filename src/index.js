let addToy = false;

getToys();

document.addEventListener("DOMContentLoaded", () => {
  let addBtn = document.querySelector("#new-toy-btn");
  let toyFormContainer = document.querySelector(".container");
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

function getToys() {
  fetch('http://localhost:3000/toys')
  .then (resp => resp.json())
  .then (json => renderToys(json))
}

function renderToys(json) {
  for (const toy of json) {
    let toyCard = document.createElement('div')
    toyCard.className = "card";

    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    toyCard.appendChild(h2)

    let img = document.createElement('img')
    img.src = toy.image
    img.className = "toy-avatar"
    toyCard.appendChild(img)

    let p = document.createElement('p')
    p.innerHTML = toy.likes
    toyCard.appendChild(p)

    let button = document.createElement('button')
    button.className = "like-btn"
    button.innerHTML = "Like <3"
    toyCard.appendChild(button)

    document.querySelector('#toy-collection').appendChild(toyCard)
  }
}

document.addEventListener('submit', function(e) {
  event.preventDefault();

  const name = document.querySelector('input[name="name"]').value;
  const image = document.querySelector('input[name="image"]').value;
  
    let formData = {
      "name": name,
      "image": image,
      "likes": 0
    };
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(formData)
    };
  
    
    fetch('http://localhost:3000/toys', configObj)
      .then(resp => resp.json())
      .then(json => renderPostFetch(json));

      returnfunction renderPostFetch(json) {
        let toyCard = document.createElement('div')
        toyCard.className = "card";
      
        let h2 = document.createElement('h2')
        h2.innerHTML = json.name
        toyCard.appendChild(h2)
      
        let img = document.createElement('img')
        img.src = json.image
        img.className = "toy-avatar"
        toyCard.appendChild(img)
      
        let p = document.createElement('p')
        p.innerHTML = json.likes
        toyCard.appendChild(p)
      
        let button = document.createElement('button')
        button.className = "like-btn"
        button.innerHTML = "Like <3"
        toyCard.appendChild(button)
      }
});
