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
let url = "https://newsapi.org/v2/everything?";

function newsArticle(article) {
    const { title, description, url, urlToImage, publishedAt, content, author } = article;
    console.log(urlToImage);
    return `<div >
        <h1>${title}</h1>
        <h3>${author}</h3>
        <p>${description}</p>
        <p>${publishedAt}</p>
        <p>${content}</p>
        <a href="${url}" >${url}</a>
        ${urlToImage ? `<img src="${urlToImage}" width="400px" height="auto" />` : ""}
    </div>`;
}

function watchForm() {
    $("#enviar").on("click", (event) => {
        event.preventDefault();

        let searchTerm = $("#searchTerm").val();

        console.log(url);
        console.log(apikey);
        console.log(searchTerm);

        if (searchTerm) {
            $.ajax({
                url: `${url}q=${searchTerm}&apiKey=${apikey}`,
                method: "GET",
                // data: {
                //     apikey: apikey
                // }, // info sent to the API
                dataType: "json", // returned type of the response
                ContentType: "application/json", // type of snet data in the request
                success: function(responseJSON){
                    console.log(responseJSON);
                    const articles = responseJSON.articles || [];
                    articles.forEach(article => {
                        $(".results").append(newsArticle(article));
                    })
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    })
}

watchForm();