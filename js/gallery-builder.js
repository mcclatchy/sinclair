$.fn.buildGallery = function(input) {

$(this).after('<aside class="gallery double-wide" id="'+input.gName+'"><div class="gallery-folio"><h2>GALLERY: '+input.gTitle+'</h2><aside class="counter"><span class="current"></span> / <span class="total"></span></aside></div><div class="clearfix"></div><header class="gallery-intro gallery-item"><div class="gallery-header-wrapper"><h2 class="gallery-title">'+input.gTitle+'</h2><small>'+input.gCredit+'</small><p class="gallery-summary">'+input.gSummary+'</p><div class="grayActionButton" id="'+input.gName+'-init">open gallery</div></div></header></aside>');

	$('#'+input.gName).prepend('<div class="gallery-controller left-controller"></div><div class="gallery-controller right-controller"></div>')

// GET THE JSON
$.getJSON( input.arrayUrl, function( data ) {

	// BUILD THE GALLERY STUFF

		// data.reverse();

	$.each(data, function(i) {
		$('#'+input.gName).append('<figure class="gallery-item" data-order="'
		+(i+1)+
		'" style="z-index: '+((i*-1000)-1000)+'"><img src="'
		+data[i].PhotoUrl+
		'" /><figcaption>'
		+data[i].Caption+
		'</figcaption></figure>');
	});

}).done( function() {
	
	// DEFINE A MIN-HEIGHT FOR GALLERY
	defineH();
	$('.gallery-item[data-order="1"] figcaption').hide();
});

// INTERACTION

$('#'+input.gName+'-init').click(function () {
	
	$totalImg = ($('#'+input.gName+' .gallery-item').length) - 1
	$('#'+input.gName+' .total').text($totalImg)
	$('#'+input.gName+' .current').text(1)
	
	$currentImg = 1
	$('#'+input.gName+' .gallery-intro').fadeOut(500);
	$('#'+input.gName+' .right-controller').fadeIn(500);
	$('#'+input.gName+' .gallery-folio').fadeIn(500);
	$('.gallery-item[data-order="1"] figcaption').fadeIn(500);
	
});

$('#'+input.gName+' .right-controller').click(function () {
	
	$currentImg = $currentImg + 1
	$('#'+input.gName+' .gallery-item').hide();
	$('#'+input.gName+' .gallery-item[data-order="'+$currentImg+'"]').fadeIn(500);
	$('#'+input.gName+' .current').text($currentImg)
	checkLimits();
});

$('#'+input.gName+' .left-controller').click(function () {
	
	$currentImg = $currentImg - 1
	$('#'+input.gName+' .gallery-item').hide();
	$('#'+input.gName+' .gallery-item[data-order="'+$currentImg+'"]').fadeIn(500);
	$('#'+input.gName+' .current').text($currentImg)
	checkLimits();
});

function checkLimits() {
	if ($currentImg == 1) {
		$('#'+input.gName+' .left-controller').hide();
	} else {
		$('#'+input.gName+' .left-controller').show();
	}
	if ($currentImg == input.setLength) {
		$('#'+input.gName+' .right-controller').hide();
	} else {
		$('#'+input.gName+' .right-controller').show();
	}
}

function defineH() {
	$setHeight = $(window).height() * .8
	$('#'+input.gName).height($setHeight)
	
	$('#'+input.gName+ ' .gallery-item').height($setHeight);
	$('#'+input.gName+ ' .gallery-item img').height($setHeight*.83);
	$('#'+input.gName+ ' .gallery-item figcaption').height($setHeight*.1);
	
}

$(window).load(function() { defineH(); });
$(window).resize(function() { defineH(); });

}