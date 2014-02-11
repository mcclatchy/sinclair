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
	
	console.log('done pulling in content')
	
	// DEFINE YOUR PARAGRAPHS
	
	$story = $('#article-wrapper p')
	
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

});
