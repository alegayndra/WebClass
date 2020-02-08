/*
    Using thecocktaildb.com/api.php

    1. Create a form that allows the user to type the name of a drink/cocktail
    2. Connect the search term with the API
    3. From the response load in the browswer
        - Drink name
        - Image
        - Ingredientes + Measure / Quantity
*/

let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="

function watchForm() {
    $("#submitBtn").on("click", (event)=>{
        event.preventDefault();
        console.log("submit btn clicked");

        let searchTerm = $("#drink").val();

        if (searchTerm) {
            $.ajax({
                url: url + searchTerm,
                method: "GET",
                data: {}, // info sent to the API
                dataType: "json", // returned type of the response
                ContentType: "application/json", // type of snet data in the request
                success: function(responseJSON){
                    console.log(responseJSON);
                    for (let i = 0; i < responseJSON.drinks.length; i++) {
                        $(".results").append(`  <div class="result">
                                                    <div>${responseJSON.drinks[i].strDrink}</div>
                                                    <img src="${responseJSON.drinks[i].strDrinkThumb}">
                                                    <div>Ingredients + Measure / Quantity</div>
                                                    <ul id="ingrDrink${i}">
                                                    </ul>
                                                </div>`);
                        
                        // console.log(responseJSON.drinks[i]["strIngredient1"]);
                        // console.log($("#ingrDrink0"));
                        console.log("test " + responseJSON.drinks[i]["strIngredient" + 1]);
                        for (let j = 1; j <= 15; j++) {
                            console.log("checking if ingredient exist " + responseJSON.drinks[i]["strIngredient" + j]);
                            if (responseJSON.drinks[i]["strIngredient" + j] != null) {
                                console.log("theres an ingredient");
                                $("#ingrDrink" + i).append(`    <li>
                                                                    ${responseJSON.drinks[i]["strIngredient" + j]}: ${responseJSON.drinks[i]["strMeasure" + j]} 
                                                                </li>`);
                            }
                        }
                        
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
