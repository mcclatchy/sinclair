/**
 * @fileoverview A random collection of functions, classes and extensions to core
 * Javascript objects.
 * 
 * @author Joe Whetzel jwhetzel@mcclatchyinteractive.com
 *************************************************************************** */

// extensions to the String object
String.prototype.append = function(str,del){
	var newStr = this;
	if (del) {
		if (newStr !== '') {newStr += del + str;}
		else {newStr += str;}
	}
	else {newStr += str;}
	return newStr;
};
String.prototype.prepend = function(str,del){
	var newStr = this;
	if (del) {
		if (newStr !== '') {newStr += str + del;}
		else {newStr = str + newStr;}
	}
	else {newStr = str + newStr;}
	return newStr;
};
String.prototype.isBlank = function(){
	return (this.search(/[^\S]/) == -1) ? true : false;
};
String.prototype.trim = function(side){
	var left = new RegExp(/^\s*/);
	var right = new RegExp(/\s*$/);
	var str = this;
	switch (side) {
		case 'left':
		case 'start':
		case 'beginning':
			str = str.replace(left, '');
			break;
		case 'right':
		case 'end':
			str = str.replace(right, '');
			break;
		default:
			str = str.replace(left, '');
			str = str.replace(right, '');
	}
	return str;
};

/**
 * Feature rich function for opening a new window.
 * <p>
 * If there is any one piece of functionality that gets duplicated 
 * across multiple functions on a site it has to be opening pop up windows. 
 * This function, in conjunction with the NewWindowFeatureSet class, aims 
 * to provide an easy to use, flexible, fully functional solution for all 
 * your window popping needs. There are two main differences between 
 * <tt>newWindow()</tt> and <tt>window.open()</tt>:
 * <ol>
 * <li>instead of requiring the window features to be passed as a string 
 * each time, you may pass a string or a NewWindowFeatureSet object, 
 * allowing feature sets to be created and referenced throughout the site</li>
 * <li>probably the most used window features, those that define a window's 
 * size and it's position can be defined in the function call</li>
 * </ol>
 * <b>Examples</b>
 * <pre>newWindow('http://www.example.com');</pre>
 * This example will use a default {NewWindowFeatureSet} object to 
 * create a new window with the url loaded.
 * <pre>newWindow('http://www.example.com', null, , [600,400], [50,100]);</pre>
 * This example will open a window with no name assigned to it, and relies 
 * on the browser defaults for features except defines the window as being 
 * 600 pixels wide by 400 pixels high, located 50 pixels from the left and 
 * 100 pixels from the top of the monitor.
 * 
 * @param {String} url string value providing the address to be loaded 
 * into the new window, same as used in <tt>window.open()</tt>
 * @param {String} name string giving the new window a name, same as used 
 * in <tt>window.open()</tt>, <tt>null</tt> is a valid value
 * @param {mixed} features either a comma-separated list of features as 
 * used by <tt>window.open()</tt>, or an instance of the {NewWindowFeatureSe}t 
 * class. If no argument is provided, or <tt>null</tt> is passed a generic 
 * instance of {NewWindowFeatureSe}t will be used. Passing an empty string 
 * will resort to using whatever the browser uses by default.
 * @param {Array} size an array containing two integer values that are used 
 * as width and height values
 * @param {Array} position an array containing two integer values that are 
 * used to define the position of the new window. Because standards browsers 
 * use <tt>screenX</tt> and <tt>screenY</tt>, while IE uses <tt>left and 
 * <tt>top</tt> to define position, the values in this array are used to 
 * populate both sets of values
 * @param {boolean} replace an optional boolean value used to indicate 
 * whether or not the page should create a new entry in the window's 
 * browsing history, same as used in <tt>window.open()</tt>. This argument 
 * is really only useful when loading a new page to a window that is already open.
 */
function newWindow(url, name, features, size, position, replace) {
	var featureString = '';
	if ( typeof features == 'string') {
		var s = (size) ? "width="+size[0]+",height="+size[1] : "";
		var p = (position) ? "left="+position[0]+",screenX="+position[0]+",top="+position[1]+",screenY="+position[1] : "";
		featureString = (s !== "") ? features.append(s,",") : features;
		featureString = (p !== "") ? featureString.append(p,",") : features;
	} else {
		if (features || features === null) { features = new NewWindowFeatureSet(); }
		features.height = (size) ? size[1] : features.height;
		features.width = (size) ? size[0] : features.width;
		if (position) {
			features.setLeftPosition(position[0]);
			features.setTopPosition(position[1]);
		}
		featureString = features.create();
	}
	window.open(url,name,featureString,replace);
}
function NewWindowFeatureSet(){
	this.channelmode=false;
	this.dependent=false;
	this.directories=false;
	this.fullscreen=false;
	this.height=400;
	this.innerHeight=false;
	this.innerWidth=false;
	this.left=150;
	this.location=false;
	this.menubar=false;
	this.outerHeight=false;
	this.outerWidth=false;
	this.resizable=true;
	this.screenX=150;
	this.screenY=150;
	this.scrollbars=true;
	this.status=false;
	this.toolbar=false;
	this.top=150;
	this.width=300;
	
	this.str='';
	this.create = function () {
		this.str = (this.channelmode) ? this.str.append("channelmode",",") : this.str;
		this.str = (this.dependent) ? this.str.append("dependent",",") : this.str;
		this.str = (this.directories) ? this.str.append("directories",",") : this.str;
		this.str = (this.fullscreen) ? this.str.append("fullscreen",",") : this.str;
		this.str = (this.height) ? this.str.append("height="+this.height,",") : this.str;
		this.str = (this.innerHeight) ? this.str.append("innerHeight="+this.innerHeight,",") : this.str;
		this.str = (this.innerWidth) ? this.str.append("innerWidth="+this.innerWidth,",") : this.str;
		this.str = (this.left) ? this.str.append("left="+this.left,",") : this.str;
		this.str = (this.location) ? this.str.append("location",",") : this.str;
		this.str = (this.menubar) ? this.str.append("menubar",",") : this.str;
		this.str = (this.outerHeight) ? this.str.append("outerHeight="+this.outerHeight,",") : this.str;
		this.str = (this.outerWidth) ? this.str.append("outerWidth="+this.outerWidth,",") : this.str;
		this.str = (this.resizable) ? this.str.append("resizable",",") : this.str;
		this.str = (this.screenX) ? this.str.append("screenX="+this.screenX,",") : this.str;
		this.str = (this.screenY) ? this.str.append("screenY="+this.screenY,",") : this.str;
		this.str = (this.scrollbars) ? this.str.append("scrollbars",",") : this.str;
		this.str = (this.status) ? this.str.append("status",",") : this.str;
		this.str = (this.toolbar) ? this.str.append("toolbar",",") : this.str;
		this.str = (this.top) ? this.str.append("top="+this.top,",") : this.str;
		this.str = (this.width) ? this.str.append("width="+this.width,",") : this.str;
		return this.str;
	};
	this.setLeftPosition = function (a) {
		this.left = this.screenX = a;
	};
	this.setTopPosition = function (a) {
		this.top = this.screenY = a;
	};
}
function redirect(href, delay) {
	href = (!href) ? '/' : href;
	delay = (!delay) ? 20000 : delay;
	window.setTimeout('window.location.href = '+href, delay);
}
/* questionable setWidthStyles is still needed, should probably replace document.write statements
   with DOM equivalents */
function setWidthStyles(leftRightWidth) {
	document.write("<style type=\"text/css\">\n");
	for ( var i = leftRightWidth.length - 1; i >= 0; i--) {
		document.write("div.left_" + (i + 1) + " { width: " + leftRightWidth[i][0] + "%; }\n");
		document.write("div.right_" + (i + 1) + " { width: " + leftRightWidth[i][1] + "%; }\n");
	}
	document.write("</style>\n");
}

/**
 * Extension to the Array class that returns a randomly selected value from the array.
 * <pre>var arr = new Array(1,2,3,4);
 * var num = arr.random();
 * // num is a randomly selected integer from 1 - 4</pre>
 *
 * @return randomly selected value from the array
 * @author Joe Whetzel
 */
Array.prototype.random = function(){
	return this[Math.ceil(Math.random() * this.length) - 1];
};


/**
 * Function to clear an input field
 * Usage: onClick="clearf(this, '<value to test against for clearing such as "Your Zip Code">')" as input tag parameter
 */
function clearf(object,text)
        {
                if (object.value == text)
                {
                        object.value = "";
                        object.focus();
                }
        }

/**
 * Function to set value of an input field
 * Usage: onClick="setf(this, '<value to set field to>')"
 */        
function setf(object,text)
        {
                if(object.value == "")
                {
                        object.value = text;
                        this.focus();
                }
        }




// JavaScript Swiss Army Knife
function Jssak(){
        // stores reference to head element for easy retrieval
        this.head_elm = document.getElementsByTagName('head')[0];
        // t used as a temporary variable
        var t = location.hostname.split('.');
        // update the prototype host if the request contains one
        if (t.length > 2) { // there may be subhosts
                for(var i=0; i<t.length-2; i++){
                        this.host += t[i]+'.';
                }
                // trim the trailing .
                this.host = this.host.substring(0,this.host.length-1);
        }
        this.domain = t[t.length-2]+'.'+t[t.length-1];
        // by default we assume the media domain uses 'media' as its host
        this.media_domain = 'media.'+this.domain;
        /* if the browser doesn't already have a console the SAK console will be
         * used instead, the viewLog method is added to preexisting consoles
         * so that calls to output the SAK console log won't throw errors  
         */
        if(!window.console) {console=new this._console;}else if(!console.viewLog) {console.viewLog=this._console.prototype.viewLog;}
        /* Firebug has a host of console methods, rather than encouraging these methods 
         * to be ignored documented methods not supported in SAK are covered here.
         * Add new SAK console methods to the Jssak.prototype._console object.
         */
        if(!console.debug) {console.debug=function(){console.log('Sorry, console.debug is not currently supported.');};}
        if(!console.info) {console.info=function(){console.log('Sorry, console.info is not currently supported.');};}
        if(!console.warn) {console.warn=function(){console.log('Sorry, console.warn is not currently supported.');};}
        if(!console.error) {console.error=function(){console.log('Sorry, console.error is not currently supported.');};}
        if(!console.assert) {console.assert=function(){console.log('Sorry, console.assert is not currently supported.');};}
        if(!console.dir) {console.dir=function(){console.log('Sorry, console.dir is not currently supported.');};}
        if(!console.dirxml) {console.dirxml=function(){console.log('Sorry, console.dirxml is not currently supported.');};}
        if(!console.trace) {console.trace=function(){console.log('Sorry, console.trace is not currently supported.');};}
        if(!console.group) {console.group=function(){console.log('Sorry, console.group is not currently supported.');};}
        if(!console.groupEnd) {console.groupEnd=function(){console.log('Sorry, console.groupEnd is not currently supported.');};}
        if(!console.time) {console.time=function(){console.log('Sorry, console.time is not currently supported.');};}
        if(!console.timeEnd) {console.timeEnd=function(){console.log('Sorry, console.timeEnd is not currently supported.');};}
        if(!console.profile) {console.profile=function(){console.log('Sorry, console.profile is not currently supported.');};}
        if(!console.profileEnd) {console.profileEnd=function(){console.log('Sorry, console.profileEnd is not currently supported.');};}
        if(!console.count) {console.count=function(){console.log('Sorry, console.count is not currently supported.');};}
}

// Hard coded values should be added to the prototype; good JS OO technique
Jssak.prototype.script_node = document.createElement('script');
Jssak.prototype.script_node.type = 'text/javascript';
Jssak.prototype.host='';
Jssak.prototype.dynamic_hosts=['preview','devel'];

Jssak.prototype.getMediaDomain = function(){
        if(this.host !== ''){
                for(var i=0;i<this.dynamic_hosts.length;i++){
                        if(this.host == this.dynamic_hosts[i]){return '';}
                }
        }
        return 'http://'+this.media_domain;
};

// parallel script loading functionality
Jssak.prototype.loadScript = function (path) {
        var newScript = this.script_node.cloneNode();
        newScript.src = this.getMediaDomain()+path;
        this.head_elm.appendChild(newScript);
};

/* This method parses name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object.
 * Taken from "Javascript: The Definitive Guide" by David Flanagan
 */
Jssak.prototype.getArgs = function() {
        var args = {};
        var query = location.search.substring(1);
        var pairs = query.split('&');
        for(var i=0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) {continue;}
                args[pairs[i].substring(0,pos)] = unescape(pairs[i].substring(pos+1));
        }
        return args;
};

// console object to be used if one doesn't exist
Jssak.prototype._console = function(){
        this.output = '';
};
Jssak.prototype._console.prototype.log = function(s){
	this.output += s+'\n---------------------------------------------------\n';
};
Jssak.prototype._console.prototype.viewLog = function(){
	var args = Jssak.prototype.getArgs();
        if(this.output && args.viewlog && args.viewlog == '1'){
                alert(this.output);
        }
};


Jssak.prototype.isEmpty = function (val) {
        return ((val === null) || (val.length === 0) || (val === ""));
};

Jssak.prototype.addEvent = function (objObject, strEventName, fnHandler) {
	if (objObject.addEventListener) {
		objObject.addEventListener(strEventName, fnHandler, false);
	} else if (objObject.attachEvent) {
		objObject.attachEvent("on" + strEventName, fnHandler);
	}
};      
Jssak.prototype.removeEvent = function (objObject, strEventName, fnHandler) {
	// works on events added via addEvent(), hard coded events aren't removed
	if (objObject.removeEventListener) {
		objObject.removeEventListener(strEventName, fnHandler, false);
	} else if (objObject.detachEvent) {
		objObject.detachEvent("on" + strEventName, fnHandler);
	}
};
Jssak.prototype.getEventSrc = function (e) {
	if (!e) {e = window.event;}
	if (e.target) {
		return e.target;
	} else if (e.srcElement) {
		return e.srcElement;
	}
};














// aliases for preserving existing functionality
var isEmpty = Jssak.prototype.isEmpty;
var addEvent = Jssak.prototype.addEvent;
var removeEvent = Jssak.prototype.removeEvent;
var getEventSrc = Jssak.prototype.getEventSrc;
