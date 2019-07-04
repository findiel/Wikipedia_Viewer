$(document).ready(function () {
    console.log("Coded by Bartlomiej Tuchowski");
    $(".container__fly-in-text, .container__random-article, .container__or, .container__search-article, .container__input").removeClass("hidden");
    function getData () {
        var input = document.getElementsByClassName("container__input-text")[0].value;
        console.log("User has entred:", input);
        
        if (input == "") {
          alert("Query is empty. Please enter any record.");
        }
        
        else {
            $(".container").addClass("container__move-up");
            var website = "https://en.wikipedia.org";
            var query = "/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&generator=search&exsentences=1&exintro=1&explaintext=1&exsectionformat=plain&inprop=url&gsrsearch=" + input + "&gsrlimit=10";
            var fullApi = website + query;
            console.log("JSON:" , fullApi);
            
            //Working with JSON
            var newContent ="";
            $.getJSON(fullApi, function(json) {
                if (Object.keys(json).length == 1) {
                    alert("Sorry but nothing has been found.")
                }
                else {
                    for (var i = 0; i < Object.keys(json.query.pages).length; i++) {
                        var pageId = Object.keys(json.query.pages)[i];
                        var title = json.query.pages[pageId].title;
                        var extract = json.query.pages[pageId].extract;
                        var pageUrl = json.query.pages[pageId].fullurl;
                        newContent += '<a class="animated fadeIn" href="' + pageUrl + '" target="_blank">';
                        newContent += '<div class="container__new-article">';
                        newContent += '<h1>' + title + '</h1>';
                        newContent += '<p>' + extract + '</p>';
                        newContent += '</div></a>';
                        document.getElementById('container__articles').innerHTML = newContent;
                        var modifier = 0;
                    }
                }
            });
        }
    }
    var modifier = 0; //Allow to execute  $(".container__input-text").change(getData).
    $(".container__button-submit").click(getData, function (){
        var modifier = 1; //This modifier prvents from double execute getData function when press a SEARCH button.
    });
    
    if (modifier == 0) {
        $(".container__input-text").change(getData);
    }
});
