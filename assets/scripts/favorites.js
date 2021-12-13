var favoriteContainerEl = document.getElementById("favorite-container");
var randomImageContainerEl = document.getElementById("random-image-container");
var randomPups = [];

function loadFavorites() {
  var favoritePups = JSON.parse(localStorage.getItem("Favorite Pups"));

  for (var i = 0; i < favoritePups.length; i++) {
    console.log(favoritePups[i].name);

    // creates card
    var cardEl = document.createElement("div");
    cardEl.className = "card";
    favoriteContainerEl.appendChild(cardEl);

    // creates card body
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    cardEl.appendChild(cardBodyEl);

    // adds name to card
    var titleEl = document.createElement("h5");
    titleEl.textContent = favoritePups[i].name;
    titleEl.className = "card-title";
    cardEl.appendChild(titleEl);

    // creates ul for content
    var ulListEl = document.createElement("ul");
    ulListEl.className = "list-group list-group-flush";
    cardEl.appendChild(ulListEl);

    // creates list items with content
    var breedEl = document.createElement("li");
    breedEl.className = "list-group-item";
    breedEl.textContent = favoritePups[i].breed;
    ulListEl.appendChild(breedEl);

    var statusEl = document.createElement("li");
    statusEl.className = "list-group-item";
    statusEl.textContent = favoritePups[i].status;
    ulListEl.appendChild(statusEl);

    var locationEl = document.createElement("li");
    locationEl.className = "list-group-item";
    locationEl.textContent = favoritePups[i].distance;
    ulListEl.appendChild(locationEl);

    var phoneEl = document.createElement("a");
    phoneEl.className = "list-group-item";
    phoneEl.textContent = favoritePups[i].phone;
    var phoneNumber = favoritePups[i].phone.slice(7);
    phoneEl.setAttribute("href", "tel:" + phoneNumber);
    ulListEl.appendChild(phoneEl);

    // creates link to dogs petfinder page
    var urlEl = document.createElement("a");
    urlEl.className = "btn btn-primary";
    urlEl.setAttribute("href", favoritePups[i].url);
    urlEl.setAttribute("target", "_blank");
    urlEl.setAttribute("rel", "noreferrer noopener");
    urlEl.textContent = "See My Full Profile";
    cardEl.appendChild(urlEl);
  }
}

// gets random 3 images from dog api and pushes the image to a empty array
function dogImages() {
  var apiUrl = "https://dog.ceo/api/breeds/image/random";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var randomImageEl = document.createElement("img");
        randomImageEl.className = "d-block w-50";
        randomImageEl.setAttribute("src", data.message);
        randomImageEl.setAttribute("alt", "random dog image");
        randomImageContainerEl.appendChild(randomImageEl);
      });
    }
  });
}

loadFavorites();
dogImages();
