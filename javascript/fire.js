
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
	var startTime = moment(start, "HH:mm").subtract(1, "years");
	var currentTime = moment();
	var timeConvert = moment.duration(currentTime).asMinutes();
	var timeDiff = moment().diff(moment(timeConvert), "minutes");
	var timeRemaining = timeDiff % frequency;
	var arrivalTime = currentTime.add(timeRemaining, "minutes").format("LT")

	$("#minutesAway").text(timeRemaining);

	console.log(currentTime);
	console.log(timeConvert);
	console.log("Difference in min: " + timeDiff);
	console.log("Time Remaining: " + timeRemaining);

	var tableRow = $("<tr>").append(
		$("<td>").text(name),
		$("<td>").text(destination),
		$("<td>").text(frequency),
		$("<td>").text(arrivalTime),
		$("<td>").text(timeRemaining),
	);

	$("tbody").append(tableRow);
});

// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
// 	$("#nameDisplay2").text(snapshot.val().name);
// 	$("#destinationDisplay2").text(snapshot.val().destination);
// 	$("#frequencyDisplay2").text(snapshot.val().frequency);
// 	$("#arrivalDisplay2").text(snapshot.val().start);
// });

// database.ref().on("child_added", function(childSnapshot) {
// 	$("#nameDisplay").append("<div><span>" + childSnapshot.val().name + "</span></div>");
// 	$("#destinationDisplay").append("<div><span>" + childSnapshot.val().destination + "</span></div>");
// 	$("#frequencyDisplay").append("<div><span>" + childSnapshot.val().frequency + "</span></div>");
// 	$("#arrivalDisplay").append("<div><span>" + childSnapshot.val().start + "</span></div>");
// 	$("#minutesAway").text(timeRemaining);

// });


