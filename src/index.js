let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function fetchToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json))
}

function renderToys(json) {
  const collection = document.getElementById("toy-collection")
  json.forEach( toy => {
    const div = document.createElement('div'); 
    div.setAttribute('class', 'card');
    const h2 = document.createElement('div');

    h2.innerHTML = toy[ "name" ];
    div.appendChild(h2);

    const img = document.createElement('img');
    img.setAttribute('class',"toy-avatar")
    img.src = toy["image"]
    div.appendChild(img);

    const p = document.createElement('p');
    p.innerHTML = `${toy["likes"]} likes`
    div.appendChild(p);

    const button = document.createElement('button');
    button.innerHTML = "Like <3";
    button.setAttribute('class', 'like-btn');

    div.appendChild(button);
    collection.appendChild(div)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})

function postToy(toy_data) {

  let formData = {
    name: toy_data.name.value,
    image: toy_data.image.value,
    likes: 0
  };
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
 return fetch ("http://localhost:3000/toys", configObj) 

 .then(function(response) {
  return response.json();
})
.then(function(object) {
  fetchToys();
})

.catch( function ( error ) {
  document.body.innerHTML = error.message
} )
}
