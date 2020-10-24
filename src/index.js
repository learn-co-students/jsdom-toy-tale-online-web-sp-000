let addToy = false;
//let newtoys = "http://localhost:3000/toys"

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
});
document.addEventListener("DOMContentLoaded", getToy())
function getToy(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => card(json))
}

  //Implement card

function card(json){
  let addNewToy = document.querySelector('div#toy-collection')
  json.forEach(toys=>{
    let h2=document.createElement("h2")
    h2.innerText=toys.name
    let p=document.createElement("p")
    p.innerText=toys.likes
    let img=document.createElement("img")
    img.setAttribute("src", toys.image)
    img.setAttribute("class", "toy-avatar")
    let likebutton=document.createElement("button")
    likebutton.className="Like"
    likebutton.addEventListener('click',(e) => {
      console.log(e.target.dataset);
      addLikes(e)})
    likebutton.style = "width: 30px;height:30px;cursor:pointer;"
    likebutton.innerText = "♥"
    
    let div=document.createElement("div")
    div.setAttribute("class", "card")
    div.append(h2)
    div.append(p)
    div.appendChild(img)
    div.append(likebutton)
  addNewToy.appendChild(div)})}

  //Post Method
  function displayToy(name, img, likes=0){
    let toyData = {
      name: name,
      img: img,
      likes: likes
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    }
   return fetch("http://localhost:3000/toys", configObj)
   .then(function(){
     return response.json()
   }) 
   .then(function(moreToy){
     let H2= document.createElement("h2")
     H2.innerHTML = moreToy.name
     document.appendChild(h2)
     console.log(moreToy)
   }) 
   
   .then(function(moreToy){
    let img= document.createElement("img")
    p.innerHTML = moreToy.
    document.appendChild(img)
    console.log(moreToy)

   })

   .then(function(moreToy){
    let p= document.createElement("p")
    p.innerHTML = moreToy.likes
    document.appendChild(p)
    console.log(moreToy)
   })}


  
   function addLikes(event){
     event.preventDefault()
     let woody=  parseInt(event.target.previousElementSibling.innerText)+1
     //let rex = event.target.parentElement.dataset.id
       fetch(`http://localhost:3000/toys/${event.target.id}`,{
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
          },
          body: JSON.stringify({
            "likes": woody
          })
        })
        .then(res => res.json())
       // .then((toy=>{event.target.previousElementSibling.innerText=`${toy} likes`})
       .then((toy=>{console.log(toy)})
        )}

      
     
