const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyList = document.getElementById('toy-collection')
const frmbtn = document.getElementById('formbtn')
const toyAddress = "http://localhost:3000/toys"

let toyName = document.getElementById("formName").value
let toyImg = document.getElementById("formImg").value
let addToy = false
let formData = {
  name: toyName,
  image: toyImg,
  likes: 0
};

const configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};


// YOUR CODE HERE
function getToys () {
  json = fetch(toyAddress)
  .then(resp => resp.json())
  .then(json => displayToys(json))
}

function displayToys (object) {
  const table = document.createElement("table")
  for (const toy of object) {
    const row = document.createElement("tr")
    const nametd = document.createElement("td")
    const imgtd = document.createElement("td")
    const liketd = document.createElement("td")
    const buttontd = document.createElement("td")
    const btn = document.createElement("button")
    const img = document.createElement("img")
    nametd.innerHTML = toy["name"]
    img.src = toy["image"]
    img.width = 100
    img.height = 100
    btn.innerHTML = "Like"
    btn.className = "likeButton"
    const url = `http://localhost:3000/toys/${toy["id"]}`
    btn.addEventListener('click', () => {
      updateLikes(toy["likes"], url)
    })
    liketd.innerHTML = toy["likes"]
    liketd.id = toy["name"] + "Likes"
    buttontd.appendChild(btn)
    imgtd.appendChild(img)
    row.appendChild(nametd)
    row.appendChild(imgtd)
    row.appendChild(buttontd)
    row.appendChild(liketd)
    row.id = toy["name"]
    table.appendChild(row)
  }
  toyList.appendChild(table)
}

function updateToy(json) {
  const tr = document.getElementById(json["name"])
  const td = document.getElementById(json["name"] + "Likes")
  td.innerHTML = json["likes"]
  tr.appendChild(td)
}

function updateLikes(likes, url){
  const likeObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes + 1
    })
  }
  json = fetch(url, likeObj)
    .then(resp => resp.json())
    .then(json => updateToy(json))
}


formbtn.addEventListener('click', () => {
  fetch(toyAddress, configObj)
  .then(resp => resp.json)
  .then(json => displayToys(json))
})

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
document.addEventListener('DOMContentLoaded', function(){
  getToys()
  //let likeButtons = document.getElementsByClassName('likeButton')
  //console.log(likeButtons[0])
  //for (const btn of likeButtons) {
  //  btn.addEventListener('click', () => {
  //    updateLikes(btn.name, btn.value)
  //  })
  //}
})
