
document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".add-toy-form");
  console.log("toyForm",toyForm)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    console.log(addToy)
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

//   function newToy(toy){
//
//   return fetch("http://localhost:3000/toys", obj)
//
//     .then(res => res.json())
//
//     .then
//
//
//   }
//
//
//   let formData = {
//     name:  toy.name,
//     image:  toy.image,
//     likes:  toy.likes
//     }
//
//     let object = {
//       method: "POST",
//       headers:{
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//
// body: JSON.stringify(formData)
// };

function getToys(){
   // this function is geting the readable json format that we can identify and use.

  fetch("http://localhost:3000/toys")
// this is the url source we are using to fetch

  .then(res => res.json())
  // response json becomes eligble for use to help code
    .then(json => {
      json.forEach( toy => {renderedToy(toy) })
  })
}

  function renderedToy(toy){
    // console.log("toy",toy)
    // toy = object with { id:, name:, img:, likes: }
    let div =  document.createElement("div")
    // after creating the div element
    // extending the classname onto it

      // div.classname = attr of <div>
      div.className = "card"
      // div.classname = attr of <div>

      // creating <h2> tag
    let h2 =  document.createElement("h2")
    // </h2> tag

    // creating <img> tag
    let img = document.createElement("img")
    // </img>

    // setting img src => ` toy ${image}`
    img.src = toy.image

    // creating <p> tag
    let p =  document.createElement("p")
      // </p> tag

    // creating <button> tag
    let button =  document.createElement("button")
    // closing </button> tag

      // All of these are attributes
      h2.innerText = toy.name
      // instruciton say set img className => "toy avatar"
      img.className = "toy-avatar "

      p.innerText = `${toy.likes}`

      //instrucitons say to give button a classname
      // instructions set =  inner text => "Like <3"
      button.className = "like-btn"
      button.innerText = "Like <3"
      // All of these are attributes
      div.append(h2,img,p,button)
      // Append is allowing me to Add multiple elements in one statement
      // div.appendChild(h2)
      // div.appendChild(img)
      // div.appendChild(p)
      // div.appendChild(button)
      const toyCollection = document.querySelector("#toy-collection")
      toyCollection.appendChild(div)
      console.log(toyCollection)
        // console.log(toy)
    }

    toyForm.addEventListener("submit", (e) => {
      console.log("submit",e)
      e.preventDefault()
       // steps
       //1 .get the post form fields and save it into varibales
       //2. we set it to the vaivbles to use it.
       //3. Create post request
       //4. rerender the Dom to show thw new

    })
//     let formData = {
//       name:  toy.name,
//       image:  toy.image,
//       likes:  toy.likes
//       }
//
//       let object = {
//         method: "POST",
//         headers:{
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//
//   body: JSON.stringify(formData)
// };
// //
// function newToy(){
//   fetch ("http://localhost:3000/toys",object)
//    // then => resp {
//      return resp.json()
//    }
// }


getToys()
// invoke = call a function wherever you want it to be called
});
