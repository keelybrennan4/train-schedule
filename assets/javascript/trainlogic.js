// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDC2Xhy-bZ_-jdXfWq0KqAlcJ9o7dhztoE",
    authDomain: "trainschedule-c00fb.firebaseapp.com",
    databaseURL: "https://trainschedule-c00fb.firebaseio.com",
    projectId: "trainschedule-c00fb",
    storageBucket: "trainschedule-c00fb.appspot.com",
    messagingSenderId: "951469244968"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Create button for adding new trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

// 3. Create a way to retrieve entries from the database / grab user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var firstTrain = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X"); // use moment for first train time 
var trainFrequency = $("#frequency-input").val().trim();

//Create local/temporary object for holiding train data 
var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency,
};

//Push train data to firebase once inputted on local form
database.ref().push(newTrain);
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

// Alert
alert("Success!");

// Clear input fields after submitting to database
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// 3. Firebase event to add trains to the database and new rown in HTML table
database.ref().on("child_added", function(childSnapshot, prevChildKey){
    
    console.log(childSnapshot.val());

    //store each value in the variables  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // 4. Calculate the next arrival using difference between start and current time.// Then use moment.js formatting to set time in hours and minutes
    var nextTrain = moment().diff(moment.unix(firstTrain, "X"), "minutes");
    console.log(nextTrain);

    // 5. Calculate Minutes Away - reference to the database 
    var minutesAway = ""; // firstTrain + frequency;

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesAway + "</td></tr>");

});









