let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  fetchAndAddToys();

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
});


function fetchAndAddToys() {
  fetch("http://localhost:3000/toys")
  .then(function(res) {
    return res.json();
  })
  .then(function(json) {
    json.forEach(element => createNewToyDiv(element));
  })
};

function createNewToyDiv(element) {
  console.log(element);
  const toyCollection = document.querySelector("#toy-collection");
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute('id', element.id);
  addToyInfo(div, element);
  toyCollection.appendChild(div);
  // console.log(div);
};

function addToyInfo(div, element) {
  const h2 = document.createElement("h2");
  h2.innerHTML = element.name
  div.appendChild(h2);

  const img = document.createElement("IMG");
  img.classList.add("toy-avatar");
  img.src = element.image;
  div.appendChild(img)

  updateLikes(div, element)

  const likeButton = document.createElement("button");
  likeButton.onclick = function() {incrementLikes(element.likes, element.id)};
  likeButton.classList.add("like-btn");
  likeButton.innerHTML = "Like <3";
  div.appendChild(likeButton);
};

  function updateLikes(div, element) {
    const pTag = document.createElement("p");
    pTag.innerHTML = `${element.likes} Likes`;
    div.appendChild(pTag);
  }


  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(function(res) {
      return res.json();
    })
    .then(function(object) {
      createNewToyDiv(object);
    });

    function incrementLikes(num, id) {
      console.log(num);
      console.log(num + 1);
      const updateObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          numLikes: num,
          id: id
        })
      }

      fetch(`http://localhost:3000/toys/${id}`, updateObj)
      .then(function(res) {
        return res.json();
      })
      .then(function(object) {
        console.log(object);
        // console.log(object.likes);
        let div = document.getElementById(object.id);
        updateLikes(div, object);
        // let likes = document.querySelector("p");
        // console.log(likes);
        //
        // likes.innerHTML = `${object.likes + 1} Likes`
      });

    };



    // headers:
    // {
    //   "Content-Type": "application/json",
    //   Accept: "application/json"
    // }

    // body: JSON.stringify({
    //   "likes": <new number>
    // })
