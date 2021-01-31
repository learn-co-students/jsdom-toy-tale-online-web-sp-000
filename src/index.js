let addToy = false;

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
  
  
  function jStringy(n, i, l) {
  let stringy = {
    name: n,
    image: i,
    likes: l
  }
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      Content-Type: application/json,
      Accept: application/json
    }
    body: JSON.stringify(stringy)

  })
  .then(resp => resp.json())
  .then(object => {
    for (let i of object) {
      console.log(i)
      document.getElementById('toy-collection').innerHTML = `<div class="card">
      <h2>${i['name']}</h2>
        <div class="toy-avatar>
        <img src="${i['image']}"></a>
        </div>
        <p>${i['likes']}</p>
        <button class="like-btn">Like</button>`
    }

  })
});
}