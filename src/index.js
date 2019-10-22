const toysURL = `http://localhost:3000/toys`; 

// YOUR CODE HERE
const incrementLikes = (e) => {
  const targetId = e.target.dataset.id 
  const likesToIncrement = document.getElementById(`likes ${targetId}`)
  likesToIncrement.innerText++ 
  const likeCount = likesToIncrement.innerText 
  const reqObj = {
    method:"PATCH",
    headers: {"Content-Type": "application/json"}, 
    body:JSON.stringify({likes:likeCount}) 
  }

  fetch(toysURL + `/${targetId}`, reqObj)
  .then(resp => resp.json())
  .then(toyObj => {
    console.log(toyObj)
  })
}

const addLikeListeners = () => {
  const likeBtns = document.querySelectorAll(`.like-btn`)
  likeBtns.forEach((btn) => {
    btn.addEventListener(`click`, (e) => {
      incrementLikes(e); 
    })
  })
}

const addNewToy = (toy) => {
  renderToy(toy); 
  const reqObj = {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toy)
  }
  fetch(toysURL, reqObj)
  .then(resp => resp.json())
  .then(toyObj => {
    console.log(toyObj)
  })
}

const scrapeFormData = (e) => {
  return{
    name:e.target[0].value,
    image:e.target[1].value, 
    likes:0
  }
}

const handleNewToySubmission = (e) => { 
  addNewToy(scrapeFormData(e))
}

const removeNewToyFormListener = () => {
  const newToyForm = document.querySelector(`.add-toy-form`)
  newToyForm.removeEventListener(`submit`, (e) => {
    handleNewToySubmission(e); 
  })
}

const addNewToyFormListener = () => {
  const newToyForm = document.querySelector(`.add-toy-form`)
  newToyForm.addEventListener(`submit`, (e) => {
    handleNewToySubmission(e); 
  })
}

const addShowNewToyFormListener = () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy 
  //originally the above was let addToy = false
  //code still seems to work without it b/c of line 18? 

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      addNewToyFormListener(); 
    } else {
      toyForm.style.display = 'none'
      removeNewToyFormListener(); 
    }
  })
}

const addEventListeners = () => {
  addShowNewToyFormListener();
  addLikeListeners(); 
}

class Toy{
  constructor(toyObj){
    this.toyId = toyObj.id
    this.toyName = toyObj.name
    this.toyImage = toyObj.image
    this.toyLikes = toyObj.likes 
  }

  render(){
    const toyDiv = document.getElementById(`toy-collection`)
    const toyCard = document.createElement(`div`)
    toyCard.className = `card`
    const toyHeadingSection = document.createElement(`h2`)
    toyHeadingSection.innerText = this.toyName 
    const toyImageSection = document.createElement(`img`)
    toyImageSection.src = this.toyImage 
    toyImageSection.className = `toy-avatar`
    const toyLikeSection = document.createElement(`p`)
    toyLikeSection.innerText = this.toyLikes
    toyLikeSection.className = `toy-likes` 
    toyLikeSection.id = `likes ${this.toyId}`  
    const toyLikeBtn = document.createElement(`button`)
    toyLikeBtn.className = `like-btn`
    toyLikeBtn.dataset.id = this.toyId 
    toyLikeBtn.innerText = `Like`
    toyCard.append(toyHeadingSection)
    toyCard.append(toyImageSection)
    toyCard.append(toyLikeSection)
    toyCard.append(toyLikeBtn)
    toyDiv.append(toyCard) 
  }
}

const renderToy = (toyObj) => {
  const newToy = new Toy(toyObj)
  newToy.render()
}

const renderToys = (toysObj) => {
  toysObj.forEach((toyObj) => {
    renderToy(toyObj)
  })
  addEventListeners(); 
}

const fetchExistingToys = () => {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(toysObj => {
    renderToys(toysObj)
  })
}

const main = () => {
  document.addEventListener(`DOMContentLoaded`, () => {
    fetchExistingToys(); 
  
  })
}

main(); 
// OR HERE!
