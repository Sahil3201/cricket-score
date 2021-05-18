var scoreboard = [];
wide = [];
function update_scoreboard() {
	var table = "";
	for (i = 0; i < parseInt((scoreboard.length - 1) / 6 + 1); i++) {
		table = table + "<tr>";
		table += "<td>" + (i + 1).toString() + "</td>";
		table +=
			"<td>" + scoreboard.slice(6 * i, 6 * (i + 1)).join(" - ") + "</td>";
		table = table + "</tr>";
	}
	$("#scoreboard").html("<tr><th>Over</th><th>Score</th></tr>" + table);
}

$(document).ready(function () {
	$("#run_dot").on("click", function (event) {
		ball("D", 0);
	});
	$("#run_1").on("click", function (event) {
		ball(1);
	});
	$("#run_2").on("click", function (event) {
		ball(2);
	});
	$("#run_3").on("click", function (event) {
		ball(3);
	});
	$("#run_wide").on("click", function (event) {
		ball("+", 0);
	});
	$("#run_4").on("click", function (event) {
		ball(4);
	});
	$("#run_6").on("click", function (event) {
		ball(6);
	});
	$("#run_W").on("click", function (event) {
		ball("W", 0);
	});
	$("#scoreboard-btn").on("click", function (event) {
		update_scoreboard();
	});

	function ball(run, score = 1) {
		if (run == "+") {
			$("#run").html(parseInt($("#run").html()) + 1);
			return;
		}
		if(score==1)
			$("#run").html(parseInt($("#run").html()) + run);
		scoreboard.push(run);
		update_runboard(run);
	}

	function update_runboard(run = -1) {
		// Does everything relating to the number of balls
		// Updates the last six balls' score and the overs beside the run
		var over_no = parseInt((scoreboard.length - 1) / 6);
		var ball_no = parseInt((scoreboard.length - 1) % 6);
		console.log("over_no=", over_no, "| ball_no=", ball_no);
		console.log("scoreboard: ", scoreboard);
		$("#ball_no_" + ball_no.toString()).html(run);
		if (ball_no != 0) {
			$("#ball_no_" + ball_no.toString()).removeClass("btn-light");
			$("#ball_no_" + ball_no.toString()).addClass("btn-primary");
		} else {
			for (i = 1; i < 6; i++) {
				$("#ball_no_" + i.toString()).removeClass("btn-primary");
				$("#ball_no_" + i.toString()).addClass("btn-light");
			}
		}
		$("#over-ball").html(
			(parseInt(scoreboard.length / 6) + (scoreboard.length % 6) / 10).toFixed(
				1
			)
		);
	}
});

function change_score() {
	let over = parseInt($("#change_over").val());
	let ball = parseInt($("#change_ball").val());
	let run = parseInt($("#change_run").val());
	scoreboard[(over - 1) * 6 + (ball - 1)] = run;
	update_scoreboard();
}

/*
$("p:first").addClass("intro");
removeClass()
  element.classList.add("mystyle");
*/
