let addToy = false;
console.log("hello")
function getToys(){
 fetch("http://localhost:3000/toys")
 .then(resp => resp.json())
 .then(resp1 => {
  for (const toy in resp1){
    console.log(resp1[toy])
    let theToy = resp1[toy]
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    let name = document.createElement('h2')
    let pic = document.createElement('img')
    let likes = document.createElement('p')
    name.innerHTML = `${theToy.name}`
    pic.src = theToy.image
    likes.innerHTML = `${theToy.likes}`
    card.appendChild(name)
    card.appendChild(pic)
    card.appendChild(likes)
    document.body.appendChild(card)
  }
 })
}

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
  })
  getToys()
});
