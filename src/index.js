let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToy();
  const toyForm = document.getElementsByClassName('add-toy-form')[0]
  toyForm[2].addEventListener('click', function(event){
    event.preventDefault()
    newToy(toyForm)
  })
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

function newToy(toyForm){fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'},
  body: JSON.stringify({
    name: toyForm.name.value,
    image: toyForm.image.value,
    likes: 0
    }
  )
}).then(response => response.json()).then(toy => makeToyCard(toy))
}

function makeToyCard(toy){
  
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  document.getElementById('toy-collection').appendChild(toyCard)

  const toyName = document.createElement('h2')
  toyName.innerText = toy.name
  toyCard.appendChild(toyName)

  const toyPic = document.createElement('img')
  toyPic.setAttribute('src', toy.image)
  toyPic.setAttribute('class', 'toy-avatar')
  toyCard.appendChild(toyPic)

  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes + ' Likes'
  toyCard.appendChild(toyLikes)

  const toyLikeButton = document.createElement('button')
  toyLikeButton.setAttribute('class','like-btn')
  toyLikeButton.innerText = 'Like <3'
  toyCard.appendChild(toyLikeButton)
  toyLikeButton.addEventListener('click', addLike)
  toyLikeButton.setAttribute('id', toy.id)

}

function addLike(event){
  const like = event.target.previousElementSibling;
  const addOne = parseInt(like.innerText) + 1;
  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'},
    body: JSON.stringify({
        likes: addOne
      })

  }).then(like.innerText = addOne + " Likes")

}

function getToy(){
  return fetch('http://localhost:3000/toys').then(
    function(response){
      return response.json()
    }
  ).then(
    toys => {for(const toy of toys){makeToyCard(toy)}}
  )
}


