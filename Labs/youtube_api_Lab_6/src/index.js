let apiKey = "AIzaSyBQvKgojQbsIkZzYAZF1OT0UUAdAVMN4NQ";
let urlYoutube = "https://www.googleapis.com/youtube/v3/search/";
let prevP;
let nextP;

let settings = {
    url: urlYoutube,
    method: "GET",
    data: {
        key: apiKey,
        part: "id,snippet",
        maxResults: 10,
        q: "",
        pageToken: ""
    }, // info sent to the API
    dataType: "json", // returned type of the response
    ContentType: "application/json", // type of snet data in the request
    success: function(responseJSON){
        $(".results").html("");
        for (let i = 0; i < responseJSON.items.length; i++) {
            $(".results").append(`
            <div class="video">
                <a href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}" target="_blank">
                    <div class="Title"> 
                        ${responseJSON.items[i].snippet.title}
                    </div>
                    <img href="https://www.youtube.com/watch?v=${responseJSON.items[i].id.videoId}" src="${responseJSON.items[i].snippet.thumbnails.medium.url}">
                </a>
            </div>`);
        }
        checkButtons(responseJSON);
        
    },
    error: function(err){
        console.log(err);
    }
}

function checkButtons(response) {
    // checking if there's a previous page
    if (response.prevPageToken == null) {
        $("#prevPageBtn").hide(); 
        $("#prevPageBtn").attr("display", "none");
    } else {
        $("#prevPageBtn").show();
        $("#prevPageBtn").attr("display", "");
        prevP = response.prevPageToken;
    }

    // checking if there's a next page
    if (response.nextPageToken == null) {
        $("#nextPageBtn").hide();
        $("#nextPageBtn").attr("display", "none");
    } else {
        $("#nextPageBtn").show();
        $("#nextPageBtn").attr("display", "");
        nextP = response.nextPageToken;
    }
}

function watchForm() {
    $("#submitBtn").on("click", (event)=>{
        event.preventDefault();

        let searchTerm = $("#searchTerm").val();

        settings.data.q = searchTerm;

        if (searchTerm) {
            $.ajax(settings);
        }
    });

    $("#prevPageBtn").on("click", (event) => {
        event.preventDefault();
        
        settings.data.pageToken = prevP;

        if (searchTerm) {
            $.ajax(settings);
        }
    })

    $("#nextPageBtn").on("click", (event) => {
        event.preventDefault();
        
        settings.data.pageToken = nextP;

        if (searchTerm) {
            $.ajax(settings);
        }
    })
}


watchForm();