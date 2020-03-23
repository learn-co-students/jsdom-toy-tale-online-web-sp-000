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
    });
});

function getToys() {
    return fetch('http://localhost:3000/toys')
        .then(res => res.json())
        .then(json => createToys(json))
}


function createToys(toys) {
    c = document.querySelector("#toy-collection")
    toys.forEach(toy => {
        d = document.createElement("div");
        d.className = "card";

        h2 = document.createElement("h2")
        h2.innerText = toy.name;

        img = document.createElement("img")
        img.src = toy.image
        img.className = "toy-avatar"

        p = document.createElement("p")
        p.innerText = toy.likes

        button = document.createElement("button")
        button.innerText = "Like"
        button.className = "like-btn"


        d.appendChild(h2)
        d.appendChild(img)
        d.appendChild(p)
        d.appendChild(button)

        c.appendChild(d)
    })
}