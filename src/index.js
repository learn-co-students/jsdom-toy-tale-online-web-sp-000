const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOY_URL = "http://localhost:3000/toys"
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


document.addEventListener('DOMContentLoaded', function() {
  fetchToys()
})

function fetchToys() {
  fetch(TOY_URL)
    .then( toysData => toysData.json())
    .then( toysArray => renderToys(toysArray))
};

function addToys(toy) {
  const toys_list = document.querySelector("#toy-collection");
  const div = makeToysCard(toy);
  toys_list.appendChild(div);

  let childButton = document.querySelector('#toy-collection').lastElementChild.querySelector('button')
  childButton.addEventListener('click', e => handleLikes(e))
}

function makeToysCard(toy) {
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.className = "toy-avatar"
  img.src = toy.image;

  const h2 = document.createElement("h2");
  h2.textContent = toy.name;

  const p = document.createElement("p");
  p.textContent = `${toy.likes}`;

  const button = document.createElement("button");
  button.innerText = "Like <3"
  button.className = "like-btn";
  button.id = toy.id


  div.appendChild(img,h2,p,button);

  return div;
}

function rendersToys(toysArray) {
  toysArray.map(toy => {
    addToys(toy);
  });
}

function handleLikes(event) {
  event.preventDefault();

  let buttonIdStr = event.target.id
  let buttonIdNum = parseInt(buttonIdStr)
  let likesObj = event.target.parentNode.children[2]
  let likesText = likesObj.innerText
  let likesNum = parseInt(likesText)
  updateLikes(buttonIdNum, likesNum)
}

function updateLikes (buttonIdNum, likesNum) {
  return fetch(`${BASE_URL}/${buttonIdNum}`, {
    method: "PATCH",
    body: JSON.stringify({
      likes: likesNum + 1
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json());
}

toyForm.addEventListener("submit", e => handleSubmission(e));

function handleSubmission(e) {
  e.preventDefault();
  const [nameInputNode, imgInputNode] = e.target;
  const toyObject = {
    name: nameInputNode.value,
    img: imgInputNode.value
  };

  createToy(toyObject).then(addToys);
}

function createToy(toy) {
  return fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(toy),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(toy => toy.json());
}