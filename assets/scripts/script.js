var searchFormEl = document.getElementById("search-form");
var city = "";
var state = "";
var age = "";
var size = "";
var sex = "";
var accessToken 

var getToken = function() {
   var apiKey = "0SeVG0ZPvO61L2YkBzWM4OdAfGjG2u03blVa4J8oczVrTryOOe";
   var apiSecret = "EUWQpf8k1Spgp2OJtWE6csrGwFBGwpQfHskVz7fI";
   var apiUrl = 'https://api.petfinder.com/v2/animals?type=dog&location=' + city + ', ' + state + '&age=' + age + '&size=' + size + '&gender=' + sex;
  
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
    console.log(animals[i].name + ': ' + animals[i].breeds.primary);
    
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
      getToken();
   }
}

searchFormEl.addEventListener("submit", formSubmitHandler);

dogBreeds()

