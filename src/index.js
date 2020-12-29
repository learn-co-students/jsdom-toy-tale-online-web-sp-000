let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    // displayCards(json);
    for(const toy of json){
      displayCards(toy);
    }
  });

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        "name": "Jessie",
        "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
        "likes": 0
      })
    

  };

  fetch('http://localhost:3000/toys', configObj)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    console.log(object);
  })
  .catch(function(error){
    console.log(error.message);
  });

  function displayCards(toy){
    let card = document.createElement('div');
    card.className = "card";
    toyCollection.appendChild(card);
    card.appendChild(displayHeader(toy));
    card.appendChild(displayImg(toy));
    card.appendChild(displayLikes(toy));
    card.appendChild(displayButton(toy));
  }

  function displayHeader(toy){
    let heading = document.createElement('h2');
    heading.innerHTML = toy["name"];
    return heading;
  }

  function displayImg(toy){
    let image = document.createElement('img');
    image.src = toy["image"];
    image.className = "toy-avatar";
    return image;
  }

  function displayLikes(toy){
    let likes = document.createElement('p');
    likes.innerHTML = `${toy["likes"]} likes`;
    return likes;
  }

  function displayButton(toy){
    let button = document.createElement('button');
    button.className = "like-btn";
    button.innerHTML = "Like <3";
    button.addEventListener('click', function(){
      toy["likes"] = toy["likes"] + 1;
      let id = toy["id"];
      let configPatch = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: toy["likes"]
        })
      };

      fetch(`http://localhost:3000/toys/${id}`, configPatch)
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        changeLikes(json);
      });
    });
    return button;
  } 

  function changeLikes(toy){
    let toyList = document.querySelectorAll('img');
    for (const image of toyList) {
      if (image.src == toy["image"]){
        image.nextSibling.innerHTML = `${toy["likes"]} likes`;
      }
    }
  }

});


