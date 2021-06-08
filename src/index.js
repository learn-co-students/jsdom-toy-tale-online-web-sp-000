
let addToy = false;
//const toyColl = document.querySelector('#toy-collection');

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form 

    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      json.forEach(element => {
        let obj = Object.values(element);
        let toyColl = document.querySelector('#toy-collection');
        let classCard = document.createElement('div');
        classCard.setAttribute("class", "card");
        let img = document.createElement('img');
        img.src = obj[2];
        let header = document.createElement('h2');
        let para = document.createElement('p');
        let button = document.createElement('button');
        button.setAttribute("class", "like-btn");
        classCard.appendChild(header).innerText = obj[1];
        classCard.appendChild(img);
        classCard.appendChild(para).innerText = obj[3];
        classCard.appendChild(button);
        toyColl.appendChild(classCard);
      });
    });

    const configObj = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
 
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
        })
    }

    fetch('http://localhost:3000/toys', configObj)
      .then(response => response.json())
      .then(json => {
        let toyColl = document.querySelector('#toy-collection');
        let classCard = document.createElement('div');
        classCard.setAttribute("class", "card");
        let img = document.createElement('img');
        img.src = json.image;
        let header = document.createElement('h2');
        let para = document.createElement('p');
        let button = document.createElement('button');
        button.setAttribute("class", "like-btn");
        classCard.appendChild(header).innerText = json.name;
        classCard.appendChild(img);
        classCard.appendChild(para).innerText = json.likes;
        classCard.appendChild(button);
        toyColl.appendChild(classCard); 
      })
    
/*    const configObj = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
 
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
        })
    }
*/

   addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


/*
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      json.forEach(element => {
        let obj = Object.values(element);
        let toyColl = document.querySelector('#toy-collection');
        let classCard = document.createElement('div');
        classCard.setAttribute("class", "card");
        let img = document.createElement('img');
        img.src = obj[2];
        let header = document.createElement('h2');
        let para = document.createElement('p');
        let button = document.createElement('button');
        button.setAttribute("class", "like-btn");
        classCard.appendChild(header).innerText = obj[1];
        classCard.appendChild(img);
        classCard.appendChild(para).innerText = obj[3];
        classCard.appendChild(button);
        toyColl.appendChild(classCard);
        console.log(toyColl)
      });
    });

    fetch('http://localhost:3000/toys', configObj)
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
    
    const configObj = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
        },
 
      body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
        })
    }
    */