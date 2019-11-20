let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


  fetch('http://localhost:3000/toys')
    .then(response=>response.json())
    .then(json=>{
      json.forEach(toys)
      function toys(item,index){
        let card=document.createElement('div');
        document.querySelector('#toy-collection').appendChild(card)
        card.className="card"
        let name=document.createElement('h2');
        document.querySelectorAll('#toy-collection .card')[index].appendChild(name)
        name.innerText=item.name
        let image=document.createElement('img');
        document.querySelectorAll('#toy-collection .card')[index].appendChild(image)
        image.src=item.image
        image.className='toy-avatar'
        let likes=document.createElement('p');
        document.querySelectorAll('#toy-collection .card')[index].appendChild(likes)
        likes.innerText=item.likes
        let btn=document.createElement('button');
        document.querySelectorAll('#toy-collection .card')[index].appendChild(btn)
        btn.className='like-btn'
        btn.innerText='like'

        btn.addEventListener('click',function (e) {
          likes.innerText=1+parseInt(likes.innerText)
        })

      }
    })

    const addForm=document.forms[0]
    addForm.addEventListener('submit',function (e) {
      e.preventDefault();
      let name=document.querySelector('input[name="name"]').value;
      let image=document.querySelector('input[name="image"]').value;

      let formData = {
        name: name,
        image: image,
        likes:0
      };
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch("http://localhost:3000/toys", configObj)
    })


})
