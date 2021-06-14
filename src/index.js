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

  // fetch GET request from json server to obtain toy information from database
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(function(toyList) {
      for(const toy of toyList) {
        const newToyCard = document.createElement("div");
        newToyCard.setAttribute("class", "card");
       
        const toyName = document.createElement("h2");
        toyName.innerHTML = toy["name"];
       
        const toyImg = document.createElement("img");
        toyImg.setAttribute("class", "toy-avatar");
        toyImg.setAttribute("src", toy["image"]);

        const toyLikes = document.createElement("p");
        toyLikes.innerHTML = toy["likes"];

        const toyBtn = document.createElement("BUTTON");
        toyBtn.setAttribute("class", "like-btn");

        newToyCard.append(toyName, toyImg, toyLikes, toyBtn);

        const toyCol = document.getElementById("toy-collection");
        toyCol.appendChild(newToyCard);

        toyBtn.addEventListener("click", function() {
          const newLikeNumber = parseInt(toyLikes.textContent, 10) + 1;

          const configSubEdit = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({"likes": newLikeNumber})
          }

          fetch(`http://localhost:3000/toys/${toy["id"]}`, configSubEdit)
            .then(response => response.json())
            .then(function(editedToy) {
              toyLikes.innerHTML = editedToy["likes"];
            })

        })
      };

      // const likeBtns = document.querySelectorAll("button.like-btn");
  
      // for(const likeBtn of likeBtns) {
      //   likeBtn.addEventListener("click", function() {
      //     const likeElem = likeBtn.previousElementSibling;
      //     const oldLikes = parseInt(likeElem.textContent, 10);  
      //     const newLikes = oldLikes + 1;
      
      //     const configSubEdit = {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "Accept": "application/json"
      //       },
      //       body: JSON.stringify({"likes": newLikes})
      //     };
      
      //     fetch("http://localhost:3000/toys/:id", configSubEdit) 
      //       .then(response => response.json())
      //       .then(function(editedToy) {
      //         likeElem.textContent = editedToy["likes"];
      //       });
      //   })
      // }
    });

  const formSubmit = document.querySelector("form .submit");

  formSubmit.addEventListener("click", function() {
    const toyNameInput = document.querySelector("[name='name']").value;
    const toyImgInput = document.querySelector("[name='image']").value;
    const toyInfo = {"name": toyNameInput, "image": toyImgInput, "likes": 0};
    const configSubNew = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyInfo)
    };

    fetch("http://localhost:3000/toys", configSubNew)
      .then(response => response.json())
      .then(function(newServerToy) {
        const newToyCard = document.createElement("div");
        newToyCard.setAttribute("class", "card");
       
        const toyName = document.createElement("h2");
        toyName.innerHTML = newServerToy["name"];
     
        const toyImg = document.createElement("img");
        toyImg.setAttribute("class", "toy-avatar");
        toyImg.setAttribute("src", newServeryToy["image"]);

        const toyLikes = document.createElement("p");
        toyLikes.innerHTML = newServerToy["likes"];

        const toyBtn = document.createElement("BUTTON");
        toyBtn.setAttribute("class", "like-btn");

        newToyCard.append(toyName, toyImg, toyLikes, toyBtn);

        const toyCol = document.getElementById("toy-collection");
        toyCol.appendChild(newToyCard);
      });
  });
});



