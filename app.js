//win.showDevTools();
var os = require('os');
const exec = require('child_process').exec;

if (os.platform() == 'linux') {
	$('button[name="bt-quickill"]').attr('onclick', 'linuxQuickill()');
	$('button[name="bt-search"]').attr('onclick', 'linuxSearchProcess()');
	$('button[name="bt-killall"]').attr('onclick', 'linuxQuickill()');
	$('button[name="bt-kill-selected"]').attr('onclick', 'linuxKillSelected()');
}

$(".txt-search").focus();


function microsoftQuickill() {
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

function microsoftSearchProcess() {
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
		sto.forEach(microsoftLogArrayElements);
	});
}

function up() {
	location = "#first-page";
}

function microsoftLogArrayElements(el, index, array) {
	var fileName = el.match(/[^\\]*\.(\w+)/g);
	$('.process-list').append(`<input type="checkbox" value="${fileName}">${fileName}<br>`);
}