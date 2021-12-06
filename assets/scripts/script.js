var accessToken 

var getToken = function() {
   var apiKey = "0SeVG0ZPvO61L2YkBzWM4OdAfGjG2u03blVa4J8oczVrTryOOe";
   var apiSecret = "EUWQpf8k1Spgp2OJtWE6csrGwFBGwpQfHskVz7fI";
  
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
      fetch('https://api.petfinder.com/v2/animals', {
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



dogBreeds()

getToken();