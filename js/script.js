$(document).ready(function () {
    console.log("Coded by Barlomiej Tuchowski"); //Signature
    $(".container__fly-in-text, .container__random-article, .container__or, .container__search-article, .container__input").removeClass("hidden"); //Fades in intro.
    function getData () {
        var input = document.getElementsByClassName("container__input-text")[0].value; //Gets user input as a query.
        console.log("User has entred:", input);
        
        if (input == "") {
          alert("Query is empty. Please enter any record."); //Alert if user didn't specify any record.
        }
        
        else {
            $(".container").addClass("container__move--up"); //Move content to top of the page. --> to make a space for vikiedia content.
            var website = "https://en.wikipedia.org"; //Wikipedia main page.
            var query = "/w/api.php?action=query&format=json&origin=*&prop=extracts%7Cinfo&generator=search&exsentences=1&exintro=1&explaintext=1&exsectionformat=plain&inprop=url&gsrsearch=" + input + "&gsrlimit=10"; //A full query. Could be changed with the API sandbox: https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm
            var fullApi = website + query; //Full JSON path.
            console.log("JSON:" , fullApi);
            
            //Working with JSON
            var newContent ="";
            $.getJSON(fullApi, function(json) {
                if (Object.keys(json).length == 1) {
                    alert("Sorry but nothing has been found.")
                }
                else {
                    for (var i = 0; i < Object.keys(json.query.pages).length; i++) {
                        var pageId = Object.keys(json.query.pages)[i]; //Changing atrticles to work on it.
                        var title = json.query.pages[pageId].title;
                        var extract = json.query.pages[pageId].extract;
                        var pageUrl = json.query.pages[pageId].fullurl;
                        //console.log(title, extract, pageUrl); Shows data in console.
                        newContent += '<a class="animated fadeIn" href="' + pageUrl + '" target="_blank">'; //Adds anchor to article page.
                        newContent += '<div class="container__new-article">'; //Adds cool article design.
                        newContent += '<h1>' + title + '</h1>'; //Adds article header.
                        newContent += '<p>' + extract + '</p>'; //Adds article extract.
                        newContent += '</div></a>' //Closing tags.
                        document.getElementById('container__articles').innerHTML = newContent; //Loads new content to page.
                        var modifier = 0; //Allow to execute  $(".container__input-text").change(getData).
                    }
                }
            })
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
