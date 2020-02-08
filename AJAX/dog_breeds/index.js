/**
 * Using the Dof CEO API
 * 
 *  - Build up a form that asks for a dog breed and a number
 *  - Connect this information with the api finding the corresponding endpoint
 *  - The number represents how many images to retrieve for the given breed
 *  - Load on the screen the images
 */

// Ask for breeds

// Ask for images

let urlDogCEOAPI = "https://dog.ceo/api" 

let endpointListOfBreeds = "/breeds/list"; // https://dog.ceo/api/breeds/list/all


let settingsListBreeds = {
    url: urlDogCEOAPI,
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

function getListOfBreeds() {

    $.ajax({
        url: urlDogCEOAPI + endpointListOfBreeds,
        method: "GET",
        data: {}, // info sent to the API
        dataType: "json", // returned type of the response
        ContentType: "application/json", // type of snet data in the request
        success: function(responseJSON){
            console.log(responseJSON);
            for (let i = 0; i < responseJSON.message.length; i++) {
                $("#breed").append(`<option val="${responseJSON.message[i]}">
                                        ${responseJSON.message[i]}
                                    </option>`);
                
            }
            
        },
        error: function(err){
            console.log(err);
        }
    });
}

getListOfBreeds();

function watchForm() {
    $("#dogForm").on("submit", function(event) {
        event.preventDefault();

        let endpointBreedImages = "/breed/";

        let numberOfImgs = $("#number").val();
        let breed = $("#breed").val();

        if(breed && numberOfImgs) {
            $.ajax({
                url: urlDogCEOAPI + endpointBreedImages + breed + "/images/random/" + numberOfImgs,
                method: "GET",
                data: {}, // info sent to the API
                dataType: "json", // returned type of the response
                ContentType: "application/json", // type of snet data in the request
                success: function(responseJSON){
                    console.log(responseJSON);
                    for (let i = 0; i < responseJSON.message.length; i++) {
                        // console.log(responseJSON.message[i]);
                        $(".results").append(`<img src=${responseJSON.message[i]} />`);
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }

        
    });

    

}

watchForm();

