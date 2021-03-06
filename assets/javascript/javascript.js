$( document ).ready(function() {

    var topics = ["Typing","Dancing", "Jogging", "Falling", "Reading", "Pushing", "Swimming", "Eating", "Skipping", "Crying", "Winking","Tripping", "Strolling", "Hopping", "Laughing", "Smoking"];

    function displayGifButtons(){
        $("#gifButtonsView").empty();
        for (var i = 0; i < topics.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("topic");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    function addNewButton(){
        $("#addGif").on("click", function(){
        var topic = $("#topic-input").val().trim();
        if (topic == ""){
          return false; 
        }
        topics.push(topic);
    
        displayGifButtons();
        return false;
        });
    }

    function displayGifs(){
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=a4cBau4QhzNrdfN7llgoD8I9VO1uCQbt&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            $("#gifsView").empty();
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);

                $("#gifsView").prepend(gifDiv);
            }
        });
    }
 
    displayGifButtons();
    addNewButton();

    $(document).on("click", ".topic", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });
    $("iframe").each(function() {
        $(this).attr("src", $(this).attr("src").replace("http://", "https://"));
    });