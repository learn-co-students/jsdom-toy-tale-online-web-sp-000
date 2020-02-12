let addToy = false;

function addLikes(event) {
  const toyLikes = parseInt(event.target.parentElement.querySelector("p").innerHTML[0])
  const toyLikeArgument = {
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "likes": `${toyLikes + 1}`
    })
  }
  fetch(`http://localhost:3000/toys/${event.target.id}`, toyLikeArgument)
  .then((response) => {
    return response.json()
  }) .then(likesObject => {
    toyLikes.innerText = `${toyLikes + 1} likes`
  })

}


document.addEventListener("DOMContentLoaded", () => {

  let toyCollection = document.getElementById("toy-collection")

  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    for (const key in json) {
      let div = document.createElement('div');
      div.classList.add('card');

      div.innerHTML += `<h2>${json[key].name}</h2>
      <img src= ${json[key].image} class= "toy-avatar"> <p>${json[key].likes}</p>
      <button id="${json[key].id}" class="like-btn" onclick="addLikes(event)">Like <3 </button>`

      toyCollection.appendChild(div)
    }
  })




  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      let createNew = document.getElementsByClassName("submit")["submit"]
      

      createNew.addEventListener("click", function(e){
        e.preventDefault()

        let nameValue = document.getElementsByClassName("input-text")[0].value
        let imageValue = document.getElementsByClassName("input-text")[1].value

        let formData = {
          name: nameValue,
          image: imageValue,
          likes: 0
        }
        let objectData = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "name": `${nameValue}`,
            "image": `${imageValue}`,
            "likes": 0
          })
        }

        fetch("http://localhost:3000/toys", objectData)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          console.log(json["name"]);
          let div = document.createElement('div');
          div.classList.add('card');

          div.innerHTML += `<h2>${json.name}</h2>
          <img src= ${json.image} class= "toy-avatar"> <p>${json.likes}</p>
          <button id="${json.id}" class="like-btn" onclick="addLikes(event)">Like <3 </button>`
          

        })
        .catch(function(error) {
          alert("Bad things! Ragnarők!");
          console.log(error.message);
        });
      

      })
    } else {
      toyForm.style.display = "none";
    }
  });

  
});

