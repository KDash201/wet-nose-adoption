var searchFormEl = document.getElementById("search-form");
var dogResultsContainerEl = document.getElementById("dog-results")
var city = "";
var state = "";
var age = "";
var size = "";
var sex = "";
var accessToken 

var getToken = function() {
   var apiKey = "0SeVG0ZPvO61L2YkBzWM4OdAfGjG2u03blVa4J8oczVrTryOOe";
   var apiSecret = "EUWQpf8k1Spgp2OJtWE6csrGwFBGwpQfHskVz7fI";
   var apiUrl = 'https://api.petfinder.com/v2/animals?type=dog&location=' + city + '&location=' + state + '&age=' + age + '&size=' + size + '&gender=' + sex + "&sort=random";
  
   fetch('https://api.petfinder.com/v2/oauth2/token', {method: 'POST',                                                           
 headers: {
      'Content-Type': 'application/json'
    },
body: JSON.stringify({grant_type: 'client_credentials',
                      client_id:apiKey,
                      client_secret: apiSecret})                                         
                    }).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('data', data);
    accessToken = data.access_token;
    return accessToken;
  })

    .then(function(accessToken) {
      fetch(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
        
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        var animals = data.animals;
        loopAndRenderAnimalsOnPage(animals);
      })

 
  

}).catch(function(err) {
    console.log('err', err);
  });
};

function loopAndRenderAnimalsOnPage(animals) {
  console.log('animals', animals);
  for (var i = 0; i < animals.length; i++) {
    
    // create card for dog results
    var cardContainerEl = document.createElement("div");
    cardContainerEl.className = "card col-6";
    dogResultsContainerEl.appendChild(cardContainerEl);

    // add image to card
    
    var cardImageEl = document.createElement("img");
    cardImageEl.className = "card-img-top";
    if (animals[i].primary_photo_cropped){
    cardImageEl.setAttribute("src", animals[i].primary_photo_cropped.small);
    cardImageEl.setAttribute('alt', "dog profile picture");
    } else {
      cardImageEl.setAttribute("src", "./assets/images/dog-placeholder.png")
    }
    cardContainerEl.appendChild(cardImageEl);
   
    
    // add body to card
    var cardBodyEl = document.createElement("div");
    cardBodyEl.className = "card-body";
    cardContainerEl.appendChild(cardBodyEl);

    // add title to card
    var cardTitleEl = document.createElement("h5");
    cardTitleEl.className = "card-title";
    cardTitleEl.textContent = animals[i].name;
    cardBodyEl.appendChild(cardTitleEl);

    // add some data to card
    var dataListEL = document.createElement("ul");
    dataListEL.className = "list-group list-group-flush "
    cardBodyEl.appendChild(dataListEL);

    var dataListBreedEl = document.createElement("li");
    dataListBreedEl.className = "list-group-item";
    dataListBreedEl.textContent = "Breed: " + animals[i].breeds.primary;
    dataListEL.appendChild(dataListBreedEl);

    var dataListStatusEl = document.createElement("li");
    dataListStatusEl.className = "list-group-item";
    dataListStatusEl.textContent = "Status: " + animals[i].status;
    dataListEL.appendChild(dataListStatusEl);

    var dataListDistanceEl = document.createElement("li");
    dataListDistanceEl.className = "list-group-item";
    dataListDistanceEl.textContent = Math.trunc(animals[i].distance) + " Miles Away";
    dataListEL.appendChild(dataListDistanceEl);

    var phoneNumberLinkEl = document.createElement("a");
    phoneNumberLinkEl.className = "list-group-item"
    phoneNumberLinkEl.setAttribute("href", "tel:" + animals[i].contact.phone);
    phoneNumberLinkEl.textContent = "Phone: " + animals[i].contact.phone;
    dataListEL.appendChild(phoneNumberLinkEl);

    // dogs petfinder link for full description
    var linkButtonEl = document.createElement("a");
    linkButtonEl.className = "btn btn-primary";
    linkButtonEl.setAttribute("href", animals[i].url);
    linkButtonEl.setAttribute("target", "_blank");
    linkButtonEl.setAttribute("rel", "noreferrer noopener")
    linkButtonEl.textContent = "See My Full Profile";
    cardBodyEl.appendChild(linkButtonEl);

  }
}

function dogBreeds() {
    var apiUrl = "https://dog.ceo/api/breeds/image/random"

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                })
            }
        })
    }

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // gets searched city value
    var searchedCityEl = document.getElementById("city");
    var searchedCity = searchedCityEl.value.trim();
    city = searchedCity;

    // gets searched state value
    var searchedStateEl = document.getElementById("state");
    var searchedState = searchedStateEl.value.trim();
    state = searchedState;

    // gets selected age
    var searchedAgeEL = document.getElementById("age");
    var searchedAge = searchedAgeEL.value;
    age = searchedAge;

    // gets selected size
    var searchedSizeEl = document.getElementById("size");
    var searchedSize = searchedSizeEl.value;
    size = searchedSize;

    // gets sex value
    var maleRadioEL = document.getElementById("male")
    var femaleRadioEl = document.getElementById("female")
    
    if (maleRadioEL.checked) {
      sex = maleRadioEL.value
    } else if (femaleRadioEl.checked) {
      sex = femaleRadioEl.value
    }

    // clears form
    if (city, state, age, size, sex) {
      searchedCityEl.value = "";
      searchedStateEl.value = "";
      searchedAgeEL.value = "placeholder";
      searchedSizeEl.value = "placeholer";
      maleRadioEL.checked = false;
      femaleRadioEl.checked = false;
      dogResultsContainerEl.innerHTML = ""
      getToken();
   }
}

searchFormEl.addEventListener("submit", formSubmitHandler);

dogBreeds()

