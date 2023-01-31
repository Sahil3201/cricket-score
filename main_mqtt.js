var topic = -1;
let isStartConnectDone = false;

function startConnect(_topic) {
	clientID = "clientID - " + parseInt(Math.random() * 100);

	host = "test.mosquitto.org";
	port = 8080;
	topic = _topic ?? "" + parseInt(Math.random() * 1000000);

	let seralizedLink =
		document.location.origin + "/watch.html?matchCode=" + topic;
	seralizedLink = encodeURI(seralizedLink);
	document.getElementById("shareModalBody").innerHTML =
		"<h4>Share this code:" +
		'&nbsp;<span class="badge bg-secondary">' +
		topic +
		"</span>&nbsp;" +
		'<button class="btn btn-primary" onclick="navigator.clipboard.writeText(\'' +
		topic +
		'\')" data-dismiss="modal">' +
		'<span class="material-symbols-outlined">content_copy</span>';
	("</span></h4>");

	document.getElementById("shareModalFooter").innerHTML =
		'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
		'<button type="button" class="btn btn-default" onclick="navigator.clipboard.writeText(\'' +
		seralizedLink +
		'\')" data-dismiss="modal">Copy link</button>' +
		'<a href="whatsapp://send?text=Follow the match score at: ' +
		document.location.origin +
		"/watch.html?matchCode=" +
		topic +
		'" data-action="share/whatsapp/share">Share via Whatsapp</a>';

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
}

function onConnect() {
	document.getElementById("messages").innerHTML +=
		"<span> Subscribing to topic " + topic + "</span><br>";

	client.subscribe("matchCodeWatch" + topic + "origin");
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
	payload = JSON.parse(message.payloadString);
	if (payload.init != undefined && payload.init == "true") {
		sendInitVariables();
	}
}

// function startDisconnect() {
// 	client.disconnect();
// 	document.getElementById("messages").innerHTML +=
// 		"<span> Disconnected. </span><br>";
// }

function publishMessage(msg) {
	if (!isStartConnectDone) return;

	// msg = document.getElementById("Message").value;
	// topic = document.getElementById("topic_p").value;

	Message = new Paho.MQTT.Message(msg);
	Message.destinationName = "matchCodeWatch" + topic;

	client.send(Message);
	document.getElementById("messages").innerHTML +=
		"<span> Message to topic " + topic + " is sent </span><br>";
}
