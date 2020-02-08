let count = 1;

$("#clickBtn").on("click", function (e) {
    e.preventDefault();
    $(".list").append(`<li class="new"> 
                        click # ${count} 
                        </li>`);
    count++;
});

$(".list").on("click", ".new", function(e) {
    e.preventDefault();
    console.log("clicked new li");
})

/*
    ajax (pure js)

    fetch (url, settings);
    .then (response, function(params) {
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