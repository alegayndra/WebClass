function watchForm() {
    $(".thumbnail").on("click", function(event) {
        event.preventDefault();

        let selectedThumbnail = $(this);

        let hero = $(".hero");
        hero.html(selectedThumbnail.html());
        
        $("h1").text(selectedThumbnail.children().attr('alt'));
    });
}


watchForm();
