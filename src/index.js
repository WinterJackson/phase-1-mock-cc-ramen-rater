// Fetch data from the server and display the ramen menu
function fetchRamenData() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      displayRamenMenu(data);
    })
    .catch(error => {
      console.error('Error fetching ramen data:', error);
    });
}

// Display the ramen menu
function displayRamenMenu(ramenArray) {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramenArray.forEach(ramen => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.setAttribute('ramen-id', ramen.id);
    img.addEventListener('click', handleShowDetail);
    ramenMenu.appendChild(img);
  });
}

// Display ramen details
function handleShowDetail(event) {
  const ramenId = event.target.getAttribute('ramen-id');

  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(data => {
      displayRamenDetail(data);
    })
    .catch(error => {
      console.error('Error fetching ramen details:', error);
    });
}

function displayRamenDetail(ramen) {
  const detailImage = document.querySelector('.detail-image');
  const nameElement = document.querySelector('.name');
  const restaurantElement = document.querySelector('.restaurant');
  const ratingElement = document.querySelector('#rating-display');
  const commentElement = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingElement.textContent = ramen.rating;
  commentElement.textContent = ramen.comment;
}

// Add new ramen entry
const form = document.getElementById('new-ramen');
form.addEventListener('submit', event => {
  event.preventDefault();

  const nameInput = document.getElementById('new-name');
  const restaurantInput = document.getElementById('new-restaurant');
  const imageInput = document.getElementById('new-image');
  const ratingInput = document.getElementById('new-rating');
  const commentInput = document.getElementById('new-comment');

  const newRamen = {
    name: nameInput.value,
    restaurant: restaurantInput.value,
    image: imageInput.value,
    rating: ratingInput.value,
    comment: commentInput.value
  };

  // Send POST request to add new ramen entry to the server
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newRamen)
  })
    .then(response => response.json())
    .then(data => {
      displayNewRamen(data);
    })
    .catch(error => {
      console.error('Error adding new ramen:', error);
    });

  form.reset();
});

// Display the new ramen in the menu
function displayNewRamen(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.setAttribute('ramen-id', ramen.id);
  img.addEventListener('click', handleShowDetail);
  ramenMenu.appendChild(img);
}

// Fetch the ramen data when the page loads
fetchRamenData();
