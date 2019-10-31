let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyDiv = document.querySelector('#toy-collection')
  

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(result => result.forEach(element => myToys(element)))

  function toysToDom(json) { 
   toyDiv.innerHTML += 
   `<div class='card'>
      <h2>${json.name}</h2>
      <img src=${json.image} class="toy-avatar"/>
      <button class="like-btn">like ${json.likes}</button>
    </div>`
  }

  // Trying it both ways --> This way is longer

  function myToys(json) {
    let newDiv = document.createElement('div')
    newDiv.className = 'card'
    toyDiv.appendChild(newDiv)
    newDiv.id = json.id
    let myH2 = document.createElement('h2')
    myH2.innerText = json.name
    let myImage = document.createElement('img')
    myImage.className = "toy-avatar"
    myImage.src = json.image
    let myButton = document.createElement('button')
    myButton.className = "like-btn"
    myButton.textContent= `Likes: ${json.likes}`
    newDiv.appendChild(myH2)
    newDiv.appendChild(myImage)
    newDiv.appendChild(myButton)

    //console.log(newDiv.id)
  }

  toyForm.addEventListener('submit', event => {
    //event.preventDefault()
    //console.log(event.target)
    let toyImage = event.target.image.value
    let toyName = event.target.name.value 

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(
        {'name': `${toyName}`,
        'image': `${toyImage}`,
        'likes': 0}
      )
    }) //close of submit form fetch

  }) //close of submit form event listener 

  toyDiv.addEventListener('click', event => {
    // console.log(event.target.innerText[event.target.innerText.length -1])

    if (event.target.className === 'like-btn') {
      //event.preventDefault()
      let toyLikes = parseInt(event.target.innerText[event.target.innerText.length -1])
      let toyId = event.target.parentNode.id
      let myNum = toyLikes+1
      console.log("toylikes", toyLikes)
      console.log(toyId)
      event.target.innerText = `Likes: ${myNum}`
      console.log(event.target.innerText)
      

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        header: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'likes': myNum
        })
      })
      .then(response => response.json())
      .then(result => console.log(result))

      

    } // close of conditional 

    

  }) //close of toyDiv event listener 

  

}) //close of window listener 
