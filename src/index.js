let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    getToys();
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");

    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyForm.style.display = "block";

        } else {
            toyForm.style.display = "none";
        }
    })


    toyForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = event.target

        let configObj = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "name": formData.name.value,
                "image": formData.image.value,
                "likes": 0
            })

        };

        fetch("http://localhost:3000/toys", configObj)
            .then(function(response) {
                return response.json();
            })
            .then(function(object) {
                toyForm.style.display = "none";
                createToy(object)
            })
    })
})

function getToys() {
    return fetch('http://localhost:3000/toys')
        .then(res => res.json())
        .then(json => createToys(json))

}


function createToys(toys) {
    c = document.querySelector("#toy-collection")
    toys.forEach(toy => {
        createToy(toy)
    })
}


function createToy(toy) {
    d = document.createElement("div");
    d.className = "card";

    h2 = document.createElement("h2");
    h2.innerText = toy.name;

    img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";



    button = document.createElement("button");
    button.innerText = "Like";
    button.className = "like-btn";

    p = document.createElement("p");
    p.innerText = toy.likes;

    d.appendChild(h2);
    d.appendChild(img);
    d.appendChild(p);
    d.appendChild(button);

    button.addEventListener("click", event => {
        event.preventDefault();
        updateToy(toy);
        let newnode = document.createElement("p");
        event.target.previousElementSibling.innerText = `${parseInt(toy.likes)+1}`
    })


    c.appendChild(d)
}

function updateToy(toy) {
    let updateObj = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": `${parseInt(toy.likes)+1}`
        })

    };
    fetch(`http://localhost:3000/toys/${toy.id}`, updateObj);
}