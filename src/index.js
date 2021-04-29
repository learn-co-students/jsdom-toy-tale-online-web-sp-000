let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();

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
  
  let newToyForm = document.getElementById("add-toy-form")
  newToyForm.addEventListener("submit", (event) => { 
    let toyName = document.getElementById("toyname").value 
    let toyImage = document.getElementById("toyimage").value
    submitNewToy(toyName, toyImage);
  })

});




function getToys() { 
  let configObject = { 
    method: "GET",
    headers: { 
        "Content-Type": "application/json",
        Accept: "application/json"
    },
};

return fetch("http://localhost:3000/toys", configObject)
    .then(function(response) { 
        return response.json(); 
    })
    .then(function(object) {
        object.forEach(element => { 
          let div = document.createElement("div");
          div.className = "card";
          let h2 = document.createElement("h2");
          h2.innerText = element.name; 
          let imageElement = document.createElement("img");
          imageElement.src = element.image; 
          imageElement.className = "toy-avatar"
          let p = document.createElement("p");
          p.innerText = element.likes + " likes";
          let button = document.createElement("button");
          button.id = element.id;
          button.className = "like-btn";
          button.innerText = "Like <3";
          button.addEventListener('click', (event) => { 
            increaseLikes(event);
          })
          let collectionDiv = document.getElementById("toy-collection");
          div.appendChild(h2);
          div.appendChild(imageElement);
          div.appendChild(p);
          div.appendChild(button);
          collectionDiv.appendChild(div);
        })
    })
  //make sure form data is submitted and saving where it is supposed to. 
};

// function newToyListener() { 
// let newToyForm = document.getElementsByClassName("add-toy-form")[0]
// newToyForm.addEventListener("submit", (event) => { 
//   let toyName = document.getElementById("toyname").value 
//   let toyImage = document.getElementById("toyimage").value
//   submitNewToy(toyName, toyImage);
// });
// }

function submitNewToy(toyName, toyImage) { 
  let formData = { 
    "name": toyName,
    "image": toyImage,
    "likes": 0
  };
  console.log(formData)
  let configObject = { 
  method: "POST",
  headers: { 
      "Content-Type": "application/json",
      Accept: "application/json"
  },
  body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObject)
  .then(response => response.json())
  .then(object => { 
    console.log(object)
  let div = document.createElement("div");
  div.className = "card";
  let h2 = document.createElement("h2");
  h2.innerText = object.name; 
  let imageElement = document.createElement("img");
  imageElement.src = object.image; 
  imageElement.className = "toy-avatar";
  let button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  button.addEventListener('click', (event) => { 
    increaseLikes(event);
  })
  let collectionDiv = document.getElementById("toy-collection");
  div.appendChild(h2);
  div.appendChild(imageElement);
  div.appendChild(button);
  collectionDiv.appendChild(div);
  })
  .catch(function(error) { 
  document.body.innerHTML = error.message;
  })
}

function increaseLikes(event) {
  console.log(event)

  let configObject = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": (parseInt(event.path[1].childNodes[2].innerText.split(" ")[0]) + 1)
    }) 

  };


fetch(`http://localhost:3000/toys/${parseInt(event.target.id)}`, configObject)
.then(response => response.json())
.then(object => { 
  event.path[1].childNodes[2].innerText = object.likes + " likes"

  })
  .catch(function(error) { 
  document.body.innerHTML = error.message;
  })
}

