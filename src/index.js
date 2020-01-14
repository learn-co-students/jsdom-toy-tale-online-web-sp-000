"use strict";

document.addEventListener("DOMContentLoaded", ()=>{
  
  //variables ----------------------------------------

  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyList = document.getElementById("toy-collection");
  const submitForm = document.querySelector('.add-toy-form');
  let addToy = false;

  //event-listeners-----------------------------------

  addBtn.addEventListener('click', () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  })

  submitForm.addEventListener('submit', event => {
    event.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        "name": "Jessiet",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(listToys())

  })

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
      .then(like_obj => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      })
  }



  //fetch database objects----------------------------

  function listToys() {
    fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then(function(data) {
    for (let i = 0; i < data.length; i++) {
      //div
      const toy = document.createElement("div");
      toy.classList.add("card");

      //header
      const header = document.createElement("h2");
      header.innerHTML = data[i]["name"];
      toy.appendChild(header);

      //image
      const imgTag = document.createElement("img");
      imgTag.src = data[i]["image"];
      imgTag.classList.add("toy-avatar");
      toy.appendChild(imgTag);

      //likes
      const p = document.createElement("p");
      p.innerHTML = data[i].likes + ' Likes';
      toy.appendChild(p);

      //button
      const button = document.createElement("button");
      button.innerText = "Like <3";
      button.classList.add("like-btn");
      toy.appendChild(button);
      button.addEventListener('click', (e) => {
        likes(e)
        // fetch(`http://localhost:3000/toys/${data[i].id}`, {
        //   method: 'PATCH',
        //   headers: 
        //     {
        //       "Content-Type": "application/json",
        //       Accept: "application/json"
        //     },
        //     body: JSON.stringify({
        //       "likes": data[i].likes +1
        //     })
        // })
        // .then(data => data.json())
        // .then(p.innerHTML = (data[i].likes + 1) + ' Likes')
      })
      toyList.appendChild(toy);
      }
    })
  };

listToys();

})
