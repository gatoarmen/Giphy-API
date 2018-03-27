"use sttict"
       
// Initial array of movies

var animals = ["Dog", "Cat", "Panda", "Elephant"];

// Function for displaying movie data
function renderButtons() {

  // Delete the content inside the movies-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)

 $('#animal-Buttons').empty();
  // Loop through the array of movies, then generate buttons for each movie in the array

  for ( var i = 0; i < animals.length; i++) {

    var a = $('<button>');

    a.addClass('animal');

    a.addClass('btn btn-primary')

     a.attr("data-name", animals[i]);

     a. text(animals[i]);

      $("#animal-Buttons").append(a);
  }
}

// Calling the renderButtons function to display the intial buttons
renderButtons();


   // This function handles events where one button is clicked

$("#add-animal").on("click", function(event) {
event.preventDefault();

// This line grabs the input from the textbox
var animal = $("#animal-input").val().trim();

// The movie from the textbox is then added to our array
animals.push(animal);

// Calling renderButtons which handles the processing of our movie array
renderButtons();

});

  
// Generic function for displaying the Gifts
$(document).on("click", ".animal",  function displayAnimalInfo() {

let key = 'UEUEJxjpyHy0Wmpa4JOQUZQSc3kOEjvd'
var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key  + '&q=' + animal + '&limit=10';
console.log(queryURL)

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {

    console.log(response)

      // storing the data from the AJAX request in the results variable
  var results = response.data;

// Looping through each result item
for (var i = 0; i < results.length; i++) {

// Creating and storing a div tag
var animalDiv = $("<div>");
animalDiv.addClass("col-md-6")
// Creating a paragraph tag with the result item's rating
var p = $("<p>").text("Rating: " + results[i].rating);

// Creating and storing an image tag
var animalImage = $("<img>");
// Setting the src attribute of the image to a property pulled off the result item
animalImage.attr("src", results[i].images.fixed_height.url);
animalImage.attr("data-still", results[i].images["480w_still"].url);

animalImage.attr("data-animate", results[i].images.fixed_height.url);

animalImage.attr("data-state", "still");


// Appending the paragraph and image tag to the animalDiv
animalDiv.append(p);
animalDiv.append(animalImage);

// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
$("#animals-view").prepend(animalDiv);

$("img").on("click", function() {
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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


};

});

} );
