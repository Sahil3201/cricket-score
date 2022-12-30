var scoreboard = [[], [0]]; //scoreboard[<over_no>][0] counts wide runs
var ball_no = 1; // Ball number will start from 1
var over_no = 1; // Over number will start from 1
var runs = 0;
var edited = [];
var isNoBall = false;

$(document).ready(function () {
	// window.onresize = function(event) {
	// 	vpw = $(window).width();
	// 	vph = $(window).height();
	// 	$(".container").css('height', vph + 'px');
	// 	}
	$("#run_dot").on("click", function (event) {
		play_ball("D", 0);
	});
	$("#run_1").on("click", function (event) {
		play_ball(1);
	});
	$("#run_2").on("click", function (event) {
		play_ball(2);
	});
	$("#run_3").on("click", function (event) {
		play_ball(3);
	});
	$("#run_wide").on("click", function (event) {
		play_ball("+", 0);
	});
	$("#run_no_ball").on("click", function (event) {
		play_ball("NB", 0);
	});
	$("#run_4").on("click", function (event) {
		play_ball(4);
	});
	$("#run_6").on("click", function (event) {
		play_ball(6);
	});
	$("#run_W").on("click", function (event) {
		play_ball("W", 0);
	});
	$("#scoreboard-btn").on("click", function (event) {
		update_scoreboard();
	});
});

function play_ball(run, score = 1) {
	if (run == "+") {
		//Wide ball
		runs++;
		scoreboard[over_no][0] += 1;
		update_score();
		return;
	}
	if (run == "NB") {
		isNoBall = true;
		//No ball
		runs++;
		scoreboard[over_no][0] += 1;
		update_score();
		return;
	}
	if (score == 1) {
		runs += run;
	}
	// console.log("over_no=", over_no, "| ball_no=", ball_no," |Runs=",runs);

	if (isNoBall) {
		scoreboard[over_no][0] += run;
		update_score();
		isNoBall = false;
	} else {
		scoreboard[over_no][ball_no] = run;
		// console.log(scoreboard[over_no])
		update_runboard();
		ball_no++;
		if (ball_no >= 7) {
			ball_no = 1;
			over_no++;
			scoreboard[over_no] = [];
			scoreboard[over_no][0] = 0; //Wide bowls counter
		}
	}
	update_score();
}

function update_runboard() {
	// Updates the runboard when the function is called
	for (i = 1; i < 7; i++) {
		let score_und = (_score_und) => (_score_und == undefined ? "" : _score_und);
		$("#ball_no_" + i.toString()).html(score_und(scoreboard[over_no][i]));
	}
	if (ball_no != 1) {
		$("#ball_no_" + ball_no.toString()).removeClass("btn-light");
		$("#ball_no_" + ball_no.toString()).addClass("btn-primary");
	} else {
		for (i = 2; i <= 6; i++) {
			$("#ball_no_" + i.toString()).removeClass("btn-primary");
			$("#ball_no_" + i.toString()).addClass("btn-light");
		}
	}
	$("#over-ball").html((over_no - 1).toString() + "." + ball_no.toString());
}

function change_score() {
	let over = parseInt($("#change_over").val());
	let ball = parseInt($("#change_ball").val());
	let run = parseInt($("#change_run").val());
	edited.push([over, ball, scoreboard[over][ball], run]);
	scoreboard[over][ball] = run;
	update_score();
	update_scoreboard();
	$("#run").html(runs);
	let edited_scores = "Edited scores:<br>";
	for (i = 0; i < edited.length; i++) {
		edited_scores +=
			"(" +
			edited[i][0].toString() +
			"." +
			edited[i][1].toString() +
			") = " +
			edited[i][2].toString() +
			" -> " +
			edited[i][3].toString();
		edited_scores += "<br>";
	}
	// }
	$("#edited-scores").html(edited_scores);
}

function update_scoreboard() {
	// Updates the table in the modal which appears when the scoreboard button is pressed.
	var table = "";
	for (i = 1; i <= over_no; i++) {
		table = table + "<tr>";
		table += "<td>" + i.toString() + "</td>";
		table +=
			"<td>" +
			scoreboard[i].slice(1, 7).join(" - ") +
			" (" +
			scoreboard[i][0].toString() +
			")" +
			"</td>";
		table = table + "</tr>";
	}
	$("#scoreboard").html("<tr><th>Over</th><th>Score (Extras)</th></tr>" + table);
}

function update_score() {
	let score = 0;
	for (i = 1; i <= over_no; i++) {
		let numOr0 = (n) => (n == "+" ? 1 : isNaN(n) ? 0 : n);
		score += scoreboard[i].reduce((a, b) => numOr0(a) + numOr0(b));
	}
	runs = score;
	$("#run").html(runs);
}

function back_button() {
	ball_no--;
	if (ball_no == 0) {
		ball_no = 6;
		over_no--;
	}
	scoreboard[over_no][ball_no] = undefined;
	update_score();
	update_scoreboard();
	update_runboard();
	$("#over-ball").html(
		(over_no - 1).toString() + "." + (ball_no - 1).toString()
	);
}
