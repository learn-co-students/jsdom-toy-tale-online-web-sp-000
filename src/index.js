let addToy = false;

let newToy = document.querySelector('.add-toy-form') //heres where the new toy form lives

let div = document.querySelector('#toy-collection');//heres where the collection lives

let destinationURL = "http://localhost:3000/toys"; // heres the destination URL

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
  getToys()//load the db of toys

  newToy.addEventListener('submit', (e) => {
    e.preventDefault()
    submitData(e)
    newToy.reset()
  }); //listen for new toys
});

async function getToys(){
  const resp = await fetch('http://localhost:3001/toys');
  const json = await resp.json();
  return addToys(json);
} // go to this address, get the response, turn it into json, then return me the array.

function addToys(json){
  for (let i=0; i < json.length; i++) {
    addNewToy(json[i])
  };
}//Add a group or array of new toys like this

function addNewToy(toy){
  let thisToy = toy //callable object for my button listener
  let div2 = document.createElement('div'); //create a sub-div 
  let h2 = document.createElement('h2'); //create an 'h2'
  let img = document.createElement('img'); // create an image attribute
  let p = document.createElement('p'); // create a 'p' element
  let button = document.createElement('button')// create a 'button
  div2.classList.add("card"); //add a class to the new div
  div2.id = toy.id // give the toy an id with which they can be tracked
  h2.innerText = toy.name; //set the name in the heading
  img.src = toy.image; // set the source for `img`
  img.classList.add = "toy-avatar"; //set the class for `img`
  img.style.height = '266px'; //resize the image height
  img.style.width = '160px'; //resize the image width
  p.innerText = toy.likes; // set the likes
  button.classList.add('like-button'); // set the `button` class.
  button.innerText = "Like"//add the `button` label 
  div.appendChild(div2); //add `div2` to `div`
  div2.appendChild(h2); // add `h2` to `div`
  div2.appendChild(img); //add `img` to `div2`
  div2.appendChild(p); //add `p` to `div2`
  div2.appendChild(button);
  button.addEventListener('click', (e) => liked(e, thisToy)); //add a unique event listner to this button
  console.log(div2); //tell me what you did.
}

function submitData(e){
  let formData = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }; //heres your form data
  
  let configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }; // heres the configuration
  
  fetch(destinationURL, configurationObject)
    .then(resp => resp.json())
    .then(json => addNewToy(json))
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
    }); //Heres your fetch request
 };

 function liked (e, toy){
   let val = parseInt(e.target.parentElement.children[2].innerText) + 1; //create a new value for likes here
   e.target.parentElement.children[2].innerHTML = `${val}`; // change the value of likes in the HTML(not the database)
   likeThisToy(toy, val); //pass the toy and the new number of likes into the fetch request function
 }; //do this is if your liked

 function likeThisToy(toy, val){
  let formData = {
    likes: val
  }; //this is the data to submit
  
  let configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }; //configure the fetch request
  
  fetch(`${destinationURL}/${toy.id}`, configurationObject) // note the destination URL also includes the toy ID
    .then(resp => resp.json()) // convert the response to json
    .then(json => console.log(json)) //add a toy with the response
    .catch(function(error) {
        alert("YARRRRRRGGGGHHHHHH!");
        console.log(error.message);// if something goes wrong... Please tell me.
    }); // submit the Fetch and what to do with the response 
 };
