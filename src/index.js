let addToy = false;
const url = "http://localhost:3000/toys";
let formData = {
  name
  // image
  // likes
};

let configObj = {
method: "POST",
headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},
body: JSON.stringify(formData)
};

let div = document.createElement('div');


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

  fetch(url, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    // console.log(object)
    document.body.innerHTLM = object['name'];
  })
});
