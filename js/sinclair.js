// HERALDSCRIPT
// INITIATE LAYOUT MODE
$.fn.layoutMode = function() {
	$(this).each(function(index) {
		$(this).css('position', 'relative')
		$(this).prepend('<h4 class="red ral fat" style="position: absolute; left: -25px">' + index + '</h4>');
	});
}

$.fn.byline = function(input) {
	$(this).append('<aside class="byline center"><small class="b-name upper ral fat block">By ' + input.name + '</small><a href="mailto:' + input.email + '"class="b-email upper ral normal small block">' + input.email + '</a><span class="b-time upper ral normal xsmall block red">' + input.timeType + ' <time>' + input.time + '</time></span></aside>');
}

// BUILD DOUBLE PHOTO ARRAY
$.fn.twinPhotos = function(input) {
	$(this).after('<div class="photo-array double-wide"><figure class="left float-left"><img src="' + input.firstPhotoUrl + '"alt="' + input.Caption + '"/></figure><figure class="right"><img src="' + input.secondPhotoUrl + '" alt="' + input.Caption + '"/></figure><div class="clearfix"></div><small class="photo-credit xsmall upper ral normal right">' + input.Credit + '</small><figcaption>' + input.Caption + '</figcaption></div>');
}

// FIXED
$.fn.loadContent = function(input) {

	target = $(this)

	function loadFallBack() {
		target.load(input.fallback, function() {
			input.def.resolve();
		});
	}

	target.load(input.scrapeResource, function(response, status, xhr) {
		if (status === "error") {
			console.log("Sorry but there was an error loading the live version: " + xhr.status + " " + xhr.statusText);
			console.log("Loading fallback version at: " + input.fallback);
			loadFallBack();
		}

		if (status === "success") {
			input.def.resolve();
		}

	});
}

$.fn.folio = function(input) {

	selector = $(this)

	$('body').prepend('<div id="floating-folio"><a href="http://www.miamiherald.com" target="_blank" class="logoB"></a><div id="folio-info"><h2 class="small ral fat upper" style="position: relative; top: 10px; display: inline-block"><pre id="folio-title"></pre></h2></div><div class="clearfix"></div></div>')

	if (input.tracker === true) {
		$('#floating-folio').prepend('<div class="perc-holder"><div id="tracker"></div></div>');
	}

	$('#folio-title').text(input.folioTitle)
	$('#folio-info').append('<nav class="social-tools"><a class="share-icon twitter-share" href="http://twitter.com/home?status=' + input.pageTitle + '+' + input.shortUrl + ' via @MiamiHerald' + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon facebook-share" href="http://www.facebook.com/share.php?u=' + input.shortUrl + '&title=' + input.pageTitle + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon google-share" href="https://plus.google.com/share?url=' + input.shortUrl + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a></nav>')

	if (input.flat === true) {
		$('#floating-folio').show()
		$('body').css('margin-top', $('#floating-folio').outerHeight(true) + 'px')
	}

	$(window).scroll(function() {
		var $scrollTrigger = selector.outerHeight(true);
		var $windowTop = $(window).scrollTop();
		var $windowWidth = $(window).width();
		if ($windowTop > $scrollTrigger && $windowWidth > 920 && input.flat !== true) {
			$('#floating-folio').slideDown(200);
		}
		if ($windowTop < $scrollTrigger && $windowWidth > 920 && input.flat !== true) {
			$('#floating-folio').slideUp(200);
		}
		// RUN TRACKER
		$totalHeight = $('body').height() - $(window).height();
		$('#tracker').css('width', (($windowTop / $totalHeight) * 100) + '%');
	});

}

$.fn.quote = function(input) {
	$(this).after('<blockquote id="current" class="' + input.blockType + ' block-item quote-item"><p class="large heavier bright">&ldquo;' + input.quote + '&rdquo;</p><small class="block">' + input.attrib + '</small></blockquote>');

	if (typeof(input.citeSrc) !== 'undefined') {
		$('#current').attr('cite', input.citeSrc)
		$('#current small').append(' <a class="gray-link" href="' + input.citeSrc + '" target="_blank">Source &rarr;</a>')
	} else {
		return false
	}

	if (input.blockType === 'wide') {
		$('#current').addClass('align-center')
		$('#current p').removeClass('large').addClass('xlarge')
	}
	$('#current').removeAttr('id')
}

$.fn.video = function(input) {
	$(this).after('<figure class="' + input.blockType + ' block-item video-item"><iframe class="yt-embed" id="' + input.videoID + '" src="http://www.youtube.com/embed/' + input.videoID + '?modestbranding&showinfo=0" frameborder="0" allowfullscreen></iframe><figcaption><span class="vid-spr ral fat upper">' + input.videoTitle + '</span>  ' + input.videoCaption + '</figcaption></figure>');

	$('#' + input.videoID).height(function() {
		return $(this).width() / input.ratio
	})

}

$.fn.photo = function(input) {
	$(this).after('<figure class="' + input.blockType + ' block-item photo-item"><img src="' + input.url + '"alt="' + input.cutline + '"/><small class="photo-credit xsmall upper ral align-right block">' + input.credit + '</small><figcaption>' + input.cutline + '</figcaption><div class="clearfix"></div></figure>');
}

$.fn.refer = function(input) {
	$(this).after('<aside id="current" class="' + input.blockType + ' block-item comment-item"><h3 class="ral fat upper red">' + input.hed + '</h3><p>' + input.readout + ' </p></aside>');

	if (typeof(input.url) !== 'undefined') {
		$('#current > p').append('<a href="' + input.url + '">' + input.gotext + '</a>')
	}
	if (input.blockType === 'wide') {
		$('#current').removeClass('wide').addClass('right')
	}
	$('#current').removeAttr('id')

}

$.fn.simpleFooter = function(input) {

	$(this).append('<div class="footer-list ral upper fat xsmall" id="current"><a href="http://miamiherald.com" target="_blank" class="logoB-tiny"></a></nav>')

	$.each(input, function(i) {
		$('#current').append('<a href="' + input[i].url + '" target="_blank">' + input[i].name + '</a>')
	});
	$('#current').removeAttr('id');

}

// IN PROGRESS
$.fn.audio = function(input) {

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		var ieversion = new Number(RegExp.$1)
		if (ieversion <= 8) {
			console.log("Audio doesnt work here")
			return false
		}
	} else {
		console.log("Audio works here")


		$(this).after('<div id="' + input.name + '" class="'+input.blockType+' block-item audio-player"><audio><source src=' + input.oggsrc + ' type="audio/ogg"><source src=' + input.mp3src + ' type="audio/mp4"><p class="rob">Your browser does not support the audio element.</p></audio></div>');

		$theBox = $('#' + input.name)
		
		if (input.blockType === 'wide') {
			$theBox.removeClass('wide').addClass('right')
		}

		$theBox.append('<h4 class="fat upper ral gray small audio-tag">Audio</h4><h3 class="large ral heavier">' + input.headline + '</h3><p class="rob">' + input.readout + '</p><div class="audio-progress"><div class="audio-current-progress" id="audio-progress-' + input.name + '"></div></div><span class="play-button" id="' + input.name + '-play' + '"></span><span class="pause-button" id="' + input.name + '-pause' + '" style="display: none"></span><span class="replay-button" id="' + input.name + '-replay' + '" style="display: none"></span><small class="audio-time small gray ral float-right" style="display: none"><span class="current-time" id="' + input.name + '-ct' + '"></span> / <span class="total-time" id="' + input.name + '-tt' + '"></span></small>');

		// PLAY BUTTON CLICK
		$('#' + input.name + ' .play-button').click(function() {
			$.each($('audio'), function() {
				$(this)[0].pause();
			});
			$('#' + input.name + ' .audio-time').show()
			$('.pause-button').hide();
			$('.play-button').show();
			$('#' + input.name + ' audio')[0].play();
			$(this).hide();
			$('#' + input.name + ' .pause-button').show();
		});

		// PAUSE BUTTON CLICK
		$('#' + input.name + ' .pause-button').click(function() {
			$('#' + input.name + ' audio')[0].pause();
			$(this).hide();
			$('#' + input.name + ' .play-button').show();
		});

		// REPLAY BUTTON CLICK
		$('#' + input.name + ' .replay-button').click(function() {
			$(this).hide();
			$('#' + input.name + ' .pause-button').show();
			$('#' + input.name + ' audio')[0].currentTime = 0
			$('#' + input.name + ' audio')[0].play()
		});

		// HANDLE TIMEUPDATE
		$('#' + input.name + ' audio').on("timeupdate", function() {

			// HANDLE TOTAL TIME LOGIC
			$totalMin = Math.floor($('#' + input.name + ' audio')[0].duration / 60)
			$totalSec = Math.floor($('#' + input.name + ' audio')[0].duration % 60)
			$totalDur = $totalMin + ':' + $totalSec

			// HANDLE CURRENT TIME LOGIC
			$current = 0

			if ($('#' + input.name + ' audio')[0].currentTime < 60) {
				$current = Math.floor($('#' + input.name + ' audio')[0].currentTime)

				if ($current < 10) {
					$current = '0:0' + $current
				} else {
					$current = '0:' + $current
				}

			} else {

				$currentMin = Math.floor($('#' + input.name + ' audio')[0].currentTime / 60)
				$currentSec = Math.floor($('#' + input.name + ' audio')[0].currentTime % 60)

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

			$theBar.css('width', ($('#' + input.name + ' audio')[0].currentTime / $('#' + input.name + ' audio')[0].duration) * 100 + '%')

		});

		// HANDLE SCRUBBING
		$('#' + input.name + ' .audio-progress').click(function(e) {
			var $parentOffset = $(this).parent().offset();
			var $totalWidth = $(this).parent().width()

			var $relX = e.pageX - $parentOffset.left;
			var $relY = e.pageY - $parentOffset.top;

			console.log

			var $newTime = $('#' + input.name + ' audio')[0].duration * ($relX / $totalWidth)

			$('#' + input.name + ' audio')[0].currentTime = $newTime

			if ($('#' + input.name + ' audio')[0].paused == false) {
				$('#' + input.name + ' audio')[0].play();
			}
		});

		// HANDLE END OF AUDIO
		$('#' + input.name + ' audio').on('ended', function() {
			$('#' + input.name + ' .replay-button').show();
			$('#' + input.name + ' .play-button').hide();
			$('#' + input.name + ' .pause-button').hide();
		});

	}
}

$.fn.gallery = function(input) {

$(this).after('<aside class="wide block-item gallery-item" id="'
+input.name+
'"><div class="gallery-folio align-center"><h2>GALLERY: '
+input.title+
'</h2><aside class="counter"><span class="current"></span> / <span class="total"></span></aside></div><div class="clearfix"></div><header class="gallery-intro gallery-photo"><div class="gallery-header-wrapper align-center"><h2 class="gallery-title large heavier">'+input.title+'</h2><small class="upper ral">'+input.credit+'</small><p class="gallery-summary">'+input.summary+'</p><div class="grayActionButton" id="'+input.name+'-init">open gallery</div></div></header></aside>');

	$('#'+input.name).prepend('<div class="gallery-controller left-controller"></div><div class="gallery-controller right-controller"></div>')

		// data.reverse();
	$.each(input.array, function(i) {
		$('#'+input.name).append('<figure class="gallery-photo" data-order="'
		+(i+1)+
		'" style="z-index: '+((i*-1000)-1000)+'"><img src="'
		+input.array[i].url+
		'" /><figcaption>'
		+input.array[i].caption+
		'</figcaption></figure>');
	});
	
	// DEFINE A MIN-HEIGHT FOR GALLERY
	defineH();
	$('.gallery-photo[data-order="1"] figcaption').hide();

// INTERACTION

$('#'+input.name+'-init').click(function () {
	
	$totalImg = input.array.length
	$('#'+input.name+' .total').text($totalImg)
	$('#'+input.name+' .current').text(1)
	
	$currentImg = 1
	$('#'+input.name+' .gallery-intro').fadeOut(500);
	$('#'+input.name+' .right-controller').fadeIn(500);
	$('#'+input.name+' .gallery-folio').fadeTo(400,1);
	$('.gallery-photo[data-order="1"] > figcaption').fadeTo(400,1);
	
});

$('#'+input.name+' .right-controller').click(function () {
	
	$currentImg = $currentImg + 1
	$('#'+input.name+' .gallery-photo').hide();
	$('#'+input.name+' .gallery-photo[data-order="'+$currentImg+'"]').fadeIn(500);
	$('#'+input.name+' .current').text($currentImg)
	checkLimits();
});

$('#'+input.name+' .left-controller').click(function () {
	
	$currentImg = $currentImg - 1
	$('#'+input.name+' .gallery-photo').hide();
	$('#'+input.name+' .gallery-photo[data-order="'+$currentImg+'"]').fadeIn(500);
	$('#'+input.name+' .current').text($currentImg)
	checkLimits();
});

function checkLimits() {
	if ($currentImg === 1) {
		$('#'+input.name+' .left-controller').hide();
	} else {
		$('#'+input.name+' .left-controller').show();
	}
	if ($currentImg === input.array.length) {
		$('#'+input.name+' .right-controller').hide();
	} else {
		$('#'+input.name+' .right-controller').show();
	}
}

function defineH() {
	$setHeight = $(window).height() * .8
	$('#'+input.name).height($setHeight)
	
	$('#'+input.name+ ' .gallery-photo').height($setHeight);
	$('#'+input.name+ ' .gallery-photo img').height($setHeight*.83);
	$('#'+input.name+ ' .gallery-photo figcaption').height($setHeight*.1);
	
}

$(window).load(function() { defineH() });
$(window).resize(function() { defineH() });

}

// AD INSERTION

function initAds() {
	$('head').append('<!-- ADS --> <script type=\'text/javascript\'> var gptadslots=[]; var googletag = googletag || {}; googletag.cmd = googletag.cmd || []; (function(){ var gads = document.createElement(\'script\'); gads.async = true; gads.type = \'text/javascript\'; var useSSL = \'https:\' === document.location.protocol; gads.src = (useSSL ? \'https:\' : \'http:\') + \'//www.googletagservices.com/tag/js/gpt.js\'; var node = document.getElementsByTagName(\'script\')[0]; node.parentNode.insertBefore(gads, node); })(); </script> <script type="text/javascript"> googletag.cmd.push(function() { gptadslots[1]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[728,90]],\'div-gpt-ad-106911552261722130-1\').setTargeting(\'atf\',[\'Y\']).setTargeting(\'pos\',[\'1\']).addService(googletag.pubads()); gptadslots[2]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[300,250]],\'div-gpt-ad-106911552261722130-2\').setTargeting(\'atf\',[\'Y\']).setTargeting(\'pos\',[\'1\']).addService(googletag.pubads()); gptadslots[3]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[300,250]],\'div-gpt-ad-106911552261722130-3\').setTargeting(\'atf\',[\'N\']).setTargeting(\'pos\',[\'2\']).addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().setTargeting(\'pl\',[\'sectfront\']).setTargeting(\'sect\',[\'StaticSpecialSection\']); googletag.pubads().enableAsyncRendering(); googletag.enableServices(); }); </script>')
}

$.fn.ad = function(input) {
	$(this).after('<aside class="right block-item ad-item"><small class="ral upper xsmall block align-center gray">Advertisement</small>' + input + '</aside>');
}


