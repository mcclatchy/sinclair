// TESTING SINCLAIR
// DEFINE A DEFERRED OBJECT
$load = new $.Deferred();

// LOAD YOUR CONTENT INTO A DIV

$('#article-wrapper').loadContent({
	'scrapeResource': 'http://www.miamiherald.com/2014/02/11/3927377/poll-shows-outsized-support-for.html #storyBodyContent p',
	'fallback': 'data.html',
	'def': $load
});

// BEGIN LAYOUT CODE BLOCK

$.when($load).then(function() {

	$('#splash').folio({
	'pageTitle' : 'The Sinclair Project demo page',
	'folioTitle' : 'Sinclair Demo',
	'shortUrl' : 'https://github.com/mcclatchy/sinclair',
	'flat' : true,
	'tracker' : true
	});

	$('body').simpleFooter([
	{
		'name' : 'Terms of Service',
		'url' : 'http://www.miamiherald.com/terms_of_service'
	},
	{
		'name' : 'Privacy Policy',
		'url' : 'http://www.miamiherald.com/privacy_policy'
	},
	{
		'name' : 'Copyright',
		'url' : 'http://www.miamiherald.com/copyright'
	},
	{
		'name' : 'Contact us',
		'url' : 'http://www.miamiherald.com/contact-us'
	}
	]);

	// DEFINE YOUR PARAGRAPHS
	
	$story = $('#article-wrapper p')
	// $story.layoutMode()
	// BEGIN LAYOUT LOGIC HERE
	
	// BLOCKQUOTE EXAMPLE
	$story.eq(0).quote({
		'blockType': 'wide',
		'quote': 'This is an example of a nice big quote that runs in different positions',
		'attrib': '<strong>Peter B. Sinclair,</strong> The namesake of this thing',
		'citeSrc': 'http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html'
	});
	
	// VIDEO EXAMPLE
	$story.eq(1).video({
		'blockType': 'right',
		'videoID': 'GUNHbU7LnM4',
		'videoTitle': 'Video Title test',
		'videoCaption': 'test test test test test test test',
		'ratio': 1.77
	});
	
	// PHOTO EXAMPLE
	$story.eq(2).photo({
		'blockType': 'wide',
		'url' : 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/15/1360937072371/David-Bowie-1973-008.jpg',
		'credit' : 'Photo by Peter B. Sinclair / For the Miami Herald',
		'cutline' : 'This is a picture of what Peter B. Sinclair looked like when he was following David Bowie on the Ziggy Stardust tour.'
	});
	
	// REFER EXAMPLE
	$story.eq(3).refer({
		'blockType': 'right',
		'hed' : 'Little refer',
		'readout' : 'Hello there! I\'m a little box that can serve as an aside to the story',
		'url' : 'http://www.miamiherald.com',
		'gotext' : 'Go do something'
	});
	
	// initAds();
	// 
	// $story.eq(5).ad('<div id="div-gpt-ad-106911552261722130-3"><script type="text/javascript">googletag.cmd.push(function() { googletag.display("div-gpt-ad-106911552261722130-3"); });</script></div>')
	
	$story.eq(7).photo({
		'blockType': 'splash',
		'url' : 'http://miriadna.com/desctopwalls/images/max/Fairy-forest.jpg',
		'credit' : 'Photo by Peter B. Sinclair / For the Miami Herald',
		'cutline' : 'This is a picture of what Peter B. Sinclair looked like when he was following David Bowie on the Ziggy Stardust tour.'
	});
	
	$story.eq(9).audio({
		'blockType' : 'wide',
		'name' : 'second-audio',
		'mp3src' : 'http://www.tonycuffe.com/mp3/tailtoddle_lo.mp3',
		'oggsrc' : 'http://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
		'headline' : 'Hello there! Testing sound!',
		'readout' : 'This is an example of an html5 audio player usable in sinclair that accepts the same audio file in mp3 and ogg formats to be compliant will all modern browsers.'
	});

});
