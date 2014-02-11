// HERALDSCRIPT
// INITIATE LAYOUT MODE

function layoutMode() {

	$('#story-holder > p').each(function(index) {
		$(this).before('<h4 class="graf-label">Graf ' + (index + 1) + ' </h4>');
		$(this).css('background', '#eee').css('border-bottom', '1px dashed #666');
	});

}

function initAds() {
	$('head').append('<!-- ADS --> <script type=\'text/javascript\'> var gptadslots=[]; var googletag = googletag || {}; googletag.cmd = googletag.cmd || []; (function(){ var gads = document.createElement(\'script\'); gads.async = true; gads.type = \'text/javascript\'; var useSSL = \'https:\' === document.location.protocol; gads.src = (useSSL ? \'https:\' : \'http:\') + \'//www.googletagservices.com/tag/js/gpt.js\'; var node = document.getElementsByTagName(\'script\')[0]; node.parentNode.insertBefore(gads, node); })(); </script> <script type="text/javascript"> googletag.cmd.push(function() { gptadslots[1]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[728,90]],\'div-gpt-ad-106911552261722130-1\').setTargeting(\'atf\',[\'Y\']).setTargeting(\'pos\',[\'1\']).addService(googletag.pubads()); gptadslots[2]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[300,250]],\'div-gpt-ad-106911552261722130-2\').setTargeting(\'atf\',[\'Y\']).setTargeting(\'pos\',[\'1\']).addService(googletag.pubads()); gptadslots[3]= googletag.defineSlot(\'/7675/MIA.site_miamiherald/News\', [[300,250]],\'div-gpt-ad-106911552261722130-3\').setTargeting(\'atf\',[\'N\']).setTargeting(\'pos\',[\'2\']).addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().setTargeting(\'pl\',[\'sectfront\']).setTargeting(\'sect\',[\'StaticSpecialSection\']); googletag.pubads().enableAsyncRendering(); googletag.enableServices(); }); </script>')
}

// FLOATING FOLIO SUBROUTINE


function initFloatingFolio(input) {

	$('body').prepend('<div id="floatingFolio"><a href="http://www.miamiherald.com" target="_blank" class="logoB"></a><div id="folioInfo"><h2 class="small ral fat upper" style="position: relative; top: 10px; display: inline-block"><pre id="folioTitle"></pre></h2></div><div class="clearfix"></div></div>')

	if (input.tracker === true) {
		$('#floatingFolio').prepend('<div class="perc_holder"><div id="tracker"></div></div>');
	}

	$('#folioTitle').text(input.folioTitle)
	$('#folioInfo').append('<nav class="social-tools"><a class="share-icon twitter-share" href="http://twitter.com/home?status=' + input.pageTitle + '+' + input.shortUrl + ' via @MiamiHerald' + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon facebook-share" href="http://www.facebook.com/share.php?u=' + input.shortUrl + '&title=' + input.pageTitle + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon google-share" href="https://plus.google.com/share?url=' + input.shortUrl + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a></nav>')
	$(window).scroll(function() {
		var $scrollTrigger = $('header').eq(0).outerHeight(true);
		var $windowTop = $(window).scrollTop();
		var $windowWidth = $(window).width();
		if ($windowTop > $scrollTrigger && $windowWidth > 920) {
			$('#floatingFolio').slideDown(500);
		}
		$totalHeight = selector.height();
		$('#tracker').css('width', (($windowTop / $totalHeight) * 100) + '%');
	});
}

// STATIC FOLIO SUBROUTINE


function initStaticFolio(input) {
	selector.prepend('<div id="staticFolio"><a class="logoB" href="http://www.miamiherald.com" target="_blank"></a><nav class="social-tools taupeBox"><span class="red ral small upper fat" style="position:relative; top: -4px">Share </span><a class="share-icon twitter-share" href="http://twitter.com/home?status=' + input.pageTitle + '+' + input.shortUrl + ' via @MiamiHerald' + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon facebook-share" href="http://www.facebook.com/share.php?u=' + input.shortUrl + '&title=' + input.pageTitle + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a><a class="share-icon google-share" href="https://plus.google.com/share?url=' + input.shortUrl + '" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a></nav><div class="clearfix"></div></div>')
}

$.fn.initFolios = function(input) {

	selector = $(this)

	if (input.flat !== false && input.flat !== '') {

		initStaticFolio({
			'pageTitle': input.pageTitle,
			'folioTitle': input.folioTitle,
			'shortUrl': input.shortUrl
		});

	}

	if (input.floater !== false && input.floater !== '') {

		initFloatingFolio({
			'pageTitle': input.pageTitle,
			'folioTitle': input.folioTitle,
			'shortUrl': input.shortUrl,
			'tracker': input.tracker
		});

	}

}

function initFooter(input) {
	$('body').append('<footer id="footer"><aside id="footerAd"><span>advertisement</span><div id="div-gpt-ad-106911552261722130-1"><script type="text/javascript">googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-106911552261722130-1\'); });</script><div id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0" name="google_ads_iframe_/7675/MIA.site_miamiherald/News_0" width="728" height="90" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style=\'background:transparent\'></body></html>&quot;" style="border: 0px; vertical-align: bottom;"></iframe></div><iframe id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__hidden__" name="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__hidden__" width="0" height="0" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style=\'background:transparent\'></body></html>&quot;" style="border: 0px; vertical-align: bottom; visibility: hidden; display: none;"></iframe></div></aside><div class="clearfix"></div><div id="fb-root"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=133847067760"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script><h2 class="footer_head" style="font-size: 2em;">Join the discussion</h2><p>The Miami Herald is pleased to provide this opportunity to share information, experiences and observations about what\'s in the news. Some of the comments may be reprinted elsewhere on the site or in the newspaper. We encourage lively, open debate on the issues of the day, and ask that you refrain from profanity, hate speech, personal comments and remarks that are off point. Thank you for taking the time to offer your thoughts.</p><p>The Miami Herald uses Facebook\'s commenting system. You need to log in with a Facebook account in order to comment. If you have questions about commenting with your Facebook account, click <a target="_blank" href="http://www.miamiherald.com/2013/02/06/3221150/commenting-faq.html">here</a>.</p><p><span style="font-weight:bold;">Have a news tip?</span> You can send it anonymously.  Click <a target="_blank" href="http://www.miamiherald.com/2009/08/14/1186127/got-news.html">here</a> to send us your tip - or - consider joining the <a target="_blank" href="http://www.miamiherald.com/insight/">Public Insight Network</a> and become a source for The Miami Herald and el Nuevo Herald.</p><div class="fb-comments" data-href="' + input.url + '" data-num-posts="10" data-colorscheme="dark"></div><div class="clearfix"></div><div id="footer-info"><a href="http://www.miamiherald.com"><img id="footer-logo" src="http://media.miamiherald.com/static/testdir/mast2013/miamiheraldlogo43.png"/></a><ul class="footer-list"><a href="http://www.miamiherald.com/terms_of_service"target="_blank">Terms of Service</a><a href="http://www.miamiherald.com/priacy_service"target="_blank">Privacy Policy</a><a href="http://www.miamiherald.com/copyright" target="_blank">Copyright</a><a href="http://www.miamiherald.com/contact-us" target="_blank">Contact us</a></div></footer>');

}

$.fn.byline = function(input) {

	selector = $(this)

	selector.append('<aside class="byline center"><small class="b-name upper ral fat block">By ' + input.name + '</small><a href="mailto:' + input.email + '"class="b-email upper ral normal small block">' + input.email + '</a><span class="b-time upper ral normal xsmall block red">' + input.timeType + ' <time>' + input.time + '</time></span></aside>');

}
// BUILD DOUBLE PHOTO ARRAY
$.fn.twinPhotos = function(input) {
	$(this).after('<div class="photo-array double-wide"><figure class="left float-left"><img src="' + input.firstPhotoUrl + '"alt="' + input.Caption + '"/></figure><figure class="right"><img src="' + input.secondPhotoUrl + '" alt="' + input.Caption + '"/></figure><div class="clearfix"></div><small class="photo-credit xsmall upper ral normal right">' + input.Credit + '</small><figcaption>' + input.Caption + '</figcaption></div>');
}



// AD INSERTION

function UinsertAdOne(afterGraf) {
	$storyGraf.eq(afterGraf - 1).before("<aside class='square-ad blockEl'><span>Advertisement</span><div id='div-gpt-ad-106911552261722130-2'><script type='text/javascript'>googletag.cmd.push(function() { googletag.display('div-gpt-ad-106911552261722130-2'); });</script></div></aside>");
}

function UinsertAdTwo(afterGraf) {
	$storyGraf.eq(afterGraf - 1).before("<aside class='square-ad blockEl'><span>Advertisement</span><div id='div-gpt-ad-106911552261722130-3'><script type='text/javascript'>googletag.cmd.push(function() { googletag.display('div-gpt-ad-106911552261722130-3'); });</script></div></aside>");
}

function UinsertBannerAd(afterGraf) {
	$storyGraf.eq(afterGraf - 1).after('<aside id="footerAd"><span>advertisement</span><div id="div-gpt-ad-106911552261722130-1"><script type="text/javascript">googletag.cmd.push(function() { googletag.display(\'div-gpt-ad-106911552261722130-1\'); });</script><div id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__container__" style="border: 0pt none;"><iframe id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0" name="google_ads_iframe_/7675/MIA.site_miamiherald/News_0" width="728" height="90" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style=\'background:transparent\'></body></html>&quot;" style="border: 0px; vertical-align: bottom;"></iframe></div><iframe id="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__hidden__" name="google_ads_iframe_/7675/MIA.site_miamiherald/News_0__hidden__" width="0" height="0" scrolling="no" marginwidth="0" marginheight="0" frameborder="0" src="javascript:&quot;<html><body style=\'background:transparent\'></body></html>&quot;" style="border: 0px; vertical-align: bottom; visibility: hidden; display: none;"></iframe></div></aside><div class="clearfix"></div>');
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

	selector = $(this)

	selector.append('<div class="footer-list" id="current"><a href="http://miamiherald.com" target="_blank" class="logoB-tiny"></a></nav>')

	$.each(input.listArray, function(i) {
		$('#current').append('<a href="' + input.listArray[i].url + '" target="_blank">' + input.listArray[i].name + '</a>')
	});
	$('#current').removeAttr('id');

}
