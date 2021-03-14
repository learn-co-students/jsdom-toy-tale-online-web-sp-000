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
  toyCollection();
  document.querySelector('form').addEventListener('submit', addToys);
});

function toyCollection() {
  return fetch('http://localhost:3000/toys')
            .then(resp => resp.json())
            .then(function(obj) {
              const div = document.getElementById('toy-collection');
              for (const toy of obj) {
                const divCard = document.createElement('div');
                const h2 = document.createElement('h2');
                const img = document.createElement('img');
                const p = document.createElement('p');
                const button = document.createElement('button');
                h2.innerText = toy.name;
                img.src = toy.image;
                p.innerText = toy.likes;
                button.className = "like-btn";
                divCard.appendChild(h2);
                divCard.appendChild(img);
                divCard.appendChild(p);
                divCard.appendChild(button);
                div.appendChild(divCard);
              }
            });
}



function addToys() {
  let name = document.getElementsByClassName('input-text').name.value;
  let image = document.getElementsByClassName('input-text').image.value
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
    .then(resp => resp.json())
    .then(obj => console.log(obj))
    .catch(error => console.log(error.message));
}

