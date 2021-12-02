
function getDogs(type) {
    
    var key = ""
    var apiUrl = "https://api.petfinder.com/v2/animals?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIwU2VWRzBaUHZPNjFMMllrQnpXTTRPZEFmR2pHMnUwM2JsVmE0SjhvY3pWclRyeU9PZSIsImp0aSI6Ijc3YmNkNTk1MmRmYTVmYjkxZWVjZjQ3YThlYzFiMDI2Y2ViNDI0Y2ZlYjgyZmNjMjE2NGViNzY0MWFkZmVjMjA0YTVhMWI3ZDkwMWVhZWQ3IiwiaWF0IjoxNjM4NDEyNTc1LCJuYmYiOjE2Mzg0MTI1NzUsImV4cCI6MTYzODQxNjE3NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.uDTcCc0GekTzCdLYhL5SUfRWYFx4isiRkzmzFfZreIzAuj2BDrrhCKYVhwyJjvBvjiguQhuViLcfjGmI9H8VOw5fAST0GcJG4G8Hjuh8zXYUUP41nlmvWXVuwlv-eyWlERnt7oQDSR8rzAbWmtoWSCzCGpuIlulJQrflbJK_0PwOaz7LK40D3-l7HDYR7b5MoZGkznPHtheeASU91dZu71r61LL6KGA_fCAit15YpzqttirV_ftA6SNFF2WTXw7k441nziWXrSJvhsuy2sbI-jrKGsqYVCRnMgmnvmkSzzWvggJQT3rILN09VxrVPzTOXvDryxnBrIQvaj10FGzNrA"
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)

                if (response.headers.get("Link")) {
                    console.log("bad")
                }
            })
        }
    })
    .then(function(data) {
        console.log(data)
    })
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

getDogs("animals")