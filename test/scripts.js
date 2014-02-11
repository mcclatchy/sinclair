// TESTING SINCLAIR

// DEFINE A DEFERRED OBJECT

$load = new $.Deferred();

// LOAD YOUR CONTENT INTO A DIV

$('body').loadContent({
	'scrapeResource' : 'http://www.miamiherald.com/2014/02/11/3927377/poll-shows-outsized-support-for.html #storyBodyContent p',
	'fallback' : 'data.html',
	'def':$load
});

// RESOLVE THE OBJECT

$load.resolve();
// BEGIN LAYOUT CODE BLOCK
$.when($load).then( function () {
	console.log('done')
	// RUN LAYOUT LOGIC HERE
})