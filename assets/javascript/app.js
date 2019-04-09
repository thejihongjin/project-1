// generate api divs & buttons

var queryURL = '';
generateAPIs();

function generateAPIs() {
    // var apiObj = {}
    var apiArr = [
        {
            name: 'icanhazdadjoke', // for switch case later
            url: 'https://icanhazdadjoke.com/', // for ajax call
            text: 'Click me for HAHAs'
        },
        {
            name: 'test2',
            url: '',
            text: ''
        },
        {
            name: 'test3',
            url: '',
            text: ''
        },
        {
            name: 'test4',
            url: '',
            text: ''
        },
        {
            name: 'test5',
            url: '',
            text: ''
        }
    ];

    for (var i = 0; i < apiArr.length; i++) {
        var apiDiv = $("<div>");
        var btn = $("<button>");
        btn.addClass("api-btn");
        btn.attr("data-name", apiArr[i].name);
        btn.attr("data-url", apiArr[i].url);
        btn.text(apiArr[i].text);
        apiDiv.append(btn);
        $("#api-list").append(apiDiv);
    };
}


$(document).on("click", ".api-btn", function () {
    apiName =  $(this).attr("data-name");
    queryURL = $(this).attr("data-url");
    testAPI();
});


function testAPI() {
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then(function (response) {
        console.log(response);

        $("#api-result").empty();
        switch (apiName) {
            case 'icanhazdadjoke':
                $("#api-result").text(response.joke);
                break;
        
            case '':
                // $("#api-result").text();
                break;
        
            default:
                break;
        }
    });
}

















// Initialize Firebase
var config = {
    apiKey: "AIzaSyCOra4qCT4zjgT8Mk2fVi5hysWG9uWQSx4",
    authDomain: "project-1-445cf.firebaseapp.com",
    databaseURL: "https://project-1-445cf.firebaseio.com",
    projectId: "project-1-445cf",
    storageBucket: "project-1-445cf.appspot.com",
    messagingSenderId: "75519416614"
};

firebase.initializeApp(config);

var database = firebase.database();
var connectionsRef = database.ref("/connections"); // stores connections in this directory
var connectedRef = database.ref(".info/connected"); // '.info/connected' is a boolean value, true if the client is connected and false if they are not

connectedRef.on("value", function (snap) { // when the client's connection state changes
    if (snap.val()) { // if they are connected
        var con = connectionsRef.push(true); // adds user to the connections list
        con.onDisconnect().remove(); // removes user from the connection list when they disconnect
    }
});

connectionsRef.on("value", function (snapshot) { // when first loaded or when the connections list changes...
    $("#watchers").text(snapshot.numChildren());
});
