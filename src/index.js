const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false



fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => addToys(data))
  .then(addLikeListeners);

function addToys(toys) {
  let toyCards = ''

  toys.forEach(toy => {
    toyCards += `
    <div class="card" id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
    `
  });

  document.getElementById('toy-collection').innerHTML = toyCards;
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

document.querySelector('.add-toy-form').addEventListener('submit', createToy)

function createToy(event) {
  event.preventDefault();
  name = document.querySelector('input[name="name"]').value
  image = document.querySelector('input[name="image"]').value

  let newToyObj = {
    name: name,
    image: image,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToyObj)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(data => {
      let toyCardDiv = document.createElement('div')
      toyCardDiv.classList.add('card')
      toyCardDiv.id = `${data.id}`

      let toyCard = `
        <h2>${data.name}</h2>
        <img src="${data.image}" class="toy-avatar" />
        <p>${data.likes} Likes </p>
         <button class="like-btn">Like <3</button>
        `

      toyCardDiv.innerHTML = toyCard;

      document.getElementById('toy-collection').appendChild(toyCardDiv)

      name = '';
      image = '';
      toyForm.style.display = 'none'
    })
    .catch(function (error) {
      alert("Unable to process");
      console.log(error.message);
    });
}

function addLikeListeners() {
  document.querySelectorAll('.like-btn').forEach(function (btn) {
    btn.addEventListener('click', addLike);
  })
}

function addLike(event) {
  const currentLikes = parseInt(event.target.previousElementSibling.textContent.split('')[0], 10)
  let newLikesTotal = currentLikes + 1;
  const toyId = event.target.parentElement.id

  event.target.previousElementSibling.textContent = `${newLikesTotal} Likes`;

  let likesObj = {
    likes: newLikesTotal
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likesObj)
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      alert("Unable to process");
      console.log(error.message);
    });

}
