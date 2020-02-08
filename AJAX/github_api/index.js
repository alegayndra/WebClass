/*
    Using developer.github.com/v3

    1. Create a form that allows th user to type the username of a Github
    2. Conncet the search term with the API
    3. Load in the browser the list of repositories of that username and a link to the original repo.
*/


let url = "https://api.github.com/users/"

function watchForm() {
    $("#submitBtn").on("click", (event)=>{
        event.preventDefault();
        console.log("submit btn clicked");

        let searchTerm = $("#userName").val();

        if (searchTerm) {
            $.ajax({
                url: url + searchTerm + "/repos",
                method: "GET",
                data: {}, // info sent to the API
                dataType: "json", // returned type of the response
                ContentType: "application/json", // type of snet data in the request
                success: function(responseJSON){
                    console.log(responseJSON);
                    $(".results").html("");
                    for (let i = 0; i < responseJSON.length; i++) {
                        $(".results").append(`  <div class="user">
                                                    <div class="repo">
                                                        <div class="repoName">${responseJSON[i].name}</div>
                                                        <div class="link">Link: <a href="${responseJSON[i].html_url}">${responseJSON[i].html_url}<a></div>
                                                    </div>
                                                </div>`);
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