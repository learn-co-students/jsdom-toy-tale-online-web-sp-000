let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";

      const addToyForm = document.getElementsByClassName('add-toy-form')[0]

// listen for a form submit
// take the input values and submit to submitData function
      addToyForm.addEventListener("submit", function(event) {
        const inputs = document.getElementsByClassName('input-text')
        submitData(inputs[0].value, inputs[1].value);
        event.preventDefault();
        event.target.reset();
      });

// submitData function creates an object with name, image, and creates a formData variable that is an object with the specific attributes
      function submitData(name, image) {
        let formData = {
            name: name,
            image: image,
            likes: 0
          };

// obj submits formData object to db.json
        let configObj = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };

// fetch request submits a post to toys index
// and then add the new toy object to the page via addNewToy function
        fetch('http://localhost:3000/toys', configObj)
          .then(function(resp) {
            return resp.json();
          })
          .then(function(obj) {
            addNewToy(obj[id], obj["name"],obj["image"], obj["likes"]);
          })
      }
    } else {
      toyForm.style.display = "none";
    }
  });

// function to create a toy object with name, image, and likes
// and added to the DOM in div card in the toy-collection div
  const nodeToyCollectionDiv = document.getElementById('toy-collection')

  function addNewToy(id, name, image, likes) {
    let divCard = document.createElement('div');
    divCard.class = 'card';

    divCard.innerHTML = `
      <h2> ${name} </h2>
      <img src="${image}" class="toy-avatar">
      <p>${likes} Likes </p>
      <button class="like-btn" id='${id}'>Like \<3</button>
      `
    nodeToyCollectionDiv.appendChild(divCard);
  }

// fetch GET request to toys to pull in each toy object
// and iterates over json to pull in each toy object
// and uses addNewToy function to add toy to DOM
  function renderToys() {
    fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
      })
    .then(function(json) {
      for (element of json) {
        addNewToy(element["id"], element["name"],element["image"],element["likes"]);
        }
      })
    }

    renderToys();

// conditional increase to the toy's like count without reloading the page
  function displayCurrentLikes(id) {
    fetch(`http://localhost:3000/toys/${id}`)
      .then(function(resp) {
        return resp.json();
      })
      .then(function(obj) {
        let formData = {
          likes: obj["likes"] += 1
        }
        updateObjectLikes(id, formData)
        nodeToyCollectionDiv.innerHTML = ""
        renderToys()
      })
    }

  function updateObjectLikes(objId, formData) {

    console.log(formData)

    let configObj = {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(`http://localhost:3000/toys/${objId}`, configObj)
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains('like-btn')) {
      let objId = event["srcElement"].id
      displayCurrentLikes(objId);
      }
  })

});
