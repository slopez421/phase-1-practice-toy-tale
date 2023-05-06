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
});

//Event Listener

document.querySelector(".add-toy-form").addEventListener('submit', handleSubmit)
//handle submit toy

function handleSubmit(event) {
  event.preventDefault()
  let toyObj = {
    name: event.target.name.value,
    image:event.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  addNewToy(toyObj)

}

//DOM Render Functions
function renderOneToy(toy){
  // Build Toy
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">
  <p>
  <span class= "like-btn" id="${toy.id}">${toy.likes}</span> likes
  </p>
  <div class="button">
    <button>Like ❤️</button
    </div>
  `

  card.querySelector(".button").addEventListener('click', () => {
    toy.likes+= 1
    card.querySelector('span').textContent = toy.likes
     updateLikes(toy)
  })

  // Add toy to the DOM
  document.querySelector("#toy-collection").appendChild(card)
}

//Fetch Request
function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
    //console.log(toyData)
}

function addNewToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function  updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

getAllToys()

//get data and render toys to the DOM
function initialize() {
//toys.forEach(toy => renderOneToy(toy))
}

initialize()
