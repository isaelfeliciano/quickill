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

function up() {
	location = "#first-page";
}

function microsoftQuickill() {
	$('.process-list').empty();
	var processToFind = $(".txt-search").val();
	exec('tasklist | find /I "' + processToFind + '"', (err, sto, ste) => {
		if (err) {
			flashMessage(`exec error: ${error}`);
			return;
		}
		sto = sto.split("\n");
		flashMessage(`sto: ${sto.length}`);
		var processToKill = sto[0].match(/[^\\]*\.(\w+)/g);
		exec(`taskkill /f /im ${processToKill}`, function(err, sto, ste) {
			if (err){
				flashMessage(`Error killing process: ${err}`);
				return
			}
			flashMessage(`Process killed, ${sto}`);
		});
	});
}

function microsoftSearchProcess() {
	location = "#second-page";
	$('.process-list').empty();
	var processToFind = $(".txt-search").val();
	exec('tasklist | find /I "' + processToFind + '"', (err, sto, ste) => {
		if (err) {
			flashMessage(`exec error: ${error}`);
			return;
		}
		sto = sto.split("\n");
		sto.pop();
		flashMessage(`sto: ${sto.length}`);
		var processToKill = sto[0].match(/[^\\]*\.(\w+)/g);
		sto.forEach(microsoftLogArrayElements);
	});
}


function microsoftLogArrayElements(el, index, array) {
	var fileName = el.match(/[^\\]*\.(\w+)/g);
	$('.process-list').append(`<input type="checkbox" value="${fileName}">${fileName}<br>`);
}

function microsoftKillSelected() {
	var inputChecked = new Array;
	var i = 0;
	var re = /,/gi; //For string replace
	$('input:checked').each(function() {
		inputChecked.push($(this).val());
		i++;
		if (i == $('input:checked').length) {
			inputChecked = inputChecked.toString().replace(re, " /im ");
			flashMessage(inputChecked);
			exec(`taskkill /f /im ${inputChecked}`, (err, sto, ste) => {
				if (err){
					flashMessage(`Error Killing Selected: ${err}`);
					return
				}
				flashMessage(`Kill Selected: ${sto}`);
			});
		}
	});
}

function linuxQuickill() {
	$('.process-list').empty();
	var processToFind = $('.txt-search').val();
	exec(`pkill -e ${processToFind}`, (err, sto, ste) => {
		if (err) {
			flashMessage(`Error QuicKilling ${err}`);
			return;
		}
		sto.split("\n");
		flashMessage(`You killed: ${sto}`);
	});
}

function linuxSearchProcess() {
	location = '#second-page';
	$('.process-list').empty();
	var processToFind = $(".txt-search").val();
	exec(`ps -A | grep ${processToFind}`, (err, sto, ste) => {
		if (err) {
			flashMessage(`Error Searching: ${err}`);
			return;
		}
		sto = sto.split("\n");
		sto.pop();
		sto.forEach(linuxLogArrayElements);
	});
}

function linuxLogArrayElements(el, index, array) {
	var uid = el.replace(/\s+/g, "");
	uid = uid.match(/^(\d+)/g);
	$('.process-list').append(`<input type="checkbox" value="${uid}">${el}<br>`)
}

function linuxKillSelected() {
	var inputChecked = new Array;
	var i = 0;
	$('input:checked').each(function() {
		inputChecked.push($(this).val());
		i++;
		if (i == $('input:checked').length) {
			inputChecked = inputChecked.toString().replace(",", " ");
			exec(`kill ${inputChecked}`, (err, sto, ste) => {
				if(err) {
					flashMessage(`Error Killing Selected: ${err}`);
					return
				}
				flashMessage('Killed Selected');
			});
		}
	});
}

// Flash Message
	function flashMessage(msg){
		if(hideFlashMessage)
			clearTimeout(hideFlashMessage);
		$('.flashmessage').removeClass('notVisible').addClass('visible')
		.html('<p>'+msg+'</p>');
		var hideFlashMessage = setTimeout(function(){
			$('.flashmessage').removeClass('visible').addClass('notVisible');
		}, 3000);
	}
	// Flash Message