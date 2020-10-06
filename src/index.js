let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
   const addBtn = document.querySelector("#new-toy-btn");
   const addToyForm = document.querySelector(".add-toy-form");
   const toyFormContainer = document.querySelector(".container");
   const divCollection = document.querySelector('#toy-collection');

   addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
         toyFormContainer.style.display = "block";
      } else {
         toyFormContainer.style.display = "none";
      }
   });

   // Add a new toy
   addToyForm.addEventListener("submit", () => {
      let formData = {
         "name": addToyForm.elements[0].value,
         "image": addToyForm.elements[1].value,
         "likes": 0
      };
      let configObj = {
         method: "POST",
         headers: { "Content-Type": "application/json", "Accept": "application/json" },
         body: JSON.stringify(formData)
      };
      fetch("http://localhost:3000/toys", configObj);
   })

   // Fetch toy collection
   function fetchToys() {
      return fetch('http://localhost:3000/toys')
         .then(response => response.json())
         .then(data => {
            for (let toy of data) {
               let h2 = document.createElement('h2')
               h2.innerText = toy.name

               let img = document.createElement('img')
               img.setAttribute('src', toy.image)
               img.setAttribute('class', 'toy-avatar')

               let p = document.createElement('p')
               p.innerText = `${toy.likes} likes`

               let btn = document.createElement('button')
               btn.setAttribute('class', 'like-btn')
               btn.setAttribute('id', toy.id)
               btn.innerText = "Like <3"
               btn.addEventListener("click", function() {
                  let configurationObject = {
                     method: "PATCH",
                     headers: { "Content-Type": "application/json", "Accept": "application/json" },
                     body: JSON.stringify({
                        "likes": toy.likes + 1
                     })
                  };
                  fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
                     .then(function(response) {
                        return response.json()
                     })
                     .then(function(json) {
                        p.textContent = json.likes + " Likes";
                     });
               })

               let divCard = document.createElement('div')
               divCard.setAttribute('class', 'card')
               divCard.append(h2, img, p, btn)
               divCollection.append(divCard)
            }
         });
   }

   fetchToys()

});








