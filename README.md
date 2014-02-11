#Sinclair

Sinclair aims to create an easy-to-use, multi-media, responsively designed template for online news packages. Based on Javascript with heavy use of CSS, Sinclair allows multimedia objects to be incorporated on a paragraph-by-paragraph basis with text.

The project was pioneered by Lazaro Gamio with The Miami Herald. It's now an official project of The McClatchy Company, which is aiming to create a user-friendly template that can be used by McClatchy properties and other organizations which follow the open MIT license.

The Miami Herald has made significant use of Sinclair. The first use of Sinclair outside Miami was [The Telegraph of Macon's "Nine Funerals" package](http://www.macon.com/static/media/projects/nine-funerals/). The goal is to make this project more usable, and more often used.

For more information, refer to the documentation file in the main folder, sinclair-docs.htm.

##Origins of the name

The fine folks at the Chicago Tribune's news apps team named [one of their apps after Ida Tarbell](http://tarbell.tribapps.com/), a muckraking journalist. It would be easy and wrong to assume this app is named after Upton Sinclair, author of "The Jungle."

[The Miami Herald explored the long, strange history of the name Peter B. Sinclair](http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html) in a way that must be fully read to be appreciated.

##Basic Functions

Almost all elements will have a `blockType` option, which will define whether they float left, right, or take up the width of the story well.

###Photos

	$story.eq(0).photo({
		'blockType': 'wide',
		'PhotoUrl' : 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/2/15/1360937072371/David-Bowie-1973-008.jpg',
		'Credit' : 'Photo by Peter B. Sinclair / For the Miami Herald',
		'Caption' : 'This is a picture of what Peter B. Sinclair looked like when he was following David Bowie on the Ziggy Stardust tour.'
	});

###Blockquote

	$story.eq(1).quote({
		'blockType': 'wide',
		'quote': 'This is an example of a nice big quote that runs in different positions',
		'attrib': '<strong>Peter B. Sinclair,</strong> The namesake of this thing',
		'citeSrc': 'http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html'
	});
	
###Video

	$story.eq(2).video({
		'blockType': 'right',
		'videoID': 'GUNHbU7LnM4',
		'videoTitle': 'Video Title test',
		'videoCaption': 'test test test test test test test',
		'ratio': 1.77
	});