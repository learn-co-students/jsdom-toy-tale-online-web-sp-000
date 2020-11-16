let addToy = false; // if meet condition.. - toggle toy form
let divToyCollection = document.querySelector('#toy-collection') // holds cards. aka holds return of renderToy(toy)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn"); // button takes you to form. located outside of form. 
  const toyForm = document.querySelector(".container"); // holds toy form.

  // add listener to 'Add Toy'(not form btn) button to show or hide form
   // ^ could extract this event listener/ local vari's to global and call it on addBtn
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy; // on 'click' set addToy to true. (aka '!addToy'.. the opposite of what it is now...let addToy's current val is set to false so this changes it to true)
    if (addToy) { // if addToy button was clicked
      toyForm.style.display = "block"; // display form

      // add listener to submit button
      toyForm.addEventListener('submit', e => { // when submit clicked, 
        e.preventDefault() // dont submit form data
        console.log(e.target)
        postToys(e.target) // e.target refers to the submitted toy form data
      })
    } else { // if addToy is false (aka button was never clicked) dont display form
      toyForm.style.display = "none";
    }
  });
});

// GET - fetch toys from server & return JS object
function getToys(){
  console.log('inside getToys')
  return fetch('http://localhost:3000/toys')
    .then(response => response.json()) // convert string to object
}

// POST - send form data to server, then we send the responce to renderToy() to make toy card
function postToys(toyFormData) {

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name: toyFormData.name.value,
      image: toyFormData.image.value,
      likes: 0 // bc gonna make incrementer method
    })
  }

  fetch('http://localhost:3000/toys', configObj) 
    .then( response => response.json())
    .then (function (toyObj) {
      console.log("inside fetch")
      renderToy(toyObj) // render toy to DOM
      // divToyCollection.appendChild(newToy)
    })
}


// Create DOM Toy - this fn is called for EACH toy
function renderToy(toy) {

  // create a Toy Card - container div
  let divCard = document.createElement('div') // create div el
  divCard.setAttribute('class', 'card') // add className to div

  // create h2 - name 
  let h2 = document.createElement('h2') // create div el
  h2.innerText = toy.name

  // create img 
  let img = document.createElement('img') // create div el
  img.setAttribute('src', toy.image) // src of toys image attribute
  img.setAttribute('class', 'toy-avatar')


  // create p - likes 
  let p = document.createElement('p') // create div el
  p.innerText = `${toy.likes} Likes`;

  // create button 
  let btn = document.createElement('button') // create div el
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like"
  btn.addEventListener('click', likeIncrementer)


  // append all those just created el to Card 
  divCard.appendChild(h2)
  divCard.appendChild(img)
  divCard.appendChild(p)
  divCard.appendChild(btn)

  // append individual Toy's card, to the fulll container "toy-collection"
  divToyCollection.appendChild(divCard)
}


// like button listener
// --> set when we make button for the card
function likeIncrementer( e ){
  e.preventDefault()
  // calling to server to get the previous like #, dont use a closure

  // incrementer
  let increment = parseInt(e.target.previousElementSibling.innerText) + 1;

  let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: increment
      })
    }

    // fetching its show page - to get data just about this one Toy
    fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
      .then(res => res.json())
      .then(obj => {
        console.log(e.target.previousElementSibling.innerText) // 5 Likes - (aka what we see on card screen rn)
        console.log(increment) // 6
        e.target.previousElementSibling.innerText = `${increment} Likes`
      })
}

// This Function Call Starts Program

// pass each toy to renderToys() fn
// got toys from fetch call to /toys aka index aka `Toys.all`  
getToys().then( toys => {
 toys.forEach( toy => { 
   renderToy(toy);
 })
});




/*
DURING STEP 1.  - MVP to get boxes up -> create a Toy Card - container div
function renderToy(toy) {
  let divCard = document.createElement('div') // create div el
  divCard.setAttribute('class', 'card') // add className to div
  divToyCollection.appendChild(divCard)// append obj to card
}
*/ 