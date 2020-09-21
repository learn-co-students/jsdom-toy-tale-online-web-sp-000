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

  function getToys() {
    return fetch('http://localhost:3000/toys')
      .then(function(response) {
        return response.json()
      }).then(function(object) {
        for(const el of object) {
          let toyCollection = document.getElementById('toy-collection')
          let card = document.createElement("div")
          card.class = "card"
          card.innerHTML = "<h2>" + el.name + "</h2>" + 
                            "<img src=" + el.image + " class=\"toy-avatar\" />" +
                            "<p id=\"" + el.id + "\">" + el.likes + "</p>" + 
                            "<button id=\"" + el.name + "\">Like</button>"
          toyCollection.appendChild(card)
         // debugger
          
          document.getElementById(el.name).addEventListener("click", function() {
            let likes = parseInt(document.getElementById(el.id).innerText)
            document.getElementById(el.id).innerText = likes + 1
            likes += 1
            let configObj = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                likes: likes
              })
            }
            fetch (`http://localhost:3000/toys/${el.id}`, configObj)
          })

        }
      })
  }

  getToys()



});
