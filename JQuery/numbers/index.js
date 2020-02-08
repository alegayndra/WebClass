function watchForm() {
    $("button").on("click", function(event) {
        event.preventDefault();

        let number = $("#number-choice").val();
        let sequence = [];

        for (let i = 1; i <= number; i++) {
            if (i % 15 === 0) {
                sequence.push("fizzbuzz");
            } else if (i % 3 === 0) {
                sequence.push("fizz");
            } else if (i % 5 === 0) {
                sequence.push("buzz");
            } else {
                sequence.push(i);
            }
        }

        console.log(sequence);
    })
}

watchForm();