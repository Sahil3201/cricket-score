$(document).ready(function () {
	var scoreboard = [];
	$("#run_dot").on("click", function (event) {
		ball("D", 0);
	});
	$("#run_1").on("click", function (event) {
		ball(1);
	});
	$("#run_2").on("click", function (event) {
		ball(2);
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

	function ball(run, score = 1) {
		if (score == 1) {
			$("#run").html(parseInt($("#run").html()) + run);
		}
		scoreboard.push(run);
		// console.log(scoreboard)
		update_scoreboard(run);
	}

	function update_scoreboard(run) {
		// Does everything relating to the number of balls
		// Updates the last six balls' score and the overs beside the run
		var over_no = parseInt((scoreboard.length - 1) / 6);
		var ball_no = parseInt((scoreboard.length - 1) % 6);
		console.log("over_no=", over_no, "| ball_no=", ball_no);
		console.log("scoreboard: ",scoreboard);
        $("#ball_no_" + ball_no.toString()).html(run)
		if (ball_no != 0) {
			$("#ball_no_" + ball_no.toString()).removeClass("btn-light");
			$("#ball_no_" + ball_no.toString()).addClass("btn-primary");
		} else {
			for (i = 1; i < 6; i++) {
				$("#ball_no_" + i.toString()).removeClass("btn-primary");
				$("#ball_no_" + i.toString()).addClass("btn-light");
			}
		}
        $("#over-ball").html(parseInt((scoreboard.length) / 6) + ((scoreboard.length) % 6)/10);
	}
});

/*
$("p:first").addClass("intro");
removeClass()
  element.classList.add("mystyle");
*/
