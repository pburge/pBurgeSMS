var flashReady=function(){
	$('#playbtn').on('click',function(){
		flash.connect('rtmp://localhost');
	});
}