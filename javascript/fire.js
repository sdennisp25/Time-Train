
var config = {
	apiKey: "AIzaSyCzOO5uINotV4AN6Baif3nqSwak1E-IVT8",
	authDomain: "time-train-33c1d.firebaseapp.com",
	databaseURL: "https://time-train-33c1d.firebaseio.com",
	projectId: "time-train-33c1d",
	storageBucket: "time-train-33c1d.appspot.com",
	messagingSenderId: "569914435786"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-info").on("click", function(event) {
	event.preventDefault();

	var name = $("#name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var start = $("#start-input").val().trim();
	var frequency = $("#frequency-input").val().trim();
	
	database.ref().push({
		name: name,
		destination: destination,
		start: start,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})
	
	var currentTime = moment();
	console.log(currentTime);
	
	var timeConvert = moment.duration(currentTime).asMinutes();
	console.log(timeConvert);
	
	var timeDiff = moment().diff(moment(timeConvert), "minutes");
	console.log("Difference in min: " + timeDiff);

	var timeRemaining = timeDiff % frequency;
	console.log("Time Remaining: " + timeRemaining);
	$("#minutesAway").text(timeRemaining);
});


database.ref().on("child_added", function(snapshot) {
	$("#nameDisplay").text(snapshot.val().name);
	$("#destinationDisplay").text(snapshot.val().destination);
	$("#frequencyDisplay").text(snapshot.val().frequency);
	$("#arrivalDisplay").text(snapshot.val().start);
})

