let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  });
  // adds all current Toys

  addAllToys()

  // gets access to form
  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", e => {
    e.preventDefault()
    toyName = e.target.elements[0].value;
    toyUrl = e.target.elements[1].value;
    addToyToDb(toyName, toyUrl);
    e.target.reset()
  });

  // like a toy

})

function addToyCard(toyObject) {
  let card = document.createElement("div");
  card.id = toyObject.id
  card.class = "card";
  card.innerHTML =
    `<h2>${toyObject.name}</h2>
       <img src=${toyObject.image} class="toy-avatar" />
       <p><span>${toyObject.likes}</span> Likes </p>
       <button class="like-btn"> Like <3</button>
    `;
  document.getElementById("toy-collection").appendChild(card);

  // this adds the like button capabilities
  card.lastElementChild.addEventListener("click", (e) =>{
    likeToy(e.target.parentNode.id)
  });
};

function addAllToys() {
  fetch("http://localhost:4000/toys")
    .then(response => {
      return response.json();
    })
    .then(toysJson =>{
      toysJson.forEach(toy => {
        addToyCard(toy)
      });
    });
}

function addToyToDb(toyName, toyUrl) {

  let toy = {
    "name": toyName,
    "image": toyUrl,
    "likes": 0
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  };

  fetch("http://localhost:4000/toys", configObj)
    .then(response => {
      return response.json()
    })
    .then(responseJson => {
      addToyCard(responseJson)
      console.log(responseJson)
    })
    .catch(error => {
      console.log(error);
    });
}

function likeToy(toyId) {

  let currentLikes = document.getElementById(`${toyId}`).querySelector("span")
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": (parseInt(currentLikes.innerHTML) + 1)
    })
  };


  fetch(`http://localhost:4000/toys/${toyId}`, configObj)
    .then(response => {
      return response.json();
    })
    .then(toysJson => {
      let toy = toysJson;
      currentLikes.innerHTML = `${toy.likes}`
    });

}
