let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      document.addEventListener('submit', event => {
          event.preventDefault;
        const toyEvent = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "name": `${event.target.name.value}`,
              "image": `${event.target.image.value}`,
              "likes": 0
            })
          }
        fetch("http://localhost:3000/toys", toyEvent)
        .then((response) => {
          return response.json()
        }) .then(function(object) {
          return object;
        })
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  })
})

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => {
      for (const element of data) {
        const toyCollection = document.querySelector("#toy-collection")
        const card = document.createElement('div');
        card.className = "card";

        let h2 = document.createElement('h2')
        h2.innerText = `${element.name}`

        let img = document.createElement("img");
        img.className = "toy-avatar";
        img.src = `${element.image}`;

        let p = document.createElement('p');
        p.innerText = `${element.likes}`;

        let btn = document.createElement('button')
        btn.className = "like-btn";
        btn.innerText = "Like <3";
        btn.setAttribute('id', element.id)
        btn.setAttribute("onclick", "likesEvent(event);");

        card.innerHTML += h2.innerHTML + img.outerHTML + p.outerHTML + btn.outerHTML;
        toyCollection.appendChild(card);
      }
    })
}

function likesEvent(event) {
  let toyLikes = parseInt(event.target.parentElement.querySelector("p").innerHTML)
  let p = event.target.parentElement.querySelector("p")

  const toyArgs = {
    method: 'PATCH',
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      "likes": `${toyLikes + 1}`
    })
  }
  fetch(`http://localhost:3000/toys/${event.target.id}`, toyArgs)
    .then((response) => {
      return response.json()
    }).then(data => {
      p.innerText = data.likes;
    })
}


