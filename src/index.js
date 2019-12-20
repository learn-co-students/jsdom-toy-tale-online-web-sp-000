// let addToy = false

// document.addEventListener("DOMContentLoaded", ()=> {
//   const addBtn = document.querySelector('#new-toy-btn')
//   const toyForm = document.querySelector('.container')
//   addBtn.addEventListener('click', () => {
//     // hide & seek with the form
//     addToy = !addToy
//     if (addToy) {
//       toyForm.style.display = 'block'
//     } else {
//       toyForm.style.display = 'none'
//     }
//   })

// })

document.addEventListener('DOMContentLoaded', function() {
  let addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false
  let divCollect = document.querySelector('#toy-collection')

  //Fetch Andy's Toys
  //Make a GET request to fetch all the toy objects
  //The getToys function puts the 1st half of fetch() into a function to use later
  function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(res => res.json()) //the callback function that takes in response as an argument.
    //This represents what the destination server sent back to us.
  }
  
  //With the response data, make a <div class="card"> for each toy and add it to the toy-collection div
  getToys.then(toys => { //creates the variable, toys
    toys.forEach(toy => { //iterates through each toy and passes in the results from the below mentioned function
      renderToys(toy) //This is the made-up function
    })
  })

  //Add toy info to the card
  // this function includes each step to add the rendered info to index.html
  function renderToys(toy) {
    let h2 = document.createElement('h2') //creates the h2 element for index.html
    h2.innerText = toy.name //sets the h2 to the name data collected from the api

    let img = document.createElement('img') //creates the img element for index.html
    img.setAttribute('src', toy.image) //sets the img src to the img data collected from the api
    img.setAttribute('class', 'toy-avatar') //sets the class and class name for the img attribute

    let p = document.createElement('p') //creates the p element for index.html
    p.innerText = `${toy.likes} likes` //sets the p tag to include each toy's like rating

    let btn = document.createElement('button') //creates the p element for index.html
    btn.setAttribute('class', 'like-btn') //sets the class and class name for the button element
    btn.setAttribute('id', toy.id) //sets the id and id name for the button element
    btn.addEventListener('click', (e) => { //adds the 'click' listening event for JS
      console.log(e.target.dataset); //Why dataset? Provides read/write access to custom data attributes?
      likes(e) //not sure on this one.
    })

    let divCard = document.createElement('div') //creates the div element for index.html
    divCard.setAttribute('class', 'card') //sets the attributes for the div
    divCard.append(h2, img, p, btn) //appends all the elements created above to divCard
    divCollect.append(divCard) //appends divCard to divCollect, which is the querySelector for #toy-collection
  }

  //user clicks to add a new toy. new toy gets added to Andy's toy collection
  //toy should conditionally render to the page
  //to send a POST request via Fetch, give the Fetch a second argument of an object.
  function postToy(toy_data) {
    fetch('http://localhost:3000/toys', { //fetching info from the API
      method: 'POST' //to "post" to the api
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ //built-in method to convert data into a string
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(res => res.json()) //the callback function that takes in response as an argument.
    .then((obj_toy) => { //The result of json() is returned and made available in the second then()
      let new_toy = renderToys(obj_toy) //assigns a new variable, new_toy and calls the renderToys function passing obj_toy as an argument
      divCollect.append(new_toy) //divCollect appends the result of new_toy
    })
  }

  //Increase a toy's likes
  //Increase to the toy's like count
  //A patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that
  //the specific toy has
  function likes(e) {
    e.preventDefault() //prevents the "click" of a button sending an HTTP request to the API URL
    let more = parseInt(e.target.previousElementSibling.innerText) + 1 //returns the previous sibling element
    //as a node. This property is read-only. The result will be parsed into an integer
    fetch('http://localhost:3000/toys/${e.target.id}', { //fetching the api address for a specific toy
      method: 'PATCH', //making an edit to the toy
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({ //built-in method to convert data into a string
        "likes": more
      })
    })
    .then(res => res.json()) //the callback function that takes in response as an argument.
    .then((like_obj => { //The result of json() is returned and made available in the second then()
      e.target.previousElementSibling.innerText = `${more} likes`; // pulls the previous sibling node and changes the text
    }))
  }

  // add listener to 'Add Toy' button to show or hide form
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
