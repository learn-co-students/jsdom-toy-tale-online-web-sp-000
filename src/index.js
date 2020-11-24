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
    let destUrl = "http://localhost:3000/toys";
    const submitBtn = document.querySelector(".submit");
    const toyForm = document.querySelector(".add-toy-form");
    const likeBtn = document.querySelector(".like-btn");
    // Make a 'GET' request to fetch all the toy objects
    fetch(destUrl)
        .then(response => response.json())
        .then(json => addToys(json));

    // Send POST request using fetch, adding new toy to collection
    submitBtn.addEventListener("click", function(event) {
        let nameInput = toyForm[0].value;
        let imgInput = toyForm[1].value;

        let toyData = {
            name: `${nameInput}`,
            image: `${imgInput}`,
            likes: 0
        };
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(toyData)
        };
        fetch(destUrl, configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(toyObj) {
                // Add new toy object
                addToys(toyObj);
            })
            .catch(function(error) {
                console.log(error.message);
            });
    });
    // When user clicks on like button add likes to toy
    // likeBtn.addEventListener("click", () => {

    // });
});

function addToys(json) {
    const toyCollection = document.querySelector("#toy-collection");
    json.forEach(toy => {
        const card = document.createElement("div");
        addToyInfo(card, toy);
        toyCollection.appendChild(card);
    })
}

function addToyInfo(card, toy) {
    card.className = "card";
    card.dataset.id = toy.id;
    card.innerHTML = `<h2>${toy.name}</h2>`;
    card.innerHTML += `<img src="${toy.image}" class="toy-avatar">`;
    card.innerHTML += `<p>${toy.likes} Likes </p>`;
    card.innerHTML += `<button class="like-btn">Like <3</button>`;
}