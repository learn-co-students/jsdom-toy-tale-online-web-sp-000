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
});

function fetchToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json)
    .then(json => createToy(json));
    
    function createToy(json){
      const toyBox = document.getElementById('toy-collection');
      
      json.forEach(toy => {
        let newToy = document.createElement('div');
        newToy.className = 'card';
        toyName(toy, newToy);
        toyPhoto(toy, newToy);
        totalLikes(toy, newToy);
        likeBtn(toy, newToy);
        toyBox.appendChild(newToy);
      });
      
      function toyName(toy, newToy){
        let name = document.createElement('h2');
        name.innerText = toy.name;
        card.appendChild(newToy);
      }
      
      function toyPhoto(toy, newToy){
        let image = document.createElement('img');
        image.src = toy.image;
        image.className = 'toy-avatar';
        newToy.appendChild(image);
      }
      
      function totalLikes(toy, newToy){
        let likes = document.createElement('p');
        likes.innerText = `${toy.likes} likes`;
        newToy.appendChild(likes);
      }
      
      function likeBtn(toy, newToy){
        let button = document.createElement('button');
        button.className = 'like-btn';
        button.style = "width: 30px;height:30px;cursor:pointer;";
        button.innerText = "♥";
        button.addEventListener('click', () => {
          increment(toy);
          window.location.reload(true);
        });
        newToy.appendChild(button);
      }
      
      function increment(toy){
        let objConfig = {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body: JSON.stringify({'likes':parseInt(toy.likes + 1)})
        };
        fetch(`http://localhost:3000/toys/${toy.id}`, configObj);
      }
      
      const submit = document.querySelector('form.add-toy-form');
      submit.addEventListener('submit', postData);
      
      function postData(){
        let input = document.querySelectorAll('.input-text');
        let data = {
          'name': input[0].value,
          'image': input[1].value,
          'likes': '0'
        };
        
        let objConfig = {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
          },
          body: JSON.stringify(data)
        };
        
        fetch("http://localhost:3000/toys", objConfig)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(error => {
          console.log('Something funky is a foot');
          console.log(error.message);
        });
      }
    }
}
  
  
