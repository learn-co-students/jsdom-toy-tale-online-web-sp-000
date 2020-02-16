let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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

let configObject = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	},
	body: JSON.stringify({
		name: "Jessie",
		image:
			"https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
		likes: 0
	})
};

fetch("http://localhost:3000/toys", configObject)
	.then(function(response) {
		return response.json();
	})
	.then(function(object) {
		console.log(object);
	})
	.catch(function(error) {
		alert("Bad things! Ragnarők!");
		console.log(error.message);
	});

let configObject = {
	method: "PATCH",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	},
	body: JSON.stringify({
	likes: 0
	})
};

fetch("http://localhost:3000/toys/:id", configObject)
	.then(function(response) {
		return response.json();
	})
	.then(function(object) {
		console.log(object);
	})
	.catch(function(error) {
		alert("Bad things! Ragnarők!");
		console.log(error.message);
	});