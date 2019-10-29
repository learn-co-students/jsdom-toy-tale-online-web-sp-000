const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(function(response){
    return response.json();
  })
}

function renderToys(toy){
  console.log(toy);
     let collection = document.querySelector("#toy-collection");
     let t = document.createElement("div");
     t.className = "card";
     collection.append(t);
     let h2 = document.createElement("h2");
     h2.innerHTML = toy["name"];
     t.append(h2);
     let img = document.createElement("img");
     img.src = toy["image"];
     img.width = 100;
     t.append(img);
     let p = document.createElement("p");
     p.innerHTML = toy["likes"] + " Likes";
     t.append(p);
     let b = document.createElement("button");
     b.className = "like-btn";
     b.innerHTML = "Like";
     //t.append(b);
     b.addEventListener('click', () => {
      //debugger
       //p.innerHTML = "more Likes";
       t = parseInt(toy["likes"], 10);
       t = t + 1;
       p.innerHTML = t + " likes";
       let likeObj = { 
         method: "PATCH",
         headers: 
         {
         "Content-Type": "application/json",
         Accept: "application/json"
         },
         body:
         JSON.stringify({
         "likes": t
          })
        }
        fetch(`http://localhost:3000/toys/${toy['id']}`, likeObj)
        .then(function(response){
          return response.json();
        })
        .then(function(json){
          //debugger
        })
      })
      t.append(b);  
}

  
  //collection.querySelectorAll(".like-btn")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
addBtn.addEventListener('click', () => {
  let tf = toyForm.querySelector('form');
  let obj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": tf.elements[0].value,
      "image": tf.elements[1].value,
      "likes": 0
    })
  }
  //debugger
  return fetch("http://localhost:3000/toys", obj)
  .then(function(response){
    response.json();
  })
  .then(function(json){
    console.log(json);
  })
})

fetchToys().then(json => {
  json.forEach(toy => {
    renderToys(toy);
  })

  
})