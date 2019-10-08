// previously written
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false;

// YOUR CODE HERE
const collection = document.querySelector('#toy-collection');

// previously written
addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy

    if (addToy) {
        toyForm.style.display = 'block'
    } else {
        toyForm.style.display = 'none'
    }
});


// OR HERE!

// 1. make a GET request to the API to fetch all of the toys
function getToys() {
    return fetch("http://localhost:3000/toys")
        .then(response => response.json());
}

// 2. fetch a POST request to add a toy
function postToy(toyObj) {
    fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": toyObj.name.value,
            "image": toyObj.image.value,
            "likes": 0
        })
    })
    .then(res => res.json())
    .then((object) => {
        let toy = displayToy(object)
        collection.append(toy)
    })
}

function displayToy(object) {
    let h3 = document.createElement('h3');
    h3.textContent = object.name;

    let img = document.createElement('img');
    img.setAttribute('src', object.image);
    img.setAttribute('class', 'toy-avatar');

    let p = document.createElement('p');
    p.textContent = `${object.likes} likes`;

    let btn = document.createElement('button');
    btn.setAttribute('class', 'like-btn');
    btn.setAttribute('id', object.id);
    btn.textContent = "like";

    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset);
        likes(e)
    })

    let card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.append(h3, img, p, btn);
    collection.append(card);
}

function likes(e) {
    e.preventDefault()

    let more = parseInt(e.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": more
        })
    })
    .then(res => res.json())
    .then((like_obj => {
        e.target.previousElementSibling.innerText = `${more} likes`;
    }));
}

// 3. iterate over each property of the json object
// 4. display each toy inside of #toy-collection
getToys().then(toys => {
    toys.forEach(toy => {
        displayToy(toy)
    })
})
