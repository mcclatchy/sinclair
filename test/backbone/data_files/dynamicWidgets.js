var _ndnBkmHost = 'pp-serve.newsinc.com';
var _ndnBuyerId = 'miamiherald_90045';
var _matchers = [];
var placements;
var distributorId = '90045';


var NDNAnalytics = (typeof (NDNAnalytics) == 'undefined') ? {} : NDNAnalytics;

NDNAnalytics.ANALYTICS_USER_TOKEN = "ANALYTICS_USER_TOKEN";
NDNAnalytics.BASE_SERVICE_URL = "http://analytics.newsinc.com/";

NDNAnalytics.hasFlash = navigator.mimeTypes && navigator.mimeTypes.length ? Array.prototype.slice.call(navigator.mimeTypes).some(function(a) { return "application/x-shockwave-flash" == a.type; }) : /MSIE/.test(navigator.userAgent) ? eval("try { new ActiveXObject('ShockwaveFlash.ShockwaveFlash') && !0 } catch(e) { !1 };") : !1;

NDNAnalytics.generateUuid = function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    var d = new Date();
    return (uuid.join('') + d.getTime());
};

NDNAnalytics.setAnalyticsCookie = function () {
    var cookieCheck = NDNAnalytics.getAnalyticsUserToken();
    if (cookieCheck === null) {
        var token = NDNAnalytics.generateUuid();
        NDNAnalytics.setCookie(NDNAnalytics.ANALYTICS_USER_TOKEN, token, 30);
        return token;
    } else {
        return cookieCheck;
    }
};

NDNAnalytics.getAnalyticsUserToken = function () {
    return NDNAnalytics.getCookie(NDNAnalytics.ANALYTICS_USER_TOKEN);
};

NDNAnalytics.appendScript = function (url) {
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    var head1 = document.getElementsByTagName("head")[0];
    head1.appendChild(script);
};

NDNAnalytics.setCookie = function (sName, sValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = sName + "=" + escape(sValue) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

NDNAnalytics.getCookie = function (sName) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) return unescape(aCrumb[1]);
    }
    return null;
};

NDNAnalytics.savePageView = function (WidgetID, FullUrl, ParentUrl, SiteSectionID, AdNetworkID) {
    var token = NDNAnalytics.setAnalyticsCookie();
    var wsUrl = NDNAnalytics.BASE_SERVICE_URL + 'AnalyticsProvider/jsonp/analytics/PageViewJSONP?' +
        'wid=' + WidgetID + '&uut=' + token + '&furl=' + FullUrl +
        '&purl=' + ParentUrl + '&ssid=' + SiteSectionID + '&anid=' + AdNetworkID;
    NDNAnalytics.appendScript(wsUrl);
};





var NDNRender = (typeof(NDNRender) == 'undefined') ? {} : NDNRender;

NDNRender.vh = "javascript:void(null);";

NDNRender.url = document.URL.replace(/'/g,"%27") ; //chrome and safari dont encode single-quotes in the url// To customize, scroll to "Start Customization"

targetsMap = function(url) {
    var uparts = url.split(/[\?\#]+/); //split at ? or #
    var splits = uparts[0].split('/');      

    // All URL parts
    this.urlparts = new Object();   
    this.urlparts.target = new Array(); 
    // var upt = new Array();
    for (i=3; i < splits.length ; i++) {
      var subsplits = splits.slice(0,i);
      this.urlparts.target[i-3] = subsplits.join('/') + "/";
    }
    //this.urlparts.target = upt.join(',');
    this.urlparts.shortDesc = "All URL parts";
    this.urlparts.longDesc  = "Match all url parts";


    // exact matcher
    this.exactMatch = new Object();
    this.exactMatch.target = url;
    this.exactMatch.shortDesc = "Default";
    this.exactMatch.longDesc  = "Place selected videos on this URL";

    // NYDN/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/41212/singleboth_00.html*
    // match without query params
    this.dropParams = new Object();
    this.dropParams.target = uparts[0]+'*';
    this.dropParams.shortDesc = "Ignore query parameters";
    this.dropParams.longDesc  = "Place selected videos on this page with your predefined query parameters appended to the end of the URL";
  
    // LEE/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/*/singleboth_00.html
    // drop slug line before last component
    var newarr = splits.slice(0, (splits.length - 2));
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 1];
    this.leeSlug = new Object();
    this.leeSlug.target = newarr.join('/');
    this.leeSlug.shortDesc = "Ignore slug name";
    this.leeSlug.longDesc  = "Place your selected videos on this URL while allowing the slug name to change at any time";
  
    // CHARLOTTE/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/41212/* 
    // drop last component in URL
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = '*';
    this.charlotte = new Object();
    this.charlotte.target = newarr.join('/');
    this.charlotte.shortDesc = "Ignore everything in the URL past article ID";
    this.charlotte.longDesc  = "Place your selected videos on the current page + ignore any positions in the URL following the article ID";
   
    // COX/  http://www.palmbeachpost.com/*/nWWWx/
    // Ignore positions in the URL path and slug name
    newarr = splits.slice(0, 3);    //get the base url
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 2]; //get the last part
    newarr[newarr.length] = '';
    this.cox = new Object();
    this.cox.target = newarr.join('/');
    this.cox.shortDesc = "Ignore positions in the URL path and slug name";
    this.cox.longDesc  = "Place your selected videos on the current page/ URL + ignore all positions between the base URL and the article ID";

    // DENVER/  http://www.denverpost.com/*/ci_22784626/*  
    // ignore second position of the url path and everything past the article ID    
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = '*'; //ignore past the article ID
    newarr[3] = "*"; //ignore second position
    this.denver = new Object();
    this.denver.target = newarr.join('/');
    this.denver.shortDesc = "Ignore the second position of the URL path and everything past the article ID";
    this.denver.longDesc  = "Place selected videos on the current URL and ignore the second position between the base URL and the article ID";  

  return this;
};

function renderTarget(x,isDefault){

  var _id = "t-" + x.shortDesc.replace(/\s+/g, '-').toLowerCase();

  var _label = $("<label class='target_loc_container' />");
  var _input = document.createElement('input');
  _input.setAttribute("type", "radio");
  _input.setAttribute("name", "target_loc");
  _input.setAttribute("class", "target_loc_radio");
  //strip * from end of target if exists
  if(x.target.charAt(x.target.length - 1)=='*'){
    _input.value = x.target.substring(0,x.target.length - 1);
  }else{
    _input.value = x.target;
  }
  //_input.value = x.target;
  if(isDefault==true){
     _input.setAttribute("checked", true);
  }
  _label.append(_input);
  
  var _span =  document.createElement('span'); 
  _span.setAttribute("class", "target_loc_span");
  _span.innerHTML = x.shortDesc;
  _label.append(_span);

  var _detailsLink = document.createElement('span');
  _detailsLink.setAttribute("onClick","$('#" + _id + "').toggle('show');$(this).toggleClass('target_loc_btn_down');");
  //_detailsLink.setAttribute("style","cursor:pointer;padding:4px;border:2px solid #f00;");
  _detailsLink.setAttribute("class","target_loc_btn_up");
  _detailsLink.innerHTML = "";
  _label.append(_detailsLink);
  
  var _detailsDiv = document.createElement('div');
  _detailsDiv.setAttribute("id",_id);
  _detailsDiv.setAttribute("style","display:none;padding:4px;word-wrap:break-word;");
  _detailsDiv.innerHTML = x.longDesc;
  _detailsDiv.innerHTML += "<br/><br/><span style='color:#F58800'>"+x.target+"</span>";
  _label.append(_detailsDiv);
  
  $("#target_loc").append(_label);
}


//
(function() {

var url;
var tm;

if (typeof ndn_target_url === 'undefined'){ //i.e. we are not in the bookmarklet

    url = NDNRender.url;
    tm = targetsMap(url);

}else{ //i.e. we are in the bookmarklet

    url = ndn_target_url;
    tm = targetsMap(url);

    $("#target_loc").empty();  

//Start Customization
//Comment out the renderTarget calls that are not needed
//To set the default checked radio button, use the second param(true/false)

//    renderTarget(tm.exactMatch,true);           
//    renderTarget(tm.dropParams,true);
//    renderTarget(tm.leeSlug,false);
    renderTarget(tm.charlotte,true);
//    renderTarget(tm.cox,false);
//    renderTarget(tm.denver,false);

//End Customization
            ndn_target_url =  $("input[name='target_loc']:checked").val();

    $("input[name='target_loc']").change(
      function() { ndn_target_url =  $("input[name='target_loc']:checked").val();        
        $("input[name='target_loc']").next().css('color', 'black');
        $("input[name='target_loc']:checked").next().css('color', '#F58800'); } 
    );

  } //end else

//Start Customization
//Comment out the matchers that are not needed

/*
    _matchers.push.apply(_matchers, tm.urlparts.target);

    _matchers.push(tm.dropParams.target.slice(0,-1));

    _matchers.push(tm.leeSlug.target);
    _matchers.push(tm.charlotte.target);
    _matchers.push(tm.cox.target);
    _matchers.push(tm.denver.target);
    _matchers.push(tm.exactMatch.target); //at the end, since param list can be crap long

*/

})();


NDNRender.beacon = function(opts) {
    // Make sure we have a base object for opts
    opts = opts || {};

    // Setup defaults for options
    opts.url = opts.url ||  ('https:' == document.location.protocol ? 'https://' : 'http://') + _ndnBkmHost + "/images/ad.gif";
    opts.vars = opts.vars || {};
    opts.error = opts.error || function(){};
    opts.success = opts.success || function(){};
 
    // Split up vars object into an array
    var varsArray = [];
    for (var key in opts.vars){ varsArray.push(key+'='+opts.vars[key]); }

    // Build query string
    var qString = varsArray.join('&');
 
    // Create a beacon if a url is provided
    if ( opts.url )
    {
        // Create a brand NEW image object
        var beacon = new Image();

        // Attach the event handlers to the image object
        if ( beacon.onerror ) { 
            beacon.onerror = opts.error; 
        }
        if ( beacon.onload ) { 
            beacon.onload  = opts.success; 
        }
        // Attach the src for the script call
        beacon.src = opts.url + '?' + qString;
    }
}

NDNRender.setAttribute = function(e, k, v) {
  if (k == "class") {
    e.setAttribute("className", v);   // set both "class" and "className"
  }
  return e.setAttribute(k, v);
};

NDNRender.createElement = function(e, attrs) {
    var el = document.createElement(e);
    for (var k in attrs) {
        if (k == "text") {
            el.appendChild(document.createTextNode(attrs[k]));
        } else {
            NDNRender.setAttribute(el, k, attrs[k]);
        }
    }
    return el;
};

NDNRender.remove = function(e) {
    e.parentNode.removeChild(e);
};

NDNRender.loadScript = function(_src) { 
    var e = document.createElement('script'); 
    e.src = _src;
    e.type = "text/javascript";
    e.async = true;
//    var NDNScript = document.getElementsByTagName('head')[0];
//    NDNScript.appendChild(e);
//    document.body.appendChild(e); 
    document.getElementsByTagName("head")[0].appendChild(e);

};

NDNRender.loadScriptCB = function(url,callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

NDNRender.listen = function(elem, evnt, func) {
    if (elem.addEventListener) // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        var r = elem.attachEvent("on"+evnt, func);
        return r;
    }
};

NDNRender.urlVars = function() {

  var uparts = NDNRender.url.split(/[\?\#]+/); //split at ? or #
  var splits = uparts[0].split('/');
  
  var joins = new Array();
  for (i=3; i < splits.length ; i++) {
     var subsplits = splits.slice(0,i);
     joins[i-3] = subsplits.join('/') + "/";
  }
  
  joins[joins.length] = uparts[0];
  
  var newarr = splits.slice(0, (splits.length - 2));
  newarr[newarr.length] = '*';
  newarr[newarr.length] = splits[splits.length - 1];
  
  joins[joins.length] = newarr.join('/');

  if (uparts.length > 1) {
    joins[joins.length] = uparts.join('?');
  } 
  
    // COX/  http://www.palmbeachpost.com/*/nWWWx/
    // Ignore positions in the URL path and slug name
    newarr = splits.slice(0, 3);    //get the base url
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 2]; //get the last part
    newarr[newarr.length] = '';
    joins[joins.length] = newarr.join('/');

    // DENVER/  http://www.denverpost.com/*/ci_22784626/  
    // ignore second position of the url path and everything past the article ID    
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = ''; 
    newarr[3] = "*"; 
    joins[joins.length] = newarr.join('/');

    // OMAHA/ http://omaha.com/article/20130709/AP09/130709671*
    if(splits.length == 8){
        newarr = splits.slice(0, (splits.length - 1));
    }else{
        var n = splits[splits.length-1].indexOf('#');
        splits[splits.length-1] = splits[splits.length-1].substring(0, n != -1 ? n : splits[splits.length-1].length);
        newarr = splits.slice(0, (splits.length));
    }
    joins[joins.length] = newarr.join('/');

    // CSM/  http://www.csmonitor.com/USA/Politics/2013/0411/foo-bar-baz*  
    // ignore query params and "-video" at the end of the url    
    newarr = uparts[0];   // get the url without query params    
    if(newarr.slice(newarr.length-6,newarr.length).toUpperCase() === "-video".toUpperCase()){
        newarr = newarr.slice(0,newarr.length-6);
    }
    joins[joins.length] = newarr;

    // OMAHA-SECTION/  http://www.omaha.com/article/*/LIVING*  
    // ignore third position of the url path and everything past the section    
    newarr = splits.slice(0, 6);
    newarr[newarr.length] = '';     
    newarr[4] = "*";    
    joins[joins.length] = newarr.join('/');

  return "'" + joins.join("','") + "'";
};

NDNRenderUnits = function(unitsdata) {

    for ( var i = 0; unitsdata.length > i; ++i ) {
       var pardiv = document.getElementById(unitsdata[i].target);
       if (pardiv) {
         if(unitsdata[i].render_app=='widget'){
           if (NDNAnalytics.hasFlash){
             postscribe(pardiv,unitsdata[i].embed);

             pardiv.style.cssText = 'display: block; margin: 0px;';

             NDNAnalytics.savePageView(23681, encodeURIComponent(NDNRender.url), null, unitsdata[i].sitesection, unitsdata[i].freewheel);
           }
         }else{
           var el = NDNRender.createElement("iframe", {"src": unitsdata[i].url, "height": unitsdata[i].height , "width": unitsdata[i].width, "scrolling": "no", "frameborder": "no", "noresize": "noresize", "marginwidth": "0px", "marginheight": "0px" });
           pardiv.appendChild(el);
           pardiv.style.cssText = 'display: block; margin: 0px;';
           NDNRender.beacon( {
              "vars": {
                   "bid": _ndnBuyerId,
                   "event": "player_iframe",
                   "vid": unitsdata[i].ndn_vid_id,
                   "target": unitsdata[i].target,
                   "rapp": unitsdata[i].render_app,
                   "iurl": encodeURIComponent(unitsdata[i].url),
                   "turl": encodeURIComponent(unitsdata[i].target_url),
                   "cb": (Math.random() * 100000000000000)

               }
           });
         } //end else
       } //end if pardiv
    } //end for loop
};

NDNRender.bindReady = function(handler){
	var called = false

	function ready() { 
		if (called) return
		called = true
		handler()
	}

	if ( document.addEventListener ) { // native event
		document.addEventListener( "DOMContentLoaded", ready, false )
	} else if ( document.attachEvent ) {  // IE

		try {
			var isFrame = window.frameElement != null
		} catch(e) {}

		// IE, the document is not inside a frame
		if ( document.documentElement.doScroll && !isFrame ) {
			function tryScroll(){
				if (called) return
				try {
					document.documentElement.doScroll("left")
					ready()
				} catch(e) {
					setTimeout(tryScroll, 10)
				}
			}
			tryScroll()
		}

		// IE, the document is inside a frame
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				ready()
			}
		})
	}

	// Old browsers
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
    else {
		var fn = window.onload // very old browser, copy old onload
		window.onload = function() { // replace by new onload and call the old one
			fn && fn()
			ready()
		}
    }
}

var writeWidget = function(placementID){
  var orig_document_write = document.write;
  var pardiv = document.getElementById(placements[placementID].target);
  while( pardiv.hasChildNodes()){ pardiv.removeChild(pardiv.lastChild);}
  NDNRender.loadScriptCB(('https:' == document.location.protocol ? 'https://' : 'http://') + _ndnBkmHost + '/js/postscribe-version-1.1.0/htmlParser/htmlParser.js',function(){
    NDNRender.loadScriptCB(('https:' == document.location.protocol ? 'https://' : 'http://') + _ndnBkmHost + '/js/postscribe-version-1.1.0/postscribe.js', function(){
      if (NDNAnalytics.hasFlash){
        postscribe(pardiv,placements[placementID].embed);
 //       pardiv.style.cssText = 'display: block; margin: 0px;';
        NDNAnalytics.savePageView(23681, encodeURIComponent(NDNRender.url), null, placements[placementID].sitesection, placements[placementID].freewheel);
      }
    });
  });
  document.write = orig_document_write;
};

var NDNDynVideoWidgets = function() {

  if(_matchers.length === 0){
    var theScript = ("https:" == document.location.protocol ? "https://" : "http://") + _ndnBkmHost 
    + "/repub/" + _ndnBuyerId + "/unitsdata.js?loc=" + encodeURIComponent(NDNRender.url) + "&matchers="
    + encodeURIComponent(NDNRender.urlVars());
  }else{
    var theScript = ("https:" == document.location.protocol ? "https://" : "http://") + _ndnBkmHost
    + "/repub/"+ _ndnBuyerId + "/unitsdata.js?loc=" + encodeURIComponent(NDNRender.url) + "&matchers="
    + encodeURIComponent("'" + _matchers.join("','") + "'");
    console.log("new matchers");
  }

  var orig_document_write = document.write;
  NDNRender.bindReady(function(){
    NDNRender.loadScript(("https:" == document.location.protocol ? "https://" : "http://") + _ndnBkmHost + "/js/postscribe-version-1.1.0/htmlParser/htmlParser.js");
    NDNRender.loadScript(("https:" == document.location.protocol ? "https://" : "http://") + _ndnBkmHost + "/js/postscribe-version-1.1.0/postscribe.js");
    NDNRender.loadScript(theScript);
    document.write = orig_document_write; //restore document.write after postscribe
  });

};
      
//force Embed start
var _nw2e = _nw2e || [];

 

// Once the NDN Player Suite library has been dynamically included on the page and initialized, forcibly migrate the old Perfect Pixel embed code into the

// new embed code using NDN Player Suite merged with Perfect Pixel

_nw2e.push(['when', 'initialized', function() {

 (function($) {

 // The "distributorId" variable below should be different for each separate "dynamicWidgets.js" file that gets returned so that separate distributors may include and manage strictly their own perfect pixel embeds on the same webpage 

// defined at the top of dynamicWidgets.js in the xrap generated portion which can query this from pubId
//  var distributorId = '415';

 

  $(function() {

   $('.ndn-widget[id]').each(function() {

    $(this)

    .removeClass('ndn-widget')

    .attr('data-config-distributor-id', distributorId)

    .show()

    .addClass('ndn_embed');

   });

 

   (_nw2e.Ndn_App || _nw2e.Ndn_Widget).embedWidgetsFromContainersOnPage();

  });

 })(_nw2e.jQuery);

}]);

 

// If the NDN Player Suite is not already included on the page, dynamically include it on the page 

if (document.getElementById('_nw2e-js') === null) {

 (function() {

 var nw = document.createElement('script'); nw.type = 'text/javascript'; nw.src = '//launch.newsinc.com/js/embed.js'; nw.id = '_nw2e-js'; 

  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(nw, s);

 })();

}

 

// This global function now does nothing, but may still get called by the webpage still calling the legacy Perfect Pixel embed code

var NDNDynVideoWidgets = function() {}
//force Embed end


      