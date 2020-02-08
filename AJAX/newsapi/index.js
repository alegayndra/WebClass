/*
    - Build up a form that will ask the user to tyoe a search term
    - Use the Top Headlines endpoint
    - Connect it to the news API and print on screen the following for every new in the responses
        - Title of the new
        - Author
        - Image
        - Description
    This API requires parameters
*/

let apikey = "78adee78cfe344268d476a3eb9981538";
let url = "";

function watchForm() {
    $("#newsForm").on("click", (event) => {
        event.preventDefault();

        let searchTerm = $("#searchTerm").val();

        if (searchTerm) {
            $.ajax({
                url: url,
                method: "GET",
                data: {
                    apikey: apikey;
                }, // info sent to the API
                dataType: "json", // returned type of the response
                ContentType: "application/json", // type of snet data in the request
                success: function(responseJSON){
                    console.log(responseJSON);
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    })
}

watchForm();