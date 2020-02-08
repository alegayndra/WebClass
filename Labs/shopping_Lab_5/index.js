function watchForm() {
    $("#submitBtn").on("click", (event)=>{
        event.preventDefault();
        if ($("#newItem").val()) {
            $("#list").append(` <div class="listItem">
                                    <div>${$("#newItem").val()}</div>
                                    <button class="check">Check</button>
                                    <button class="erase">Erase</button>
                                </div>`);
            $("#newItem").val("");
        }
        
    });

    $("#list").on("click", ".listItem > .check", (event)=>{
        console.log("check clicked");
        event.preventDefault();

        console.log($(event.target).parent().find("div").attr("style"));

        if ($(event.target).parent().find("div").attr("style")) {
            $(event.target).parent().find("div").attr("style", "");
        }
        else {
            $(event.target).parent().find("div").attr("style", "text-decoration: line-through;")
        }

    })
    
    $("#list").on("click", ".listItem > .erase", (event)=>{
        console.log("erase clicked");
        event.preventDefault();
        $(event.target).parent().remove();
    })
    
}

watchForm();