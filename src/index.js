


  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".add-toy-form");
  const contain = document.querySelector(".container")

  document.addEventListener("DOMContentLoaded", getToys)

  console.log("toyForm",toyForm)
  //  we print "toy Form" to the console
  // we also print toy form to the console as well
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    console.log(addToy)
    if (addToy) {

      toyForm.style.display = 'block';
      // toyForm was locked underneath "container",
      // in order to get the form to show we had to
      // switch the style display to block instead of none
      contain.style.display = 'block';

    const submitBtn =   document.querySelector(".submit")
    // we set the varible submitBtn to the class name = submit
    console.log(submitBtn)
    // we use addEventListener on toyForm because we want the form to be the event that is triggered.
    toyForm.addEventListener("submit", e =>
    { e.preventDefault()
      // prevents the page from loading
      // allows us to display the new toys
      newToy(e.target.name.value,e.target.image.value)
  } )

    } else {
      toyForm.style.display = 'none';
      contain.style.display = 'none';
    }

  });

  function newToy(toyName,toyImage){
    // creating a new toy object
    let formData = {
      name:  toyName,
      image:  toyImage,
      likes:  0
    }

    let obj = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys",obj)
  .then(res => res.json())
  .then(data  =>{
    console.log("data",data)}
  )
}

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
      div.id = toy.id
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

      p.innerText = `${toy.likes} likes `

      //instrucitons say to give button a classname
      // instructions set =  inner text => "Like <3"
      button.className = "like-btn"
      button.innerText = "Like <3"

      button.addEventListener("click", toyLikes )

      // also the same as adding event listener on the class button

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
      console.log("submit",e.target.value)
       let toyName = e.target.name.value
      let toyImage = e.target.image.value


      e.preventDefault()
       // steps
       //1 .get the post form fields and save it into varibales
       //2. we set it to the vaivbles to use it.
       //3. Create post request
        // request fetch form
       //4. rerender the Dom to show thw new
       // what does that mean to rerender??
      })

       function toyLikes(e){

         e.preventDefault()
         // we need to update the page
         //  following we need to update the objet on the database
         const p =  e.target.parentElement.children[2]
         // going to parent card element
         // grab the third child within <div>  Line: 159
           let toyPlus = parseInt(p.innerText) + 1
           // converst string value into integer which we need

           p.innerText = toyPlus  +  " likes"

           // replaces inner text on the page with new value

          const configObj = {

            // this fetch changes the database permanent
            // finds one element and changes the key(s) Line: 179
            method:"PATCH",
            headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify({
            // the property I want to express or modify from database
            likes: toyPlus
          })

       }
       fetch(`http://localhost:3000/toys/${e.target.parentElement.id}`,configObj)
         // this expresses where to go and what to do

           .then(resp => resp.json())

     }



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



// newToy()
// invoke = call a function wherever you want it to be called
// });
