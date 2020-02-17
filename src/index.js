let addToy = false
let toyCollection
let addBtn
let toyForm

document.addEventListener("DOMContentLoaded", () => {
	addBtn = document.querySelector("#new-toy-btn")
	toyForm = document.querySelector(".container")
	toyCollection = document.getElementById('toy-collection')

	addBtn.addEventListener("click", () => {
		addToy = !addToy
		if (addToy) {
			toyForm.style.display = "block"
			toyForm.addEventListener('submit', event => {
				console.log(event.target)
				event.preventDefault()
				postToy(event.target)
			})
		} else {
			toyForm.style.display = "none"
		}
	})
})

const getToys = () => {
	return fetch('http://localhost:3000/toys')
		.then(response => response.json())
}

getToys().then(toys => {
	toys.forEach(toy => {
		renderToys(toy)
	})
})

const renderToys = (toy) => {
	console.log(toyCollection)
	console.log(toy)
	const toyCard = `
		<div class="card">
			<h2>${toy.name}</h2>
			<img class="toy-avatar" src="${toy.image}"/>
			<p>${toy.likes} Likes</p>
			<button id="${toy.id}" class="like-btn" onclick="likes(event)">Like <3</button>
		</div>
	`
	toyCollection.insertAdjacentHTML('afterend', toyCard)
}

const likes = (event) => {
	event.preventDefault()
	const likeValue = event.srcElement.previousElementSibling.innerText.split(" ")[0]
	const newValue = Number(likeValue) + 1
	console.log(newValue)

	fetch(`http://localhost:3000/toys/${event.srcElement.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			likes: newValue
		})
	})
		.then(result => {
			console.log(result.json())
			result.json()
		})
		.then((likeObj => {
			e.srcElement.previousElementSibling.innerText = `${newValue} likes`
		}))
}

const postToy = (toy) => {
	fetch('http://localhost:3000/toys', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			name: toy.name.value,
			image: toy.image.value,
			likes: 0
		})
	})
		.then(result => result.json())
		.then((toyObj) => {
			let newToy = renderToys(toyObj)
			toyCollection.append(newToy)
		})
}