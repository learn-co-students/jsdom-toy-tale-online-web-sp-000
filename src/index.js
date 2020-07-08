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
  //i think just move this closing bracket to the very end to wrap all in domcontentloaded
  let data = {
    "name": name,
    // "image": image.value,
    "likes": 0
  };

let configObj = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(data)
};

function getData(){
  return fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      data.forEach(element => console.log(element));
      data.forEach(element => buildCard(element))
    });
}


function buildCard(element){
  let main = document.getElementById("toy-collection")
  let card = document.createElement('DIV')
  card.classList.add('card')
  let para = document.createElement('P')
  let btn = document.createElement("BUTTON");
  document.getElementById('toy-collection').appendChild(card)
  // card.innerText = element.id

  let h = document.createElement("H2")
  let t = document.createTextNode(element.name)
  h.appendChild(t)
  card.appendChild(h)


  let img = document.createElement("img");
  img.src = element.image
  img.width = "250";
  img.height = "300"
  card.appendChild(img)

  card.appendChild(para)
  para.innerText = "My Toys!!!"  ///that needs to be the number of likes though.

  card.appendChild(btn)
  btn.innerText = "Like <3"
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', element.id)

}

function useForm(){
 let name = document.getElementsByName("name")
 let uri = document.getElementByName("image")
    return fetch("http://localhost:3000/toys")
      .then(function(response) {
        return response.json();
      })
      // .then(data => {
      //   data.forEach(element => console.log(element));
      //   data.forEach(element => buildCard(element))
      // });
}
const b = document.getElementById("button")
b.addEventListener("click", function(event){
    event.preventDefault();
    let toyName = document.getElementById("toyName").value;
    let url = document.getElementById("toyUrl").value;


  return fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
      })
      .then(data => {
        const result = data.filter(e => e.name === toyName);
        result.forEach(element => buildCard(element))
        });
     // };
    });
  });
//


});
