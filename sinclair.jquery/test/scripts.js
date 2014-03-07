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
	
	$('#splash').simplehed({
		'hed' : 'The title of the story',
		'summary' : 'The quick brown fox jumps over the lazy dog'
	})
	
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
	
	//Map example
	$story.eq(5).stateMap({
	blockType:"right",
		hed:"McClatchy states",
		readout:"States with McClatchy newspapers across the country.",
		attrib:"McClatchy",
		citeSrc:'http://www.mcclatchy.com/2006/06/09/354/daily.html',
		states:{
			AK:"#e07725",
			CA:"#e07725",
			DC:"#e07725",
			FL:"#e07725",
			GA:"#e07725",
			ID:"#e07725",
			IL:"#e07725",
			KS:"#e07725",
			KY:"#e07725",
			MO:"#e07725",
			MS:"#e07725",
			NC:"#e07725",
			PA:"#e07725",
			SC:"#e07725",
			TX:"#e07725",
			WA:"#e07725"
		}
	});
	
	$story.eq(9).audio({
		'blockType' : 'wide',
		'name' : 'second-audio',
		'mp3src' : 'http://www.tonycuffe.com/mp3/tailtoddle_lo.mp3',
		'oggsrc' : 'http://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
		'headline' : 'Hello there! Testing sound!',
		'readout' : 'This is an example of an html5 audio player usable in sinclair that accepts the same audio file in mp3 and ogg formats to be compliant will all modern browsers.'
	});

	$story.eq(12).gallery({
		'array' : [
		{
			'url' : 'http://media1.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/ss-110921-hydro-puppy/ss-110921-hydro-puppy-01.grid-8x2.jpg',
			'caption' : 'this is a test 1'
		},
		{
			'url' : 'http://25.media.tumblr.com/598e7c3662fcc5c64e630fdbedf15867/tumblr_mxp9xmAEDv1qf6rvbo1_500.jpg',
			'caption' : 'this is a test 2'
		},
		{
			'url' : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT--MEIvmKfE5K-zlLTXLIolztNVmkvbUPpgh54-sT6Ypx8L6jv',
			'caption' : 'this is a test 3'
		},
		],
		'name' : 'test-gallery',
		'title' : 'A puppy gallery',
		'summary' : 'This is a three image gallery to test the gallery function',
		'credit' : 'Photos by Peter B. Sinclair'
	})

});
