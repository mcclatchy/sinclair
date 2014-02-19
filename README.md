#Sinclair

Sinclair aims to create an easy-to-use, multi-media, responsively designed template for online news packages. Based on Javascript with heavy use of CSS, Sinclair allows multimedia objects to be incorporated on a paragraph-by-paragraph basis with text.

The project was pioneered by Lazaro Gamio with The Miami Herald. It's now an official project of The McClatchy Company, which is aiming to create a user-friendly template that can be used by McClatchy properties and other organizations which follow the open MIT license.

The Miami Herald has made significant use of Sinclair. The first use of Sinclair outside Miami was [The Telegraph of Macon's "Nine Funerals" package](http://www.macon.com/static/media/projects/nine-funerals/). The goal is to make this project more usable, and more often used.

For more information, refer to the documentation file in the main folder, sinclair-docs.htm.

#####Origins of the name

The fine folks at the Chicago Tribune's news apps team named [one of their apps after Ida Tarbell](http://tarbell.tribapps.com/), a muckraking journalist. It would be easy and wrong to assume this app is named after Upton Sinclair, author of "The Jungle."

[The Miami Herald explored the long, strange history of the name Peter B. Sinclair](http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html) in a way that must be fully read to be appreciated.

##Basic Functions

###Loading your content

Content is loaded by invoking a method on a container in which to load content. First, we define a deferred object that gets resolved once content is loaded. Presently, there are two methods for adding content: Scraping paragraphs from an existing story, or loading from a static HTML file in the local directory.

	// CREATE YOUR DEFERRED OBJECT

	$load = new $.Deferred();

	// LOAD YOUR CONTENT INTO AN ELEMENT

	$('#article-wrapper').loadContent({
		'scrapeResource': 'http://www.miamiherald.com/2014/02/11/3927377/poll-shows-outsized-support-for.html #storyBodyContent p',
		'fallback': 'data.html',
		'def': $load
	});

	// RUN YOUR LAYOUT ONLY AFTER YOUR OBJECT GETS RESOLVED

	$.when($load).then(function() {
		// LAYOUT LOGIC GOES HERE
	});

#####Options
* `scrapeResource` the element on the page you're trying to scrape
* `fallback` location of the fallback html you will load if the scrape fails
* `def` the aforementioned deferred object to resolve when load has occurred

###Layout mode

	$story.layoutMode()

This method adds number labels to each paragraph to help deduce where assets will go.

###Adding a Folio

This method should be invoked on a header-like element near the beginning of the page.

	$('#splash').folio({
	'pageTitle' : 'The Sinclair Project demo page',
	'folioTitle' : 'Sinclair Demo',
	'shortUrl' : 'https://github.com/mcclatchy/sinclair',
	'flat' : true,
	'tracker' : true
	})
	
#####Options

* `pageTitle` text used to build a custom tweet in the share tools. It is the long name of the page
* `folioTitle` text used next to the logo in the folio. It is the short name of the page
* `shortUrl` shortened url build to concatenate the custom tweet with `pageTitle`
* `flat` *boolean* if `true`, folio is fixed to top of page; if `false`, folio slides down after user scrolls past element upon which the method was invoked
* `tracker` builds progress bar fixed to top of folio

###Adding a simple footer

This method adds a simple footer based on an array of name-url objects

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
	}
	]);

##Basic Elements

Almost all elements will have a `blockType` option, which will define whether they float left, right, or take up the width of the story well.

###Photos

	$story.eq(0).photo({
		'blockType': 'wide',
		'url' : 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/15/1360937072371/David-Bowie-1973-008.jpg',
		'credit' : 'Photo by Peter B. Sinclair / For the Miami Herald',
		'cutline' : 'This is a picture of what Peter B. Sinclair looked like when he was following David Bowie on the Ziggy Stardust tour.'
	});

#####Options
* `blockType` layout size and position. Accepts `wide`,`right`,`left` and `splash`, which is specific for photos, and strips the image full-width
* `url` location of the image
* `credit` text that will appear in the credit field
* `cutline` the caption for the photo

###Blockquote

	$story.eq(1).quote({
		'blockType': 'wide',
		'quote': 'This is an example of a nice big quote that runs in different positions',
		'attrib': '<strong>Peter B. Sinclair,</strong> The namesake of this thing',
		'citeSrc': 'http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html'
	});
	
#####Options
* `blockType` layout size and position. Accepts `wide`,`right` or `left`
* `quote` the text for the quote
* `attrib` who said the quote; can contain HTML
* `citeSrc` source for the quote (optional)

###Refer

	$story.eq(2).refer({
		'blockType': 'right',
		'hed' : 'Little refer',
		'readout' : 'Hello there! I\'m a little box that can serve as an aside to the story',
		'url' : 'http://www.miamiherald.com',
		'gotext' : 'Go do something'
	});
	
#####Options
* `blockType` layout size and position. Accepts `right` or `left`; if set to `wide`, defaults back to right
* `hed` label for refer
* `readout` body text for refer
* `url` url for link after refer body text (optional)
* `gotext` link text; dependent on `url` being declared
	
###Video

	$story.eq(3).video({
		'blockType': 'right',
		'videoID': 'GUNHbU7LnM4',
		'videoTitle': 'Video Title test',
		'videoCaption': 'test test test test test test test',
		'ratio': 1.77
	});
	
#####Options
* `blockType` layout size and position. Accepts `wide`,`right` or `left`
* `videoID` ID of youtube video
* `videoTitle` name of video
* `videoCaption` small description for video
* `ratio` video width / height; for making sure the video retains aspect ratio

##Methods in progress 

###Audio

This method adds an HTML5 audio player to the page. It requires both .mp3 and .ogg files to comply with standards.

	$story.eq(9).audio({
		'blockType' : 'left',
		'name' : 'second-audio',
		'mp3Src' : 'http://www.tonycuffe.com/mp3/tailtoddle_lo.mp3',
		'oggSrc' : 'http://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg',
		'headline' : 'Hello there! Testing sound!',
		'readout' : 'This is an example of an html5 audio player usable in sinclair that accepts the same audio file in mp3 and ogg formats to be compliant will all modern browsers.'
	});

#####Options
* `blockType` layout size and position. Accepts `right`,`left` setting to `wide` will default this setting to `right`
* `name` a unique name to identify the audio-player; this is necessary to make sure interactions are kept track of properly when there are multiple audio players on the page.
* `mp3src` the url of the mp3 file for the player
* `oggsrc` the url of the ogg file for the player
* `headline` a small headline for the audio
* `readout` a small description for the the audio

###Gallery

This method builds a gallery out of an array of url-caption objects.

	$story.eq(12).gallery({
		'array' : [
		{
			'url' : 'http://media1.s-nbcnews.com/j/MSNBC/Components/Slideshows/_production/ss-110921-hydro-puppy/ss-110921-hydro-puppy-01.grid-8x2.jpg',
			'caption' : 'this is a test 1'
		},
		{
			'url' : 'http://25.media.tumblr.com/598e7c3662fcc5c64e630fdbedf15867/tumblr_mxp9xmAEDv1qf6rvbo1_500.jpg',
			'caption' : 'this is a test 2'
		}
		],
		'name' : 'test-gallery',
		'title' : 'A puppy gallery',
		'summary' : 'This is a three image gallery to test the gallery function',
		'credit' : 'Photos by Peter B. Sinclair'
	})

#####Options
* `array` an array of photo objects with `url` and `caption` properties. It can be declared inline, or as a variable.
* `name` a unique name to identify the gallery; this is necessary to make sure interactions are kept track of properly when there are multiple galleries on the page.
* `title` the human-readable name for the gallery
* `summary` a small description of the gallery
* `credit` a place to credit who took the photos

###Ads

	$story.eq(5).ad('<ad>HTML</ad>')
	
This method (for now) accepts raw HTML as the input.