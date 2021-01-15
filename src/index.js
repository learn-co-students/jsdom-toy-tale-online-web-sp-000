let addToy = false;
const toyForm = document.querySelector('.add-toy-form')
let toyCollection = document.querySelector('#toy-collection');
const addBtn = document.querySelector('#new-toy-btn');
document.addEventListener('DOMContentLoaded', function () {
  getToys();
});
function getToys() {
  let toys = "http://localhost:3000/toys"
  fetch(toys)
  .then(resp => resp.json())
  .then(json => addToys(json))

}
function addToys(json) {


  json.forEach(toy => {
      let newToy = document.createElement('div');
      let toyName = document.createElement('h2');
      newToy.classList.add('card');
      let img = document.createElement('img');
      img.classList.add('toy-avatar');
      let p = document.createElement('p')
      let btn = document.createElement('button');
      btn.classList.add('like-btn');
      btn.innerText = "like";
      btn.addEventListener('click', (e) => {
        console.log(e.target.dataset);
        likes(e)
      })

      newToy == toy;
      toyName.innerHTML = toy.name;
      img.src = toy.image;
      p.innerText = `${toy.likes} likes`;
      btn.id = toy.id;

      newToy.appendChild(toyName);
      newToy.appendChild(img);
      newToy.appendChild(p);
      newToy.appendChild(btn);

      toyCollection.appendChild(newToy);
  });
}
function postToy( name, image ) {
  return fetch( 'http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {

        name,
        image,
        likes : 0
      } )
    } )
    .then(res => res.json()) //json() -> returns json info into javascript object
    .then((data) => renderNewToy(data))
}

function renderNewToy(arg){
  let newToy = document.createElement('div');
  let toyName = document.createElement('h2');
  newToy.classList.add('card');
  let img = document.createElement('img');
  img.classList.add('toy-avatar');
  let p = document.createElement('p')
  let btn = document.createElement('button');
  btn.classList.add('like-btn');
  btn.innerText = "like";
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  newToy == arg;
  toyName.innerHTML = arg.name;
  img.src = arg.image;
  p.innerText = `${arg.likes} likes`;
  btn.id = arg.id;

  newToy.appendChild(toyName);
  newToy.appendChild(img);
  newToy.appendChild(p);
  newToy.appendChild(btn);

  toyCollection.appendChild(newToy);
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
document.addEventListener("DOMContentLoaded", () => {

  addBtn.addEventListener('click', () => {

      toyForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let nameInput = event.target.elements[0].value;
        let imageInput = event.target.elements[1].value;
        postToy( nameInput, imageInput );
      })
  })
});
  
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