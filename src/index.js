let addToy = false;

function submitData( name, url ) {
  return fetch( 'http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        "name": name,
        "image": url,
        "likes": 0
      } )
    } )
    .then( function ( response ) {
      return response.json()
    } )
    .then( function ( object ) {
      fetchToys(); //can get last instead
    } )
    .catch( function ( error ) {
      //document.body.innerHTML = error.message
    } );
}

function fetchToys() {//load all toys
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json));
}

function modifyToy(toy, toyLikes) { //todo error here
  let toyDiv = document.getElementById(`toy_${toy.id}`);
  if (parseInt(toy.likes) == 1){
    toyDiv.querySelector('p').innerText = `${toy.likes} Like`;
  } else {
    toyDiv.querySelector('p').innerText = `${toy.likes} Likes`;
  }
  /*let toyButton = toyDiv.querySelector('button').style;
  toyButton.backgroundColor = "whitesmoke";
  toyButton.border = "#e04b52 solid 1px";
  toyButton.color = "#e04b52";*/

}

function createLiker(div, toy){

  div.querySelector('button').addEventListener('click',function(e){
    patchData(toy);
    const collectionReset = document.getElementById('toy-collection');
    //collectionReset.innerHTML = '';
    //e.preventDefault();
  });

}


function renderToys(json) {
  const addToMe = document.getElementById('toy-collection');
  let toys = [];

  for (let toy of json){
  //json.forEach(toy => {
    const div = document.createElement('div');
    div.class = 'card';
    div.id = `toy_${toy.id}`;
    let pString = ``;
    if (toy.likes){
      pString = ``;
    } else {
      pString = ``;
    }
    div.innerHTML =
      `<h2>${toy.name}</h2>
      <img class="toy-avatar" src=${"\"" + toy.image + "\""} />
      <p>${pString} Likes</p><button class="like-btn">Like</button>
      `;

    createLiker(div, toy);
    toys.push(div);
  }

  for (const element of toys){
    addToMe.appendChild(element);
  }

}

function patchData( toy ) {

  toy.likes = parseInt(toy.likes, 10) + 1;

  return fetch( `http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        "likes": toy.likes
      } )
    } )
    .then( function ( response ) {
      return response.json()
    } )
    .then( function ( object ) {
      //fetchToys(); //can modify instead
      modifyToy(toy, toy.likes);
    } )
    .catch( function ( error ) {
      console.log(error.message);
    } );
}

function showLiked(id){//when?
  toyLike = document.getElementById(`toy_${id}`);
  toyLike.getElementsByClassName('like-btn')[0].onclick = function(){
    this.style.backgroundColor = "whitesmoke";
    this.style.border = "#e04b52 solid 1px";
    this.style.color = "#e04b52";

    e.preventDefault();
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');

  addBtn.addEventListener('click', () => {
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }

  });

  document.getElementsByClassName("add-toy-form")[0].addEventListener("submit",function(e){
    const collectionReset = document.getElementById('toy-collection');
    collectionReset.innerHTML = '';
    submitData(document.getElementsByClassName("input-text")[0].value,
      document.getElementsByClassName("input-text")[1].value);//fetches toys again
    e.preventDefault();
  });

  fetchToys(); //do when page loads
});
