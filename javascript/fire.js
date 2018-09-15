
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
	
	database.ref("/user/").push({
		name: name,
		destination: destination,
		start: start,
		frequency: frequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	})

	var timeConvert = moment(start, "HH:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff = moment().diff(moment(timeConvert), "minutes");
	var timeRemaining = timeDiff % frequency;
	var nextTrainMin = frequency - timeRemaining;
	var nextArrivalTime = moment().add(nextTrainMin, "minutes").format("hh:mm")

	console.log("Start Time: " + start);
	console.log("Current Time: " + moment().format("hh:mm"));
	console.log("Difference in time(min): " + timeDiff);
	console.log("Time Remaining: " + timeRemaining);
	console.log("Next Train: " + nextTrainMin);
	console.log("Arrival Time: " + nextArrivalTime);


	var tableRow = $("<tr>").append(
		$("<td>").text(name),
		$("<td>").text(destination),
		$("<td>").text(frequency),
		$("<td>").text(nextArrivalTime),
		$("<td>").text(nextTrainMin),
	);

	$("tbody").append(tableRow);
});

$("#delete-info").on("click", function() {
	firebase.database().ref().remove(database.name);

})