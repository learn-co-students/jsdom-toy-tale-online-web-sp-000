
//loading html and adding listener to add toy button to show or hide form 
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
});

//used in postToy and divCard by adding newToy to toy collection 
let divCollect = document.querySelector('#toy-collection')

//fetching toys from toy object in json 
function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

//grabbing all toys individually 
getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})

//posting toy data 
function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  //adding new_toy data from renderToys to the toy collection 
  .then((obj_toy) => {
    let new_toy = renderToys(obj_toy)
    divCollect.append(new_toy)
  })
}

//Grabbing data from object and creating elements to add to toy collection in a divCard
function renderToys(toy){

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  //toy is being grabbed from getToys using forEach on the toys collection 

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  //name, image, likes, and id are grabbed from the object collection in db.json

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  //adding an event for "liking" on click
  btn.addEventListener('click', (e) => {
    console.log(e.target.database);
    //running likes function that routes data 
    likes(e)
  })

  //creates a div for each toy 

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  //adding all of the above variables to the divCard 
  divCard.append(h2, img, p, btn)
  //adding new data to the collection of toy data 
  divCollect.append(divCard)

}

//increasing likes using PATCH request to update number of likes on click event 
function like(e) {
  e.preventDefault()
  let likeTarget = e.target.previousElementSibling.innerText
  //number of clicks on event
  let more = parseInt(likeTarget) + 1

  fetch ('http://localhost:3000/toys/${e.target.id}', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then (res => res.json())
  .then((like_obj => {
    likeTarget = `${more} likes`;
  }))
}
