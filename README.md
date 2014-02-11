#Sinclair

Sinclair aims to create an easy-to-use, multi-media, responsively designed template for online news packages. Based on Javascript with heavy use of CSS, Sinclair allows multimedia objects to be incorporated on a paragraph-by-paragraph basis with text.

The project was pioneered by Lazaro Gamio with The Miami Herald. It's now an official project of The McClatchy Company, which is aiming to create a user-friendly template that can be used by McClatchy properties and other organizations which follow the open MIT license.

The Miami Herald has made significant use of Sinclair. The first use of Sinclair outside Miami was [The Telegraph of Macon's "Nine Funerals" package](http://www.macon.com/static/media/projects/nine-funerals/). The goal is to make this project more usable, and more often used.

For more information, refer to the documentation file in the main folder, sinclair-docs.htm.

##Origins of the name

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
*`scrapeResource` the element on the page you're trying to scrape
*`fallback` location of the fallback html you will load if the scrape fails
*`def` the aforementioned deferred object to resolve when load has occurred.

Almost all elements will have a `blockType` option, which will define whether they float left, right, or take up the width of the story well.

###Photos

	$story.eq(0).photo({
		'blockType': 'wide',
		'url' : 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/15/1360937072371/David-Bowie-1973-008.jpg',
		'credit' : 'Photo by Peter B. Sinclair / For the Miami Herald',
		'cutline' : 'This is a picture of what Peter B. Sinclair looked like when he was following David Bowie on the Ziggy Stardust tour.'
	});

#####Options
*`blockType` layout size and position. Accepts `wide`,`right` or `left`
*`url` location of the image
*`credit` text that will appear in the credit field
*`cutline` the caption for the photo

###Blockquote

	$story.eq(1).quote({
		'blockType': 'wide',
		'quote': 'This is an example of a nice big quote that runs in different positions',
		'attrib': '<strong>Peter B. Sinclair,</strong> The namesake of this thing',
		'citeSrc': 'http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html'
	});
	
#####Options
*`blockType` layout size and position. Accepts `wide`,`right` or `left`
*`quote` the text for the quote
*`attrib` who said the quote; can contain HTML
*`citeSrc` source for the quote (optional)
	
###Video

	$story.eq(2).video({
		'blockType': 'right',
		'videoID': 'GUNHbU7LnM4',
		'videoTitle': 'Video Title test',
		'videoCaption': 'test test test test test test test',
		'ratio': 1.77
	});
	
#####Options
*`blockType` layout size and position. Accepts `wide`,`right` or `left`
*`videoID` ID of youtube video
*`videoTitle` name of video
*`videoCaption` small description for video
*`ratio` video width / height; for making sure the video retains aspect ratio
