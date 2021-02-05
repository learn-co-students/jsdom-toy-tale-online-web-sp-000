let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');
  function createToyCard(toy){
    let card = document.createElement('div')
    let name = document.createElement('h2')
    let pic = document.createElement('img')
    let likes = document.createElement('p')
    let likeBtn = document.createElement('button')
    name.textContent = toy.name
    pic.src = toy.image
    likes.textContent = toy.likes + " likes"
    likeBtn.className = "like-btn"
    likeBtn.textContent = "Like"
    card.appendChild(name)
    card.appendChild(pic)
    card.appendChild(likes)
    card.appendChild(likeBtn)
    likeBtn.addEventListener("click",() => {
      let newLikes = parseInt(likes.textContent.split(" ")[0], 10) + 1
        likes.textContent =  newLikes + " likes"
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": newLikes
          })
        })
    })
    return card
  }


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    //console.log(json)
    for (const toy of json){
      console.log(toy.id)
      toyCollection.appendChild(createToyCard(toy))
    }
  })

  document.querySelector('input.submit').addEventListener('click', function(event) {
    event.preventDefault()
      fetch("http://localhost:3000/toys",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: document.querySelectorAll('input')[0].value,
          image: document.querySelectorAll('input')[1].value,
          likes: 0
        })
      })
      .then(function(response){
        return response.json()
      })
      .then(function(json){
        toyCollection.appendChild(createToyCard(json))
      })
   })

});
