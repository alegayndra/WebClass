let url = "/blog-posts"

let post = {
    id: "",
    title : "",
    content: "",
    author: "",
    publishDate: ""
}

function postMethod() {

    post.publishDate = new Date();

    let settings = {
        url: url ,
        method: "POST",
        data: JSON.stringify(post), // info sent to the API
        dataType: "JSON", // returned type of the response
        contentType: "application/json", // type of sent data in the request
        success: function(responseJSON){
            console.log("success", responseJSON);
            $(".form").hide();
            $(".posts").show();
        },
        error: function(err){
            console.log("err", err);
            // console.log($("#formError"))
            $("#formError").text(err.responseJSON.message);
            $("#formError").show();
        }
    }

    $.ajax(settings);

}

function putMethod() {
    let settings = {
        url: url + `/${post.id}`,
        method: "PUT",
        data: JSON.stringify(post), // info sent to the API
        dataType: "JSON", // returned type of the response
        contentType: "application/json", // type of sent data in the request
        success: function(responseJSON){
            console.log("success", responseJSON);
            $(".form").hide();
            $(".posts").show();
        },
        error: function(err){
            console.log("err", err);
            $("#formError").innerText(err.responseJSON.message);
            $("#formError").show();
        }
    }

    $.ajax(settings);

}

function deleteMethod() {
    let settings = {
        url: url + `/${post.id}`,
        method: "DELETE",
        dataType: "JSON", // returned type of the response
        contentType: "application/json", // type of sent data in the request
        success: function(responseJSON){
            console.log("success", responseJSON);
        },
        error: function(err){
            console.log(err);
        }
    }

    $.ajax(settings);

}

function getMethod() {
    let settings = {
        url: url,
        method: "GET",
        dataType: "json", // returned type of the response
        success: function(responseJSON){

            let list = $(".listOfPosts");
            list.html("");
    
            for (let i = 0; i < responseJSON.length; i++) {
                list.append(`
                    <div class="post">
                        <div class="title">${responseJSON[i].title}</div>
                        <div class="content">${responseJSON[i].content}</div>
                        <div class="author">${responseJSON[i].author}</div>
                        <div class="date">${responseJSON[i].publishDate}</div>
                        <div class="btns">
                            <button class="deleteBtn">DELETE</button>
                            <button class="putBtn">PUT</button>
                            <a class="id" hidden>${responseJSON[i].id}</a>
                        </div>
                    </div>
                `);
            }
    
            eventListeners();
            
        },
        error: function(err){
            console.log(err);
        }
    }

    $.ajax(settings);
}

function eventListeners() {
    // post -----------------------------------------------------------------

    $("#postBtn").on("click", (event) => {
        event.preventDefault();

        $(".posts").hide();
        $(".form").show();

        $("#titleForm").text("Create post");
        $("#btnForm").text("Create post");

        $("#formError").hide();

        post.title = "";
        post.content = "";
        post.author = "";
    })

    // delete -----------------------------------------------------------------

    $(".deleteBtn").on("click", (event) => {
        event.preventDefault();

        post.id = event.target.parentNode.querySelector(".id").innerText;

        deleteMethod();
        getMethod();

        // $(".listOfPosts").hide();
    })

    // put -----------------------------------------------------------------

    $(".putBtn").on("click", (event) => {
        event.preventDefault();

        $(".posts").hide();
        $(".form").show();

        $("#titleForm").text("Update post");
        $("#btnForm").text("Update post");

        let div = event.target.parentNode.parentNode;

        post.id = div.querySelector(".id").innerText;
        post.author = div.querySelector(".author").innerText;
        post.content = div.querySelector(".content").innerText;
        post.publishDate = div.querySelector(".date").innerText;
        post.title = div.querySelector(".title").innerText;

        $("#newTitle").val(post.title);
        $("#newContent").val(post.content);
        $("#newAuthor").val(post.author);
    })

    // form -----------------------------------------------------------------

    $("#btnForm").on("click", (event) => {
        event.preventDefault();

        post.title = $("#newTitle").val();
        post.content = $("#newContent").val();
        post.author = $("#newAuthor").val();

        $("#newTitle").val("");
        $("#newContent").val("");
        $("#newAuthor").val("");

        if($("#titleForm").text() == "Update post") {
            putMethod();
        } else {
            postMethod();
        }

        getMethod();
        
        $("#formError").hide();

    })

    $("#cancelBtnForm").on("click", (event) => {
        event.preventDefault();

        $("#newTitle").val("");
        $("#newContent").val("");
        $("#newAuthor").val("");

        $(".form").hide();
        $(".posts").show();

        $("#formError").hide();

    })
}

function init() {
    getMethod();
   
}

init();



