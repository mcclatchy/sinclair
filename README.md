#Sinclair

Sinclair aims to create an easy-to-use, multi-media, responsively designed template for online news packages. Based on Javascript with heavy use of CSS, Sinclair allows multimedia objects to be incorporated on a paragraph-by-paragraph basis with text.

The project was off a static jQuery plugin by Lazaro Gamio at The Miami Herald, and expanded by Jay Pilgreen of the Kansas City Star.

#####Origins of the name

The fine folks at the Chicago Tribune's news apps team named [one of their apps after Ida Tarbell](http://tarbell.tribapps.com/), a muckraking journalist. It would be easy and wrong to assume this app is named after Upton Sinclair, author of "The Jungle."

[The Miami Herald explored the long, strange history of the name Peter B. Sinclair](http://www.miamiherald.com/2013/06/04/3431537/peter-b-sinclair-the-miami-herald.html) in a way that must be fully read to be appreciated.

#####Sinclair in the wild

**Miami Herald**
[The land beneath the parks](http://www.miamiherald.com/static/media/projects/the-land-beneath-the-parks/)
[Field of Dakota Dreams](http://www.miamiherald.com/projects/2013/field-of-dakota-dreams)
[Rick Scott's Jobs Record](http://www.miamiherald.com/projects/2013/rick-scotts-jobs-record/part-1/)

**Macon Telegraph**
[Nine Funerals](http://www.macon.com/static/media/projects/nine-funerals/)
[The Dove Keeper](http://www.macon.com/static/media/projects/birdman/test/)

##Google Doc Version	

In an attempt to make creating stories easier for a larger range of people, the default view has been ported to a new public [Google Doc](https://docs.google.com/spreadsheet/ccc?key=0AuRuRdHZo6DPdG9oLXlVNjV2bDN0clJuX294dER0RUE&usp=sharing). To use this document, make a copy in your own Google Drive account, and change what's needed. There are currently five tabs to the document: Configuration, Folio, Footer, Assets, and Output. The first four will allow you to set up the currently supported parts of the story.

[Click here](https://googledrive.com/host/0B-RuRdHZo6DPNEQyOGRXRlhqSEU/) to see a demo of the output saved in a publicly hosted Google Drive folder.

### Configuration

This tab contains elements and options for the whole story. Required files are included for convenience in a public Google Drive folder. You may use these files, but you may get faster results if you host these elsewhere.

* **CSS File:** The main CSS of the project.
* **Extra CSS File:** An optional CSS file to include after everything else.
* **Javascript File:** The AMD version of the Sinclair project: `sinclair.amd.js`. 
* **Extra Javascript File:** An optional JS file to include after everything else. *Note: This is outside of the require call, so the sinclair object is not available.*
* **Story Page:** The story to scrape. This needs to be on the same domain as the exported file.
* **Backup Story Page:** The backup html file to use if the story is not available.
* **Paragraph Container:** The element containing all paragraphs in the scraped story.
* **Page Title:** The meta title of the page.

**Note: RequireJS appends the `.js` extension when it loads documents, so you should not include it.**

### Folio

This tab contains the elements to configure the folio.

* **Show Folio:** Toggles the folio on and off. Use TRUE or FALSE.
* **Folio Title:** The name to display in the folio.
* **Project URL:** The url to use in the social tools.
* **Flat:** Whether to show the folio all the time or have it appear after scrolling. Use TRUE or FALSE.
* **Tracker:** Whether to show the line indicating how far a reader has gotten. Use TRUE or FALSE.
* **Logo File:** URL for the logo to put in the folio.
* **Logo Link:** Target URL for the logo (your home page).
* **Logo Width:** The width of the logo image.
* **Logo Height:** The height of the logo image.

### Footer

This tab will add footer links if they are present. If there are no links in the tab, the footer will not be appended. All links will be opened in a new tab.

* **Link Text:** The text to show.
* **Link:** The link to go to.

### Assets

This is the main page of the document, and will control the asset types that are available. Currently, only a small set is supported. As more are programmed they will be added to the document. All assets will be added **before** the paragraph in the placement field.

* **Type:** The type of asset. Currently photo, quote, refer and video are supported.
* **Position:** Changes the position of the asset.
	* left -- Floats the element left of the paragraphs.
	* right -- Floats the element right of the paragraphs.
	* wide -- Places the element above the paragraph at the set paragraph width.
	* splash -- Places the element above the paragraph with full width to the edge of the window.
* **Placement:** The paragraph number to append the element before.
* **Title:** The title for the elements that use one, currently refer and video.
* **Text:** The main text for the asset. 
	* photo -- the cutline
	* quote -- the quote
	* refer -- the body
	* video -- the video caption
* **Attribution** The attribution for widgets that use one, currently photo and quote
* **Source/Link:** Has multiple uses.
	* photo -- the image url (hosted elsewhere)
	* quote -- the link target of the quoted material
	* refer -- the link target of the referred material
	* video -- the Youtube url or video ID 
* **Link Text:** The text for outgoing links of assets that use one, currently refer
* **Ratio:** The ratio to use for included videos. This will size the player.

### Ads ... *New*

There is a new ad panel that will allow you to put in GPT ad tags. Currently GPT is the only supported type, but others can be added if need be. Additionally, due to mobile issues we have found out with our responsive design, only the 300x250 size is supported. 

* **Type:** The type of ad. Currently gpt is the only option.
* **Position:** Changes the position of the asset.
	* left -- Floats the element left of the paragraphs.
	* right -- Floats the element right of the paragraphs.
* **Placement:** The paragraph number to append the ad before.
* **Tracking:** The ad tracking string. (If there is a page that provides this elsewhere let me know. I always copy/paste from our website.)
* **Target ID:** The id for the element to place the ad into. **This must be unique.**
* **Ad Position:** The position inside the ad system .. aka I have no idea but you need it.
* **ATF:** Whether the ad shouldbe designated as being above the fold.


### Output .. *New Options*

There are now two options in the Sinclair custom menu for outputting the html: `Generate Output` and `Save in Current Drive Folder`.

> **Possible Confusion / Odd Behavior Note!!!** -- *When run either of these functions the first time, they will ask for permission to do their job. When you allow this access, the functions do not actually run. The first time you select an output option, you may need to click the menu action twice.*

#### "Save in Current Drive Folder"

Google Drive folders can be set to be public, and can act as a temporary hosting solution. This is particularly handy when developing the story. To use this new method:

1. Make a copy of the [current Sinclair spreadhseet](https://docs.google.com/spreadsheet/ccc?key=0AuRuRdHZo6DPdG9oLXlVNjV2bDN0clJuX294dER0RUE&usp=sharing).
2. Place your copy in a new public Google Drive folder.
3. Select the "Save in Current Drive Folder" action in the Sinclair custom menu.
4. On the details pane of the folder in Drive, find the "Hosting" link. **The folder must be public to see this.**

**A couple of notes:**
+ The function will either create an **index.html** file, or will create a new version of the current **index.html** file in the same folder as the spreadsheet. 
+ Google hosted folders work like a web root, so CSS files, JS files or HTML versions of the story can be stored and accessed much like a regular site.
+ Google puts appropriate CORS headers on html files, allowing you to develop completely in drive with a couple of extra steps:
	1. Copy the html source of the story into a new file in the Google Drive folder.
	2. Place the Google Drive url in the "Backup Story Page" cell.

#### "Generate Output"

The output tab is the target destination for the `buildFile()` function call. To invoke this function, there is a custom menu added to the document titled **Sinclair**. In that menu there is one option: **Generate Ouput**. 

To create html you can use on a server, click the Generate Output menu item. An attached Google Apps Script will ask for permission to the document. Allow this access and the script will create HTML output and dump that content into the output tab. To get the story online copy that entire cell, paste it into a new file on your computer and FTP that file up to its final destination.

**A couple of notes:**
* The file needs to be on the same domain of the story to work. 
* If you would like to develop on your computer before uploading it to the server, copy the source code of the target story page into a file on your computer and place that relative path in the "Backup Story Page" of the configuration tab. Then repeat the output process.
* The AMD sinclair file includes almost everything to work. RequireJS is loaded from http://cdnjs.com/ over https.
* **The custom menu will not be available until you copy the document into your own drive account**
* Google Drive puts the appropriate header information on files stored in Public directories. You can use this method to store the original story if you like.

---

##Basic Functions (Loading Content Manually)

###Loading your content .. *CHANGED IN GOOGLE DOC BRANCH*

There are two methods to loading Sinclair. A standard method adds a sinclair object to the window object. There is also an AMD (RequireJS) method, in which case the object will be loaded in the require() function. Presently, there are two methods for adding content: Scraping paragraphs from an existing story, or loading from a static HTML file in the local directory. Content is scraped from either location using the `sinclair.loadContent()` method, and a deferred object is returned. 

	// LOAD YOUR CONTENT AND THEN APPEND IT WHEREVER YOU LIKE

	// Standard Approach

	sinclair.loadContent({
		'scrapeResource': "http://www.miamiherald.com/2014/02/11/3927377/poll-shows-outsized-support-for.html",
		'fallback': 'data.html',
		'container': "#storyBodyContent"
	}).done( function(html) {
		// LAYOUT LOGIC GOES HERE
	});

	// RequireJS Approach
	
	require(["sinclair"], function(sinclair) {
		sinclair.loadContent({
			scrapeResource: "data.html",
			container: "#storyBodyContent"
		}).done( function(html) {
			// LAYOUT LOGIC GOES HERE
		});
	});

#####Options
* `scrapeResource` the url of the page you're trying to scrape
* `fallback` location of the fallback html you will load if the scrape fails
* `container` the element of the page you're scraping that holds the paragraphs

### UnderscoreJS Templates ... *NEW*

All basic elements can now take a new `template:` parameter. The parameter is looking for a compiled [UnderscoreJS template function](http://underscorejs.org/#template). There is currently only one set of templates included in the `templates.js` and `templates.amd.js` file: the default view. If the parameter is omitted these templates will be used. 

*As I add Kansas City's templates into the mix, I will document those and create a toggle in the Google Doc -- Jay*

**Note:** when using the AMD version of Sinclair, the templates are pre-compiled and included in the `sinclair.amd.js` file along with jQuery and UderscoreJS. This is the method that the Google Doc version uses. If you would prefer to use Sinclair directly, make sure to include the template file, along with jQuery and UnderscoreJS, prior to including Sinclair. You may also use any custom temlates you wish to create inside each instance.

###Layout mode .. *NOT IN THE GOOGLE DOC BRANCH YET*

	$story.layoutMode()

This method adds number labels to each paragraph to help deduce where assets will go.

###Adding a Folio ... *NEW*

This method should be invoked on a header-like element near the beginning of the page.

	$('#splash').folio({
		'pageTitle' : 'The Sinclair Project demo page',
		'folioTitle' : 'Sinclair Demo',
		'shortUrl' : 'https://github.com/mcclatchy/sinclair',
		'flat' : true,
		'tracker' : true,
		logo: {
			url: 'http://www.miamiherald.com/static/media/projects/libraries/images/logo_b.png',
			link: 'http://www.miamiherald.com/',
			width: '167px',
			height: '30px'
		}
	})
	
#####Options

* `pageTitle` text used to build a custom tweet in the share tools. It is the long name of the page
* `folioTitle` text used next to the logo in the folio. It is the short name of the page
* `shortUrl` shortened url build to concatenate the custom tweet with `pageTitle`
* `flat` *boolean* if `true`, folio is fixed to top of page; if `false`, folio slides down after user scrolls past element upon which the method was invoked
* `tracker` builds progress bar fixed to top of folio
* `template` [optional] an alternative UnderscoreJS template to use

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

Almost all elements will have a `blockType` option, which will define whether they float left, right, or take up the width of the story well. Before basic elements can be loaded on a page, a jQuery variable must be set with all paragraphs like so `$story = $('#article-wrapper p')`.

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
* `template` [optional] an alternative UnderscoreJS template to use

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
* `template` [optional] an alternative UnderscoreJS template to use

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
* `template` [optional] an alternative UnderscoreJS template to use
	
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
* `template` [optional] an alternative UnderscoreJS template to use

##Methods in progress .. *NOT INCORPORATED IN THE GOOGLE DOC BRANCH YET*

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
