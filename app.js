//win.showDevTools();
const exec = require('child_process').exec;

function searchProcess() {
	location = "#second-page";
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