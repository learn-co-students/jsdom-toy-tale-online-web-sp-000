let addToy = false;
const new_toy = document.getElementById("new-toy-btn");
let toy_collection = document.getElementById('toy-collection');
let div_all = toy_collection.getElementsByTagName("div")


document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
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


new_toy.addEventListener("click", function(a){

    const submit_form = document.getElementsByClassName("add-toy-form")[0];
    submit_form.addEventListener("submit", function(a){
    a.preventDefault();
    fetchNewToy(a.target.name.value, a.target.image.value);
  });

})


function renderToy(name, image){

  let div = document.createElement('div');
  div.classList.add("card");
  let h2 = document.createElement('h2');
  h2.innerHTML = name;
  let img = document.createElement('img');
  img.classList.add("toy-avatar");
  img.src = image;
  let p = document.createElement('p');
  p.innerHTML = 0 + " Likes";
  let button = document.createElement('button');
  button.innerHTML = " Like ";
  button.classList.add("like-btn");
  toy_collection.appendChild(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(p);
  div.appendChild(button);
}

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(function(response) {

    return response.json();

  })
  .then(function(object) {
    let toy_collection = document.getElementById('toy-collection');
        object.forEach((element) => {
          let div = document.createElement('div');
          div.classList.add("card");
          let h2 = document.createElement('h2');
          h2.innerHTML = element.name;
          let img = document.createElement('img');
          img.classList.add("toy-avatar");
          img.src = element.image;
          let p = document.createElement('p');
          let counter = element.likes
          p.innerHTML = counter + " Likes";
          let button = document.createElement('button');
          button.innerHTML = " Like ";
          button.classList.add("like-btn");
              button.addEventListener("click", function(a){
              counter++;
              p.innerHTML = counter + " Likes";
              fetchUpdate(counter, element.id);
            });

        toy_collection.appendChild(div);
        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(p);
        div.appendChild(button);
         })
  });
}

function fetchUpdate(counter, id){
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        "likes": counter
      })
  };
  return fetch(`http://localhost:3000/toys/${id}`, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    console.log(object);
  })
  .catch(function(error) {
    alert("Error");
    document.body.innerHTML = error.message;
  });

}

function fetchNewToy(name, image){
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        "name": name,
        "image": image,
        "likes": 0
      })
  };
  return fetch('http://localhost:3000/toys', configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    renderToy(object.name, object.image);
  })
  .catch(function(error) {
    alert("Error");
    document.body.innerHTML = error.message;
  });
}
