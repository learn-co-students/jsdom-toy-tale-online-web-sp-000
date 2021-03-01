let addToy = false;



document.addEventListener("DOMContentLoaded", () => {



  url = 'http://localhost:3000/toys'
  const toyCollection = document.getElementById("toy-collection")
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form")
  // const likeButton = toyCollection.querySelectorAll("div.like-btn")
  // const input = document.querySelector(".input-text")
  // console.log(likeButton)


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  function postData(url = '', data = {}) {
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
    
      },
      body: JSON.stringify(data) 
    });
    
  }
  
  function toysFetch (){
    fetch(url)
    .then(response =>{
      return response.json()
    })
    .then(data =>{
      renderToys(data)
    })
}


function renderToys(data){
  data.forEach(function(toy){
    let newDiv = document.createElement('div')
    newDiv.id = `toy-${toy.id}`
    newDiv.className = 'card'
    toyCollection.appendChild(newDiv)

    let newToyName = document.createElement('h2')
    newToyName.textContent = `${toy.name}`
    newDiv.appendChild(newToyName)

    let newImg = document.createElement('img')
    newImg.src = toy.image
    newImg.className = 'toy-avatar'
    newDiv.appendChild(newImg)

    let newLike = document.createElement('p')
    newLike.textContent = `${toy.likes} Likes`
    newDiv.appendChild(newLike)
    
    let newButton = document.createElement('button')
    newButton.className = "like-btn"
    newButton.textContent = 'Like'
    newDiv.appendChild(newButton)

  })
}

addToyForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const name = event.target[0].value
  const  image =  event.target[1].value
  postData(url,{name: name, image:image ,likes: '0'})
})


toyCollection.addEventListener("click", function(e) {
  e.preventDefault()
  const children = e.target
  
  if(children.className === 'like-btn'){
    let id = e.target.parentNode.id.split('').slice(-1)[0]
    let likes = parseInt(e.target.parentNode.querySelector("p").textContent.split(' ')[0])
    console.log(likes)
    likes = likes + 1
    console.log(likes)
    fetch(`${url}/${id}`, 
      { 
         method: "PATCH", 
         headers: {    "Content-type": "application/json"  
        }, 
        body: JSON.stringify({ likes:  `${likes}`})

      }
    ) 
  //   .then(res => res.json())
  //   .then(() => location.reload())
  // //    .then(response => {    console.log(response.status);    
  // //      return response.json();  })  .then(data => console.log(data));
  // //   //  console.log(event.target.parentNode.querySelector("p") = ``)
    }
 // toysFetch ()
})

// button.addEventListener("click", function(event) {
   
//     let id = event.target.parentNode.id.split('').slice(-1)[0]
//     let likes = parseInt(event.target.parentNode.querySelector("p").textContent.split('')[0])
//     likes = likes + 1
//     console.log(likes)
//     fetch(`${url}/${id}`, 
//       { 
//          method: "PATCH", 
//          headers: {    "Content-type": "application/json"  
//         }, 
//         body: JSON.stringify({ likes:  `${likes}`})

//       }
//     ) 
//     .then(res => res.json())
//     .then(() => location.reload())
//     event.preventDefault()
//   // //    .then(response => {    console.log(response.status);    
//   // //      return response.json();  })  .then(data => console.log(data));
//   // //   //  console.log(event.target.parentNode.querySelector("p") = ``)
// })

toysFetch ()

});
