const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collection = document.querySelector("#toy-collection");
const createButton = document.querySelector('input.submit');
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

createButton.addEventListener('click', function(event){
  event.preventDefault();
  const name = document.querySelector('input[name=name]').value;
  const image = document.querySelector('input[name=image]').value;
  if (name !== '' && image !== ''){
    let data = {
      name: name,
      image: image,
      likes: 0
    }
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(json => {
        // console.log(json);
        // console.log(json);
        const div = document.createElement('div');
        div.className = "card";

        const h2 = document.createElement('h2');
        h2.innerHTML = json.name;
        div.appendChild(h2);

        const img = document.createElement('img');
        img.src = json.image;
        img.className = 'toy-avatar';
        div.appendChild(img);

        const p = document.createElement('p');
        p.innerHTML = `${json.likes} Likes `
        div.appendChild(p);

        const button = document.createElement('button');
        button.className = 'like-btn';
        button.innerHTML = 'Like <3';
        button.addEventListener('click', function(){
          const newNumber = ++json.likes;
          const id = json.id;
          const patchURL = `http://localhost:3000/toys/${id}`;
  
          let data = {
            likes: newNumber
          }
          // console.log(data);
          let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data)
          };
  
          // console.log(configObj);
          fetch(patchURL, configObj)
            .then(resp => resp.json())
            .then(json => console.log(json));
        
          p.innerHTML = `${json.likes} Likes `  
        });
        div.appendChild(button);

        collection.appendChild(div);

      });
  }  
});

// OR HERE!
fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    // console.log(json);
    for (const toy of json) {
      const div = document.createElement('div');
      div.className = "card";

      const h2 = document.createElement('h2');
      h2.innerHTML = toy.name;
      div.appendChild(h2);

      const img = document.createElement('img');
      img.src = toy.image;
      img.className = 'toy-avatar';
      div.appendChild(img);

      const p = document.createElement('p');
      p.innerHTML = `${toy.likes} Likes `
      div.appendChild(p);

      const button = document.createElement('button');
      button.className = 'like-btn';
      button.innerHTML = 'Like <3';
      button.addEventListener('click', function(){
        const newNumber = ++toy.likes;
        const id = toy.id;
        const patchURL = `http://localhost:3000/toys/${id}`;

        let data = {
          likes: newNumber
        }
        // console.log(data);
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        };

        // console.log(configObj);
        fetch(patchURL, configObj)
          // .then(resp => resp.json())
          // .then(json => console.log(json));
      
        p.innerHTML = `${toy.likes} Likes `  
      });
      div.appendChild(button);

      collection.appendChild(div);
    }
  })