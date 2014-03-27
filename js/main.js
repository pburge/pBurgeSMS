var d;
var p;
var un;
var msg;
var login;
var cams;
var mics;
var rec;
var cameraIndex = 0;
var microphoneIndex = 0;


var chatRef = new Firebase('https://blazing-fire-6476.firebaseio.com/');

chatRef.on('child_added', function(snapshot) {
	var message = snapshot.val();
	displayChatMessage(message.name, message.text);
});

function displayChatMessage(name, text) {
	var html = '';

	html += '' +
	'<div class="box-products">'+
		'<div class="user_icon"></div>'+
			'<h4>' + name + '</h4>' +
		'<p class="comment">' + text + '</p>'+
	'</div>';

	$('#comments').prepend(html);

};

var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	if (error) {
		// an error occurred while attempting login
		console.log(error);
	} else if (user) {
		// user authenticated with Firebase
		un = user.displayName;
		$('#fbook').text('logout');
		login = false;
		console.log('User ID: ' + user.displayName + ', Provider: ' + user.provider);
	} else {
		console.log('logged out');
		login = true;
		$('#fbook').text('Login with Facebook');
		// user is logged out
	}
});


$('#submit').click(function(e) {
	msg = $('#messageInput').val();
	chatRef.push({name: un, text: msg});
});

$('#fbook').click(function(e){
	if(login == true){
		console.log(login + ' logged in');
		auth.login('facebook');
		login = false;
		e.preventDefault();
	}else if(login == false) {
		console.log(login + ' logged out');
		auth.logout();
		login = true;
		e.preventDefault();
	}

});

$('#mic').click(function(e) {
	$.each(mics, function(i, micList) {
		// $('#mic_div').append(micList);
		console.log(i + ' : ' + micList);
	});
});

$('#cam').click(function(e) {
	$.each(cams, function(i, camList) {
		// $('#cam_div').append(camList);
		console.log(i + ' : ' + camList);
	});
});

$('#rec').click(function(e) {
	if(rec == 1){
		console.log(rec);
		rec = 2;
		flash.startRecording('movie',cameraIndex,microphoneIndex);
	}else if(rec == 2){
		console.log(rec);
		rec = 1;
		flash.stopRecording();
	}
	
});



var flashReady = function(){
	flash.connect('rtmp://localhost/SMSServer');

	cams = flash.getCameras();
	mics = flash.getMicrophones();
	rec = 1;

	$('.slider').slider({
	    min: 0,
	    max: 1,
	    range: 'min',
	    step: .1,
	    value: 1,
	    slide: function(e, ui) {
	       flash.setVolume(ui.value);
	    }
	});

	$('.vid_posish').click(function(e) {
		xpos = e.pageX - $('.vid_seek').offset().left;
		var ctime = (xpos/(930))*d;
		flash.setTime(ctime);
		$('.vid_seek').css("width",xpos);
		e.preventDefault();
	});

};

var connected = function(success,error){
	$('#main_btn').click(function(e){
		e.preventDefault();
		checkPaused();
	});
};

var checkPaused = function(){
	var status = flash.playPause();
	if(status){
		if(!p){
			p = true;
			$('#main_btn').addClass('playing');
		}
	}else{
		if(p == false){
			p = false;
			$('#main_btn').addClass('paused');
		}
		flash.startPlaying('startrekintodarkness_vp6.flv');
	};
};

var getDuration = function(duration){
	d = duration;
}

var seekTime = function(time){
	var xpos = (time / d) * (930);
	$('.vid_seek').css("width",xpos);
}
