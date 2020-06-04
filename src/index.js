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

  let createNewToy = document.querySelector("input[name='submit']")
  createNewToy.addEventListener("click", postToy)

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      let coll = document.querySelector("#toy-collection");
      
      for (toy of object) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("id", toy.id)
        coll.appendChild(card);

        let h2 = document.createElement("h2");
        h2.textContent = toy.name;
        card.appendChild(h2);

        let img = document.createElement("img");
        img.src = toy.image;
        img.classList.add("toy-avatar");
        card.appendChild(img);

        let p = document.createElement("p");
        p.textContent = `${toy.likes} Likes`;
        card.appendChild(p);

        let button = document.createElement("button");
        button.classList.add("like-btn");
        button.setAttribute("id", toy.likes)
        // button.setAttribute("id", "like-4")
        button.textContent = "Like";
        button.addEventListener("click", likeToy)
        
        function likeToy(e) {
          console.log("LIKETOY")
          // console.log(e.target.id)
          
          e.target.id = parseInt(e.target.id) + 1
          e.target.previousElementSibling.innerText = `${e.target.id} Likes`
          // console.log(parseInt(e.target.id))
          // console.log(`${toy.name}`)
          // console.log(e.target.parentElement.querySelector("p"))
          
          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: e.target.id
            })
          };

          return fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`, configObj)
            .then(function(response) {
              return response.json();
            })
            .then(function(object) {
              // location.reload();
              console.log("HIIIIIIIIIIIII")
            })
            .catch(function(error) {
              alert("HOOLD UP..");
              console.log(error.message);
            })
        
        }
        //END LIKETOY

        card.appendChild(button);
      }
    })

  let likeBtnArray = document.querySelectorAll(".like-btn")
});

function postToy(e) {
  e.preventDefault()
  // console.log(document.querySelector("input[name='name']").value)
  // console.log(document.querySelector("input[name='image']").value)
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: document.querySelector("input[name='name']").value,
      image: document.querySelector("input[name='image']").value,
      likes: 0
    })
  };

  return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      // console.log(response)
      return response.json();
    })
    .then(function(object) {
      // console.log(object)
      // let h3 = document.createElement("h3")
      // h3.textContent = "I'm working"
      // document.body.appendChild(h3)
      location.reload()
      // console.log("HIIIIIIIIIIIII")
    })
    .catch(function(error) {
      // alert("HOOLD UP..");
      console.log(error.message);
    })
}




