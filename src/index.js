let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn"),
  toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
			const addToyForm = document.querySelector(".add-toy-form")
			addToyForm.addEventListener("submit", function(event) {
				event.preventDefault();
				const name = addToyForm.querySelector('input[name="name"]').value,
				image = addToyForm.querySelector('input[name="image"]').value;
				submitForm(name, image);
				addToyForm.reset();
			})
    } else {
      toyFormContainer.style.display = "none";
    }
  });

	loadToys();
});

function loadToys() {
	return fetch("http://localhost:3000/toys")
	.then(resp => resp.json())
	.then(toys => {
		toys.forEach(toy => addToyInfo(toy))
	})
}

function addToyInfo(toy) {
	const toyCollection = document.querySelector("#toy-collection"),
	div = document.createElement("div"),
	h2 = document.createElement("h2"),
	img = document.createElement("img"),
	p = document.createElement("p"),
	btn = document.createElement("button");

	div.dataset.id = toy["id"];
	div.className = "card";
	h2.innerHTML = toy["name"];
	img.className = "toy-avatar";
	img.src = toy["image"];
	p.innerHTML = `${toy["likes"]} Likes`;
	btn.className = "like-btn";
	btn.innerHTML = "Like <3"
	btn.addEventListener("click", likeToy);
	div.appendChild(h2);
	div.appendChild(img);
	div.appendChild(p);
	div.appendChild(btn);
	toyCollection.appendChild(div);
}

function submitForm(name, image) {
	let formData = {
		name: name,
		image: image,
		likes: 0
	}

	let configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(formData)
	};

	fetch("http://localhost:3000/toys", configObj)
	.then(resp => resp.json())
	.then(object => addToyInfo(object))
}

function likeToy(event) {
	const id = parseInt(event.target.parentElement.dataset.id);
	let likesCount = event.target.parentElement.querySelector("p"),
	num = parseInt(likesCount.innerText);
	num += 1
	likesCount.innerText = `${num} Likes`;

	let formData = {
		likes: num
	}

	let configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(formData)
	}

	return fetch(`http://localhost:3000/toys/${id}`, configObj)
}
