var d;
var p;

var flashReady = function(){
	flash.connect('rtmp://localhost/SMSServer');

	$('.slider').slider({
	    min: 0,
	    max: 1,
	    range: 'min',
	    step: .1,
	    value: 1,
	    slide: function(e, ui) {
	       flash.setVolume(-ui.value);
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
