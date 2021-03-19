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

  const submitBtn = document.querySelector(".submit");
  const toyName = document.querySelectorAll(".input-text")[0];
  const toyImgURL = document.querySelectorAll(".input-text")[1];
  const toyCollection = document.querySelector("#toy-collection");

  function fetchToys() {
    // To pass the tests, don't forget to return your fetch!
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => renderToys(json));
    
  }

  function renderToys(toys) {
    for (toy of toys) {
      div = createToyDiv(toy)
      toyCollection.appendChild(div)
    }
  }

  fetchToys();

  submitBtn.addEventListener("click", function(e) {
    // hide & seek with the form
    e.preventDefault();
    const toyData = {
      name: toyName.value,
      image: toyImgURL.value,
      likes: 0
    };

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    };
    
    fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          div = createToyDiv(object)
          toyCollection.appendChild(div)
          console.log(object)
        })
        .catch(function(error) {
            let p = document.createElement('p');
            p.innerHTML = "Unauthorized Access"
            document.body.appendChild(p);
    });

   
      
  });

  });

function createToyDiv(toyData) {
  let div = document.createElement('div');
  div.className = "card";
  let h2 = document.createElement('h2');
  h2.innerHTML = `${toyData.name}`;
  div.appendChild(h2);
  let img = document.createElement('img'); 
  img.src = `${toyData.image}`;
  img.className = "toy-avatar"
  div.appendChild(img);
  let p = document.createElement('p');
  p.innerHTML = `${toyData.likes}`;
  div.appendChild(p);
  let button = document.createElement('button');
  button.className = "like-btn";
  button.innerHTML = "Like <3";
  button.addEventListener("click", function(e){
    e.preventDefault();
    likeToy(toyData)
  });
  div.appendChild(button);
  return div;
}

function likeToy(toyData) {
  fetch(`http://localhost:3000/toys/${toyData.id}`) 
    .then(resp => resp.json())
    .then(function(json){
      const configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": (json.likes + 1)
        })
      };
    
      fetch(`http://localhost:3000/toys/${toyData.id}`, configObj)
            .then(function(response) {
              return response.json();
            })
            .then(function(object) {
              update(object)
              //console.log(object.likes)
            })
            .catch(function(error) {
                let p = document.createElement('p');
                p.innerHTML = "Unauthorized Access"
                document.body.appendChild(p);
        });
    });

  
}

function update(toy) {
  toyDiv = document.querySelectorAll(".card")[toy.id-1];
  likes = toyDiv.querySelector("p")
  likes.innerHTML = toy.likes
  //console.log(toy)

}