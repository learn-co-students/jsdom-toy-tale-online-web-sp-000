const fetchToys = function() {fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => generateToys(toyData));}

function generateToys(toyData) {
    const toyCollection = document.getElementById("toy-collection");

    for (const toy of toyData) {
      const toyCard = document.createElement("div");
      toyCard.className = "card";
      const toyName = document.createElement("h2");
      toyName.innerText = toy.name;
      toyCard.appendChild(toyName);
      const toyImage = document.createElement("img");
      toyImage.innerHTML = `src="${toy.name}" class="toy-avatar"`
      const toyLikes = document.createElement("p");
      toyLikes.innerText = toy.likes
      const toyLikeButton = document.createElement("button");
      toyLikeButton.className = "like-btn";
      toyLikeButton.addEventListener("click", {(parseInt(this.likes)++).toString()});
      toyCollection.appendChild(toyCard);
    }
}
