$(document).ready(function () {

    renderSearchForm()
    renderAnimalBtn()
    displayAnimalGif()

});
var searchTerm = "dog"
const APIKey = "980vJDBIk39IB4UPz0NlmPK0kkQViPww"
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey + "&limit=10"
var animals = ["dog", "cat", "bird", "pangolin"]
console.log(queryURL)

//seach form, works fine :)
function renderSearchForm() {
    searchbox = $("#add-animals")
    searchform = ("<form id='animal-form'>")
    searchbox.append("<label for='animal-input'>Add more animals!</label>")
    searchbox.append("<input type='text' id='animal-input'><br>")
    searchbtn = ("<input id='add-animal' class='btn btn-primary btn-block m-1' type='submit' value='Add animal!'></form>")
    searchbox.append(searchbtn)
}
//shows the animals buttons. works fine :)
function renderAnimalBtn() {
    $("#animal-buttons").empty();
    for (var i = 0; i < animals.length; i++) {
        animalbtn = $("<button>");
        animalbtn.addClass("animal m-1 btn-primary");
        animalbtn.attr("data-name", animals[i]);
        animalbtn.text(animals[i]);
        $("#animal-buttons").append(animalbtn);
    }
}
//this guy just listens for clicks and adds to the array, works fine :)
$(document).on("click", "#add-animal", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animals.push(animal);

    console.log(animal)
    console.log(animals)

    // reloading our animal array
    renderAnimalBtn();
});

function displayAnimalGif() {

    // Creating an AJAX call for the specific animal button being clicked NEEDS FIXING, IMGS NEED TO DISPLAY BETTER BUT THEY'RE THERE
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#animal-gifs").empty()
        for (let i = 0; i < 10; i++) {

            // Creating a div to img and rating
            var a = $("<div class='animaldiv m-3 float-left'>");

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            a.append(pOne);
            // Retrieving the URL for the image
            var animatedURL = response.data[i].images.fixed_width.url
            var stillURL = response.data[i].images.fixed_width_still.url

            // Creating an element to hold the image
            var image = $("<img>").attr({
                src: stillURL,
                "data-still": stillURL, 
                "data-animate": animatedURL, 
                "data-state": "still", 
                class: "animal-gif"});

            // Appending the image
            a.append(image);

            // Putting the div into the display
            $("#animal-gifs").prepend(a);
        }
    });
}
    // updates seachTerm to whatever button is clicked. this works :) 
$(document).on("click", ".animal", function(){
    searchTerm = $(this).attr("data-name");
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + APIKey + "&limit=10"
    displayAnimalGif()

})
$(document).on("click", ".animal-gif", function() {
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

