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
  });

  loadToys();
  submitToy();
});

function loadToys() {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(createCard); // .then(json => createCard(json))
}

function createCard(json) {
    const toysContainer = document.getElementById('toy-collection');
    for (const toy of json) {
      let newCard = document.createElement('div');
      let h2 = document.createElement('h2');
      let img = document.createElement('img');
      let p = document.createElement('p');
      let btn = document.createElement('btn');
      
      newCard.className = "card";
      toysContainer.appendChild(newCard);
      
      h2.innerHTML = toy.name;
      img.src = toy.image;
      img.className = 'toy-avatar';
      p.innerHTML = `${toy.likes} likes`;
      btn.className = "like-btn"
      btn.innerHTML = "Like <3"
      btn.addEventListener("click", function() {
        toy.likes++
        p.innerHTML = `${toy.likes} likes`;
        updateLikes(toy.id, toy.likes);
      })

      newCard.appendChild(h2);
      newCard.appendChild(img);
      newCard.appendChild(p);
      newCard.appendChild(btn);

    }
}

function submitToy() {
  const toyForm = document.getElementsByClassName("add-toy-form")[0]
  toyForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let newToyInfo = document.getElementsByClassName("input-text");
    let formData = {}
    
    for (el of newToyInfo) {
      formData[el.name] = el.value;
    }
    formData["likes"] = 0;
    e.target.reset();
    
    postToyInfo(formData);
  })
}

function postToyInfo(formData) {
  fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(function(json){
      json = [json]
      createCard(json)
    })
    .catch(function(error) {
      alert("Error!");
      console.log(error.message);
    });
}

function updateLikes(toyId, toyLikes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": `${toyLikes}`
    })
  });
}