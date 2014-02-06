// SCRIPTS

$storyLoaded = new $.Deferred();

$('#story-holder').load('data/story.html', function () {
	$storyLoaded.resolve();
});

$.when($storyLoaded).then( function () {


$storyGrafs = $('#story-holder p')
$storyHeaders = $('#story-holder h2')

$storyGrafs.eq(0).addClass('leader-graf');
$storyGrafs.eq(1).addClass('leader-graf');
$storyGrafs.eq(2).addClass('leader-graf');
$storyGrafs.eq(3).addClass('leader-graf');

$storyHeaders.each( function () {
	$(this).next('p').addClass('withDrop');
	$(this).prev('p').css('margin-bottom','80px');
})

$storyHeaders.eq(0).verticalRight({
	'PhotoUrl' : 'img/programs/Kenneth_Cray.jpg',
	'Credit' : '',
	'Caption' : 'Kenneth Cray\'s funeral program.'
});

$storyHeaders.eq(1).verticalRight({
	'PhotoUrl' : 'img/programs/Shirley_Green.jpg',
	'Credit' : '',
	'Caption' : 'Shirley Green\'s funeral program.'
});

$storyHeaders.eq(2).verticalRight({
	'PhotoUrl' : 'img/programs/Chassity_Lester.jpg',
	'Credit' : '',
	'Caption' : 'Chassity Lester\'s funeral program.'
});

$storyHeaders.eq(3).verticalRight({
	'PhotoUrl' : 'img/programs/Brandon_Jordan.jpg',
	'Credit' : '',
	'Caption' : 'Brandon Jordan\'s funeral program.'
});

$storyHeaders.eq(4).verticalRight({
	'PhotoUrl' : 'img/programs/John_Johnson_III.jpg',
	'Credit' : '',
	'Caption' : 'John James Johnson III\'s funeral program.'
});

$storyHeaders.eq(5).verticalRight({
	'PhotoUrl' : 'img/programs/Harold_Green.jpg',
	'Credit' : '',
	'Caption' : 'Harold Green\'s funeral program.'
});

$storyHeaders.eq(7).verticalRight({
	'PhotoUrl' : 'img/programs/Steven_Johnson.jpg',
	'Credit' : '',
	'Caption' : 'Steven Johnson\'s funeral program.'
});

$storyHeaders.eq(8).verticalRight({
	'PhotoUrl' : 'img/programs/Darius_Washington.jpg',
	'Credit' : '',
	'Caption' : 'Darius Washington\'s funeral program.'
});

$storyHeaders.eq(9).verticalRight({
	'PhotoUrl' : 'img/programs/Alyssa_Jackson.jpg',
	'Credit' : '',
	'Caption' : 'Alyssa Jackson\'s funeral program.'
});

// THE GALLERY

$storyGrafs.eq(86).buildGallery({
	'arrayUrl' : 'data/brandon-jordan-gallery.js',
	'gData' : '$brandonGallery',
	'gName' : 'brandon-gallery',
	'gTitle' : 'Brandon Jordan\'s Funeral',
	'gSummary' : 'Bentley and Sons Funeral Home',
	'gCredit' : 'Photos by Grant Blankenship',
	'setLength' : 6
})

$storyGrafs.eq(3).singlePhoto({
	'PhotoUrl' : 'img/john-johnson-3.jpg',
	'Credit' : 'Photo by Grant Blankenship / The Telegraph',
	'Caption' : 'A photo of John James Johnson III is unfolded as a part of a commemorative  blanket during his funeral in April. Two men were charged with Johnson\'s murder.'
});

$storyGrafs.eq(26).singlePhoto({
	'PhotoUrl' : 'img/john-johnson-4.jpg',
	'Credit' : 'Photo by Grant Blankenship/The Telegraph',
	'Caption' : 'The funeral of John James Johnson III, aged 18.'
});

$storyGrafs.eq(120).twinPhotos({
	'firstPhotoUrl' : 'img/john-johnson-2.jpg',
	'secondPhotoUrl' : 'img/john-johnson.jpg',
	'Credit' : 'Photos by Grant Blankenship / The Telegraph',
	'Caption' : 'Scenes from the funeral of John James Johnson III in April. Two men were charged with Johnson\'s murder.'
});

$storyHeaders.eq(9).singlePhoto({
	'PhotoUrl' : 'img/alyssa-jackson.jpg',
	'Credit' : 'Photo by Woody Marshall / The Telegraph',
	'Caption' : 'About 200 people crowd around candles arranged to spell RIP Lyssa at a vigil for Alyssa Jackson Sunday night. Jackson was killed in a drive-by shooting in November.'
});

$storyGrafs.eq(173).twinPhotos({
	'firstPhotoUrl' : 'img/alyssa-jackson-2.jpg',
	'secondPhotoUrl' : 'img/alyssa-jackson-3.jpg',
	'Credit' : 'Photos by Woody Marshall / The Telegraph',
	'Caption' : 'About 200 people attended a candle light vigil for Alyssa Jackson Sunday night. Jackson was killed in a drive-by shooting in November.'
});

$storyHeaders.eq(6).singlePhoto({
	'PhotoUrl' : 'img/jamonni-bland.jpg',
	'Credit' : 'Photo by Grant Blankenship / The Telegraph',
	'Caption' : 'Friends of Jamonni Bland outside his funeral in July. Bland, 17, was killed outside the Zodiac Lounge nightclub in Macon. Eventually eight people would be indicted in the incident in which five other people were shot.'
});

$storyGrafs.eq(145).singlePhoto({
	'PhotoUrl' : 'img/jamonni-bland-2.jpg',
	'Credit' : 'Photo by Grant Blankenship / The Telegraph',
	'Caption' : 'The family of Jamonni Bland enters his funeral in July. Bland, 17, was killed outside the Zodiac Lounge nightclub in Macon. Eventually eight people would be indicted in the incident in which five other people were shot.'
});

$('body').simpleFooter({
'listArray' : [
{
	'name' : 'Terms of Use',
	'url' : 'http://www.macon.com/terms_of_service#navlink=mi_footer'
},
{
	'name' : 'Privacy Policy',
	'url' : 'http://www.macon.com/privacy_policy#navlink=mi_footer'
},
{
	'name' : 'Copyright',
	'url' : 'http://www.macon.com/copyright#navlink=mi_footer'
},
{
	'name' : 'Contact us',
	'url' : 'http://www.macon.com/contact_us/#navlink=footer'
}
]
});

// END BUILDING

paintHeader(); // PAINT HEADER ON LOAD

});

// SMOOTH SCROLL

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 800);
    return false;
});

// PAINT THE HEADER

function paintHeader() {
	$('#headline-holder').css({
		'margin-top': function() {
			return  $('#headline-holder').outerHeight() * -.50 
		}
	})
}


$(window).resize(function() {
	paintHeader(); // PAINT HEADER ON LOAD
});
