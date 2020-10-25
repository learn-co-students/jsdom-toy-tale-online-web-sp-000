let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')

  const addToyForm = document.getElementById('add-toy-form');
  addToyForm.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(e.target)
    newToy(e.target)
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const fetchUrl = 'http://localhost:3000/toys'
  fetch(fetchUrl)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
      // console.log(json)
      toyCard(json)
      // for (const key in json.message) {
      //     // console.log(key);
      //     showBreeds(key)
  });

  function toyCard(json){
    // <div class="card">
    // <h2>Woody</h2>
    // <img src=toy_image_url class="toy-avatar" />
    // <p>4 Likes </p>
    // <button class="like-btn">Like <3</button>
    // </div>
    for (const key in json) {
      addCard(json[key])
    }
  }

  function addCard(obj){
    // console.log(json[key].image);
      a = document.createElement('div')
      a.className = "card"
      // a.style = "display:inline"
      h2 = document.createElement('h2')
      h2.textContent = obj.name
      btn = document.createElement('button')
      btn.class = "like-btn"
      btn.textContent = "Like <3"
      btn.addEventListener("click", () => {addLikes(obj.id)})
      c = document.createElement('img')
      c.height = 100
      // c.width = 100
      c.src = obj.image
      p = document.createElement('p')
      p.textContent = `${obj.likes} likes`
      p.id = `${obj.id}_likes`
      a.appendChild(h2)
      a.appendChild(c)
      a.appendChild(p)
      a.appendChild(btn)
      toyCollection.appendChild(a)
  }

  function addLikes(id){
    let likes = document.getElementById(`${id}_likes`).textContent
    likes = parseInt(likes.replace(" likes",""))
    likes++
    console.log(likes)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    document.getElementById(`${id}_likes`).textContent = `${likes} likes`
  }

  function newToy(form){
    // console.log(form)
    return fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name.value,
            image: form.image.value,
            likes: "0"
        })
  })
  .then(function(response) {
      return response.json();
  })
  .then(function(object) {
      console.log(object);
      addCard(object)
      // document.body.innerHTML = object.id
  })
  .catch( function ( error ) {
      // document.body.innerHTML = error.message
  })
  }



});
