let dogUrl = "https://dog.ceo/api/breeds/image/random";
let settings = {
    url: dogUrl,
    method: "GET",
    data: {}, // info sent to the API
    dataType: "json", // returned type of the response
    ContentType: "application/json", // type of snet data in the request
    success: function(responseJSON){
        console.log(responseJSON);
        $(".results").append(`<img src=${responseJSON.message} />`);
    },
    error: function(err){
        console.log(err);
    }
}

function watchForm() {
    $("#dogForm").on("submit", function(event) {
        event.preventDefault();
        
        // fetch(url)
        //     .then(function(response) {
        //         console.log(response);
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw new Error("Something went wrong");
        //     })
        //     .then( function(responseJSON) {
        //         console.log(responseJSON);
        //         $(".results").append(`<img src=${responseJSON.message} />`);
        //     })
        //     .catch(function(err) {
        //         console.log(err);
        //     });

        $.ajax(settings);
    })
}



/*
    ajax (pure js)

    fetch (url, settings)
    .then (function(response) {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText + "Something went wrong");
    })
    .then (response.JSON, function() {
        // logic to get info
    })
    .catch(err, function() {
        console.log(err);
    })
*/

watchForm();