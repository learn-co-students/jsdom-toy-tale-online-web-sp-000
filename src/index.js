let addToy = false;

document.addEventListener("DOMContentLoaded", () => {



  




});



  
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



fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(function(object) {
for(const toy in object){
  makeCard(object[toy])
}
})

function makeCard(toy){
let toyCollection = document.getElementById("toy-collection");

let div = document.createElement('div');
div.classList.add("card");

let h2 = document.createElement("h2");
h2.textContent = toy.name;

let img = document.createElement('img');
img.src = toy.image;
img.style.width = "100%";
img.style.height = "auto";

let p = document.createElement("p");
p.textContent = `${toy.likes} Likes `;
p.classList.add("likes-p");

let button = document.createElement("button");
button.textContent = "Like";
button.classList.add("like-btn");
button.addEventListener("click", addLike)

let id = document.createElement("p");
id.textContent = toy.id;
id.classList.add("toy-id");
id.style.visibility = "hidden";

div.appendChild(h2);
div.appendChild(img);
div.appendChild(p);
div.appendChild(button);
div.appendChild(id);


toyCollection.appendChild(div)

};


let form = document.querySelector("form.add-toy-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

  let name = document.querySelector("input[name='name']").value;
  let image = document.querySelector("input[name='image']").value;

    const newToyData = {
      name: name,
      image: image,
      likes: 0
    }
  
    const dataObj = {
        method: "POST",
        headers: {
           "Content-Type" : "application/json",
           "Accept" : "application/json",
        },
        body:JSON.stringify(newToyData)
    };
  
    document.querySelector("input[name='name']").value = "";
    document.querySelector("input[name='image']").value = "";
  
    makeNewToy(dataObj);
})








function makeNewToy(dataObj){

console.log(dataObj);

fetch("http://localhost:3000/toys", dataObj)
.then(resp => resp.json())
.then(object => console.log(object))
.catch(function(error){
  console.log(error.message)
})
}


  
  
function addLike(){
let id = this.parentElement.querySelector("p.toy-id").textContent;
let num = parseInt(this.parentElement.querySelector('p.likes-p').textContent.split(" ")[0]) + 1;
this.parentElement.querySelector('p.likes-p').textContent = num + " Likes ";

dataObj = {
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json",
    "Accept" : "application/json"
  },
  body: JSON.stringify({likes: num})
}

fetch(`http://localhost:3000/toys/${id}`, dataObj)
.then(resp => resp.json())
.then(obj => console.log(obj))
.catch(function(error){
  console.log(error.message)
})

}

