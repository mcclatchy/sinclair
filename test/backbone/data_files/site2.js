/* Custom onload handler */
var dolFunctions = new Array(); // array to hold customized affiliate functions and params for "DOM load" functions
var wolFunctions = new Array(); // array to hold customized affiliate functions and params for "window load" functions

//Note function added by mcclatchy 15Oct2007.
//Updated on 24Sept2008 for Redesign only 2 options available no archive search
function searchFormSubmit(form) {
  if (form.aff.value == 'web' || form.aff[1].checked == true) {
    var encoded_keywords = encodeURIComponent(form.keywords.value);
    var section_num = '1295';
    var url_version = 'ysr';
    var params = 'product=Yahoo%2COverture&' +
                 'collection=WEB&' +
                 'live_template=http%3A%2F%2Fwww.miamiherald.com%2F' + section_num + '%2Fv-' + url_version + '%2Findex.html&' + 
                 'preview_template=http%3A%2F%2Fpreview.miamiherald.com%2F' + section_num + '%2Fv-' + url_version + '%2Findex.html&' + 
                 'error_template=http%3A%2F%2Fwww.miamiherald.com%2F' + section_num + '%2Fv-yerr%2Findex.html&' +
                 'results_per_page=10' +
		 '&prop_related=1&prop_dym=1';
    window.location = "http://search.miamiherald.com/search-bin/search.pl.cgi?sf_Keywords=" + encoded_keywords + '&' + params;
    return false;
  }
  return true;
}

// end search ******************************************************************

// getParams *******************************************************************
function getParams(params) {
   var Params = new Object ();
   if ( ! params ) return Params; // return empty object
   var Pairs = params.split(/[;&]/);
   for ( var i = 0; i < Pairs.length; i++ ) {
      var KeyVal = Pairs[i].split('=');
      if ( ! KeyVal || KeyVal.length != 2 ) continue;
      var key = unescape( KeyVal[0] );
      var val = unescape( KeyVal[1] );
      val = val.replace(/\+/g, ' ');
      Params[key] = val;
   }
   return Params;

}
// end getParams *****************************************************************

function today_string() {
	// dependant on date functions defined in mi-utilities.js
	var today = new Date();
	return today.getDayString()+', '+today.getMonthString()+' '+today.getDate()+', '+today.getFullYear();
}

// ppRichMedia *****************************************************************

function ppRichMedia(object, type) {
	
	// default flv playback
	var width = 790;
	var height = 430; 
	
	if (type == "mp3")
	{
		width = 322;
		height = 470;
	}
	
	var left = window.screen.width/2 - width/2;
	var top = window.screen.height/2 - height/2;
		
	window.open(object.href,'mh' + type ,'width=' + width + ',height=' + height + ',resizable=no,left=' + left + ',top=' + top + ',screenx=' + left + ',screeny=' + top);
	
	return false;
}

// setColWidth *****************************************************************

function setColWidth(leftRightWidth) {
	document.write("<style type=\"text/css\">\n");
	for ( var i = leftRightWidth.length - 1; i >= 0; i--)
	{
		if(i == (leftRightWidth.length - 1))
		{
			document.write("div.left_half { width: " + (leftRightWidth[i][0] - 0.1) + "%; }\n");
			document.write("div.right_half { width: " + (leftRightWidth[i][1] - 0.1) + "%; }\n");
		}
		else {
			document.write("div.Left_" + (i+1) + " { width: " + (leftRightWidth[i][0] - 0.1) + "%; }\n");
			document.write("div.Right_" + (i+1) + " { width: " + (leftRightWidth[i][1] - 0.1) + "%; }\n");
		}
		document.write("div.Left_" + (i+1) + "_Right div.lrc2 { background: url(http://media.miamiherald.com/images/gdot.gif) repeat-y 0" + leftRightWidth[i][0] + "%; }\n")
	}
	document.write("</style>\n");
}

// findPos *********************************************************************

function findPos(obj) { //returns the x & y coordinates of an element
        var curleft = obj.offsetLeft || 0;
        var curtop = obj.offsetTop || 0;
        while (obj = obj.offsetParent) {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
        }
        return {x:curleft,y:curtop};
}

// onloadFunctions *************************************************************

function onloadFunctions(myFunction,flag) {
        if(flag == "d")
        {
                dolFunctions[wolFunctions.length] = myFunction;
        }
        else
        {
                wolFunctions[wolFunctions.length] = myFunction;
        }
}

// initLoad ********************************************************************

function initLoad(){
        for(var i=0; i < wolFunctions.length; i++)
        {
                eval(wolFunctions[i]);
        }
}

// dummies *********************************************************************

function equalHeight() {}

function equalHeightLR() {}

function setLeftRightWidth() {}

function customInit() {}

// *****************************************************************************

$(function() { //Initialization function, runs when the DOM has loaded
        customInit(); // this will fire off any customized affiliate "load" functions
});

// *****************************************************************************

addEvent(window,'load',initLoad);
