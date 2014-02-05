function audioPlayer(input) {
	
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
	 var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
	 if (ieversion <= 8) {
			console.log("Audio doesnt work here")
			return false
		}
	} else {
	
	$.when($storyLoaded).then( function () {
	 
	console.log("Audio works here")
	
	
$storyGraf.eq(input.afterGraf - 1).after('<div id="'+input.name+'" class="audio-player"><audio><source src='+input.oggSrc+' type="audio/ogg"><source src='+input.mp3Src+' type="audio/mp4"><p>Your browser does not support the audio element.</p></audio></div>');

$theBox = $('#' + input.name)

$theBox.append('<h4 class="audio-tag">Audio</h4><h3 class="audio-headline">'+input.headline+'</h3><p class="audio-readout">'+input.readout+'</p><div class="audio-progress"><div class="audio-current-progress" id="audio-progress-'+input.name+'"></div></div><span class="play-button" id="'+input.name + '-play'+'"></span><span class="pause-button" id="'+input.name + '-pause'+'" style="display: none"></span><span class="replay-button" id="'+input.name + '-replay'+'" style="display: none"></span><small class="audio-time" style="display: none"><span class="current-time" id="'+input.name + '-ct'+'"></span> / <span class="total-time" id="'+input.name + '-tt'+'"></span></small>');

$('#' + input.name + ' .play-button').click(function () {
	$.each($('audio'), function () {
	    $(this)[0].pause();
	});
	$('#' + input.name + ' .audio-time').show()
	$('.pause-button').hide();
	$('.play-button').show();
	$('#' + input.name + ' audio')[0].play();
	$(this).hide();
	$('#' + input.name + ' .pause-button').show();
});

$('#' + input.name + ' .pause-button').click(function () {
	$('#' + input.name + ' audio')[0].pause();
	$(this).hide();
	$('#' + input.name + ' .play-button').show();
});

$('#' + input.name + ' audio').on("timeupdate", function() {

	// HANDLE TOTAL TIME LOGIC

	$totalMin = Math.floor($('#' + input.name + ' audio')[0].duration/60)
	$totalSec = Math.floor($('#' + input.name + ' audio')[0].duration%60)
	$totalDur = $totalMin + ':' + $totalSec

	// HANDLE CURRENT TIME LOGIC

	$current = 0

	if ( $('#' + input.name + ' audio')[0].currentTime < 60 ) {
		$current = Math.floor($('#' + input.name + ' audio')[0].currentTime)

		if ($current < 10) {
			$current = '0:0' + $current
		} else {
			$current = '0:' + $current
		}

	} else {

		$currentMin = Math.floor($('#' + input.name + ' audio')[0].currentTime / 60)
		$currentSec = Math.floor($('#' + input.name + ' audio')[0].currentTime%60)

		if ($currentSec < 10) {
			$currentSec = '0' + $currentSec
		} else {
			$currentSec = $currentSec
		}

		$current = $currentMin + ':' + $currentSec
	}

	$('#' + input.name + ' .current-time').text($current);
	$('#' + input.name + ' .total-time').text($totalDur);

	$theBar = $('#' + input.name + ' .audio-current-progress');

	$theBar.css('width', ($('#' + input.name + ' audio')[0].currentTime / $('#' + input.name + ' audio')[0].duration)*100 + '%')

});

$('#' + input.name + ' .audio-progress').click(function(e){
	var $parentOffset = $(this).parent().offset();
	var $totalWidth = $(this).parent().width()
	
	var $relX = e.pageX - $parentOffset.left;
	var $relY = e.pageY - $parentOffset.top;
	
	console.log
	
	var $newTime = $('#' + input.name + ' audio')[0].duration * ($relX/$totalWidth)
	
	$('#' + input.name + ' audio')[0].currentTime = $newTime
	
	if ($('#' + input.name + ' audio')[0].paused == false) {
		$('#' + input.name + ' audio')[0].play();
	}
});

$('#' + input.name + ' audio').on('ended',function(){
   $('#' + input.name + ' .replay-button').show();
   $('#' + input.name + ' .play-button').hide();
   $('#' + input.name + ' .pause-button').hide();
});

$('#' + input.name + ' .replay-button').click(function () {
	$(this).hide();
	$('#' + input.name + ' .pause-button').show();
	$('#' + input.name + ' audio')[0].currentTime = 0
	$('#' + input.name + ' audio')[0].play()
});

});
}

}
