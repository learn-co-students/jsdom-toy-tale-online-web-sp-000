let addToy = false;

document.addEventListener("DOMContentLoaded", (
  return fetch("http://localhost:3000/users", {
  method: "GET", 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    id, 
    name, 
    image, 
    likes
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    document.body.innerHTML = object["id"];
  })
  .catch(function (error) {
      document.body.innerHTML = error
  })
) => {
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
