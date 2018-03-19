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

// when user submits a new train via user input field
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //grab entries from the database 
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
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

    // alert user once a new train is added
    alert("Success!");

    // Clear input fields after submitting to database
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

// Firebase event to add trains to the database and new row in HTML table
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store each value in the variables  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var currentTime = moment();
    
    // capture first train time
    var firstTransport = moment(firstTrain, "HH:mm");
    console.log(firstTransport);
    
    // find difference from time now and the first train time 
    var diffTime = moment().diff(moment(firstTransport), "minutes");

    // find the remaining time by dividing the difference since first train by the train's frequency 
    var remainder = diffTime % trainFrequency;
    console.log(remainder);

    // Calculate how many minutes away the train is 
    var timeToTrain = trainFrequency - remainder;
    console.log(timeToTrain);

    //add the minutes away and format to new variable, nextTrain
    var nextTrain = moment().add(timeToTrain, "minutes").format("hh:mm A");
    console.log(nextTrain);

  // add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + 
  trainName + "</td><td>" + 
  trainDestination + "</td><td>" + 
  trainFrequency + "</td><td>" + 
  nextTrain + "</td><td>" + 
  timeToTrain + "</td></tr>");

});





