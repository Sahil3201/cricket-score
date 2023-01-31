var scoreboard = [[], [0]]; //scoreboard[<over_no>][0] counts wide runs
var ball_no = 1; // Ball number will start from 1
var over_no = 1; // Over number will start from 1
var runs = 0;
var edited = [];
var isNoBall = false;
var isTargetMode = false;
var targetRuns = -1; // total runs scored by other team
var targetOvers = -1; //total overs

var topic = -1;

$(document).ready(function () {
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get("matchCode") != null) {
		console.log(urlParams.get("matchCode"));
		startConnect(urlParams.get("matchCode")); //TODO
	} else {
		// $('#matchCodeInput').modal('show');
		let myModal = new bootstrap.Modal(
			document.getElementById("shareModal"),
			{}
		);
		myModal.show();
	}
	console.log(document.location.origin);

	if (urlParams.get("debug") == null || urlParams.get("debug") != "true")
		$("#messages").hide();
});

function getMatchCodeNConnect() {
	let matchCode = $("#matchCodeInput").val();
	startConnect(matchCode);
}

let isStartConnectDone = false;

function startConnect(_topic) {
	clientID = "clientID - " + parseInt(Math.random() * 100);

	host = "test.mosquitto.org";
	port = 8080;
	topic = _topic ?? "" + parseInt(Math.random() * 1000000);

	document.getElementById("messages").innerHTML +=
		"<span> Connecting to " + host + "on port " + port + "</span><br>";
	document.getElementById("messages").innerHTML +=
		"<span> Using the client Id " + clientID + " </span><br>";

	client = new Paho.MQTT.Client(host, Number(port), clientID);

	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	client.connect({
		onSuccess: onConnect,
		//        userName: userId,
		//       passwordId: passwordId
	});
	isStartConnectDone = true;
	console.log("start connect done!");
}

function onConnect() {
	document.getElementById("messages").innerHTML +=
		"<span> Subscribing to topic " + topic + "</span><br>";

	client.subscribe("matchCodeWatch" + topic);
	publishMessage(JSON.stringify({ init: "true" }));
	console.log("onConnect called");
}

function onConnectionLost(responseObject) {
	document.getElementById("messages").innerHTML +=
		"<span> ERROR: Connection is lost.</span><br>";
	if (responseObject != 0) {
		document.getElementById("messages").innerHTML +=
			"<span> ERROR:" + responseObject.errorMessage + "</span><br>";
	}
}

function onMessageArrived(message) {
	console.log("OnMessageArrived: " + message.payloadString);
	document.getElementById("messages").innerHTML +=
		"<span> Topic:" +
		message.destinationName +
		"| Message : " +
		message.payloadString +
		"</span><br>";

	let payload = JSON.parse(message.payloadString);
	if (payload.update != undefined) {
		updateHtml(payload.update.eleId, payload.update.newHtml);
	} else if (payload.init != undefined) {
		showConnected();
		initHtml(payload);
	} else if (payload.isTargetMode != undefined)
		setTargetMode(payload.isTargetMode);
}

function publishMessage(msg) {
	if (!isStartConnectDone) return;

	// msg = document.getElementById("Message").value;
	// topic = document.getElementById("topic_p").value;

	Message = new Paho.MQTT.Message(msg);
	Message.destinationName = "matchCodeWatch" + topic + "origin";

	client.send(Message);
	document.getElementById("messages").innerHTML +=
		"<span> Message to topic " + topic + " is sent </span><br>";
}

function updateHtml(eleId, newHtml) {
	$(eleId).html(newHtml);
}

function initHtml(payload) {
	// console.log(JSON.parse(initVars));
	for (let keys in payload.init) {
		$(keys).html(payload.init[keys]);
	}
	setTargetMode(payload.isTargetMode);
}

function setTargetMode(isTargetMode) {
	isTargetMode ??= false;
	if (isTargetMode) $("#targetBody").show();
	else $("#targetBody").hide();
}

function showConnected() {
	console.log("Connected successfully!");
	$("#alert").html("Connected successfully!");
	$("#alert").show();
	setTimeout(function () {
		$("#alert").hide();
	}, 4000);
}
