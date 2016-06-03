//win.showDevTools();
const exec = require('child_process').exec;

$(".txt-search").focus();

function quickill() {
	$('.process-list').empty();
	var processToFind = $(".txt-search").val();
	exec('tasklist | find /I "' + processToFind + '"', (err, sto, ste) => {
		if (err) {
			console.log(`exec error: ${error}`);
			return;
		}
		sto = sto.split("\n");
		console.log(`sto: ${sto.length}`);
		var processToKill = sto[0].match(/[^\\]*\.(\w+)/g);
		exec(`taskkill /f /im ${processToKill}`, function(err, sto, ste) {
			if (err){
				console.log(`Error killing process: ${err}`);
				return
			}
			console.log(`Process killed, ${sto}`);
		});
	});
}

function searchProcess() {
	location = "#second-page";
	$('.process-list').empty();
	var processToFind = $(".txt-search").val();
	exec('tasklist | find /I "' + processToFind + '"', (err, sto, ste) => {
		if (err) {
			console.log(`exec error: ${error}`);
			return;
		}
		sto = sto.split("\n");
		sto.pop();
		console.log(`sto: ${sto.length}`);
		var processToKill = sto[0].match(/[^\\]*\.(\w+)/g);
		sto.forEach(logArrayElements);
	});
}

function up() {
	location = "#first-page";
}

function logArrayElements(el, index, array) {
	var fileName = el.match(/[^\\]*\.(\w+)/g);
	$('.process-list').append(`<input type="checkbox" value="${fileName}">${fileName}<br>`);
}