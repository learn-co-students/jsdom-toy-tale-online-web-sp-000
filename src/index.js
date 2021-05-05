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

    let toyCollection = [];

    fetch("http://localhost:3000/toys")
      .then(function(response) {
        return response.json();
      })
      .then(function(json){
        addCard(json);
      })

      function addCard(toys){

        for (let i = 0; i < toys.length; i++){
          toyCollection.push(toys[i]);

          let div = document.createElement('div');
          div.className = 'card';
          document.getElementById("toy-collection").appendChild(div);

          let newCard = document.createElement('img');
          newCard.className = "toy-avatar";
          newCard.src = toys[i].image;
          newCard.width = 250;
          newCard.height = 300;
          newCard.alt = toys[i].name;
          document.getElementById("toy-collection").querySelectorAll('div')[i].appendChild(newCard);

          let h2 = document.createElement('h2');
          let text = document.createTextNode('');
          h2.appendChild(text);
          h2.innerHTML = toys[i].name;
          document.getElementById("toy-collection").querySelectorAll('div')[i].appendChild(h2);

          let p = document.createElement('p');
          let textP = document.createTextNode('');
          p.appendChild(textP);

          if (toys[i].likes == undefined) {
            p.innerHTML = "0 Likes";
          } else {
            p.innerHTML = toys[i].likes + " Likes";
          };

          document.getElementById("toy-collection").querySelectorAll('div')[i].appendChild(p);

          let button = document.createElement('button');

          button.innerHTML = "Like";
          button.className = "like-btn";
          document.getElementById("toy-collection").querySelectorAll('div')[i].appendChild(button);

          button.addEventListener('click', function(event) {
            buttonClicked(event);
          })
        }
      }

    function buttonClicked(event) {
      let namedToy = event.srcElement.parentNode.childNodes[1].innerHTML;
      let nameText = document.getElementById("toy-collection").querySelectorAll('h2');

      for (let i = 0; i < nameText.length; i++) {
        if (nameText[i].innerHTML == namedToy) {
          toyCollection[i].likes += 1;
          document.getElementById("toy-collection").querySelectorAll('p')[i].innerHTML = toyCollection[i].likes + " Likes";

        let configurationObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": toyCollection[i].likes
          })
        };
        fetch("http://localhost:3000/toys/" + toyCollection[i].id, configurationObject);
       }
      }
    };
});