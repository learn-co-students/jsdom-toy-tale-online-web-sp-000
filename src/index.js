let addToy = false;
const addToyForm = document.querySelector(".add-toy-form");
const collectionDiv = document.getElementById("toy-collection");

addToyForm.addEventListener("submit", event => {
    event.preventDefault()
    postToy(event.target)
    document.getElementById("add-toy-form").reset();
})

document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container")
    
    addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
            toyFormContainer.style.display = "block";
            
        } else {
            toyFormContainer.style.display = "none";
        }
    });
    getToys()
})

function getToys(params) {
    const toys = "http://localhost:3000/toys"

    fetch(toys)
        .then(res => res.json())
        .then(toysObj => renderToys(toysObj))
 

}

// put this at the end of getToys?
function renderToys(toysObj) {    
    toysObj.forEach(toy => makeToyCard(toy));
}

function makeToyCard(toyObj) {
    toyCard = document.createElement("div");
        toyCard.setAttribute("class", "card");
    
        let h2 = document.createElement("h2")
        h2.innerText = toyObj.name

        let img = document.createElement("img")
        img.setAttribute("src", toyObj.image)
        img.setAttribute("class", "toy-avatar")

        let p = document.createElement("p")
        p.innerText = `${toyObj.likes} Likes`

        let btn = document.createElement("button")
        btn.setAttribute("class", "like-btn")
        btn.setAttribute("id", toyObj.id)
        btn.innerText = "Like"
        //add event listener
        btn.addEventListener("click", e => {
            incrementLikes(e)
        })

        toyCard.append(h2, img, p, btn)
        collectionDiv.appendChild(toyCard)
}

function postToy(toyData) {
    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "name": toyData.name.value,
            "image": toyData.image.value,
            "likes": 0
        })
    })
    .then(res => res.json())
    .then(newestToy => {
        makeToyCard(newestToy)
    })
    
}

function incrementLikes(e) {
    e.preventDefault()
    let newLikes = parseInt(e.target.previousElementSibling.innerText) + 1
    let url = `http://localhost:3000/toys/${e.target.id}`

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": newLikes
        })
    })
    .then(res => res.json())
    .then(object => {
        e.target.previousElementSibling.innerText = `${object.likes} Likes`
    })
}





































