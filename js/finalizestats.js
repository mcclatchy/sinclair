// Final Omniture Code File
// Used to convert MI variable to Omniture variables and
// also makes the final img call.
///////////////////////////////////////////////////////////////

// Set Doubletag flag if page already counted - Added 10/25/2010 - JJ
if(typeof(mitagsent) === 'undefined') {
	var mitagsent;if(mitagsent){ mistats.taxonomy = "DOUBLETAG-Not-Reported||||"; }
}
else {
	if(mitagsent){ mistats.taxonomy = "DOUBLETAG-Not-Reported||||" };
}

// Server and URL variables
mistats.server      = (location.hostname || '').toLowerCase().replace(/^www\./, '');
mistats.url         = location.protocol + '//' + location.hostname + location.pathname;
mistats.querystring = ((location.search || '').length > 1 ? location.search : '') + ((location.hash || '').length > 1 ? location.hash : '');

// New Insite Tracking
// Added 8/19/09 - JJ
function getMIcookie( cookie_name, type ) {

	// Get contents of cookie
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

	// Type of cookie to parse
	switch(type) {
		case 'user': {
			// Make sure we have an Insite cookie and it contains data
			if(typeof(results) != 'undefined') {
				if(results != null) {
					insiteData = unescape(results[2]);
					insiteData = insiteData.split('|');
					return insiteData[0];
				}
				else
					return 'Unknown';
			}
			else
				return 'Unknown';
		}
		case 'segment': {
			// Make sure we have a Segments cookie and it contains data
			if(typeof(results) != 'undefined') {
				if(results != null) {
					segmentData = unescape(results[2]);
					segmentData = segmentData.replace(/%20/g,'|');
					return segmentData;
				}
				else
					return 'Unknown';
			}
			else
				return 'Unknown';
		}
	}
}

mistats.subscriptions =
{
   PP_COOKIE:  'ppUser',
   MI_PCOOKIE: 'mi_pptkid',
   MI_SCOOKIE: 'mi_suid',

   pressPlus: function ()
   {
      var i;
      var pp;
      var sd;
      var token;

      sd = mistats.staffDomains || [];
      sd.push('mcclatchyinteractive.com', 'mcclatchy.com');

      pp = s.c_r(this.PP_COOKIE);
      if (pp)
      {
         email = pp.match(/email=[^&]*/);
         if (email)
         {
            email = email[0].substring(6).replace(/&.*/, '');
            for (i = 0; i < sd.length; i++)
               if (email.match(sd[i]))
                  return s.c_w(this.MI_PCOOKIE, '', new Date((new Date()).getTime() - 86400000));
         }
      }

      token = s.c_r(this.MI_PCOOKIE);
      if (!token && pp)
      {
         token = pp.match(/token=.+/);
         if (token)
            token = token[0].substring(6).replace(/&.*/, '');
      }

      if (token)
      {
         s.c_w(this.MI_PCOOKIE, token, new Date((new Date()).getTime() + 1209600000));
         return ['PressPlus', (mistats.bizunit || 'XXX'), token].join(': ');
      }

      return null;
   },

   syncronex: function ()
   {
      var suid;
      
      suid = s.c_r(this.MI_SCOOKIE);
      if (!suid || isNaN(suid))
         return null;

      s.c_w(this.PP_COOKIE, '', new Date((new Date()).getTime() - 86400000));
      s.c_w(this.MI_PCOOKIE, '', new Date((new Date()).getTime() - 86400000));

      s.c_w(this.MI_SCOOKIE, suid, new Date((new Date()).getTime() + 63072000000));
      s.eVar21 = ['Syncronex', (mistats.bizunit || 'XXX'), suid].join(': ');

      return s.eVar21;
   },
   
   getValue: function ()
   {
      return this.syncronex() || this.pressPlus();
   }
};

mistats.insiteid = mistats.subscriptions.getValue();
if (!mistats.insiteid)
{
   mistats.insiteid = getMIcookie(mistats.regcookie,'user');
   mistats.segments = getMIcookie(mistats.segcookie,'segment');
}

if (navigator.cookieEnabled && (navigator.userAgent || '').match(/ipod|ipad|iphone/i))
{
   mistats.visitorId = s.c_r(mistats.subscriptions.MI_PCOOKIE) || s.c_r('mi_svid');
   if (!mistats.visitorId)
   {
      mistats.visitorId = Math.round(Math.random() * 1000000) + '.' + (new Date()).getTime();
      s.c_w('mi_svid', mistats.visitorId, new Date((new Date()).getTime() + 63072000000));
   }
}

// Error Checking and Code Enhancements
///////////////////////////////////////////////////////////////

// MSR Fix - Added 11/26/2007/
mistats.bizunit = mistats.bizunit.toUpperCase();

// Link Tagging Function
mistats.graffiti = function(a,b) {
 		var c = a.length, cc, cn, cl, d = document, e, f;

 		while(c--) {
     		if(c !== 0 && d.getElementById( a[c].id)) {
	        	cn = d.getElementById( a[c].id ).getElementsByTagName('*');
         			cl = cn.length;
         			while(cl--) {
             			cc = cn[cl];
             			if(cc.href && !cc.href.match(/\@|\#|mailto:/) ) {
                     			e = (a[0].label === '') ? mistats.pagelevel : a[0].label;
                     			f = (a[c].label === '') ? a[c].id : a[c].label;
                     			cc.href += '#' + b + '=' + e + ':' + f;
             			}
         			}
     		}
 		}
};

// Do not report popular stories that are more than 30 days old
if ((mistats.pubdate || '').match(/^\d{4}\/\d{2}\/\d{2}$/)
 && (new Date()).getTime() - (new Date(mistats.pubdate)).getTime() > 2592000000)
   mistats.popular = '';

// Taxonomy Error Checking /
if(mistats.taxonomy.split("|").length != 5) { mistats.taxonomy = "BadTaxonomy||||";}

// Temporary New Tag Flags /
mistats.pagelevel = "*" + mistats.pagelevel;

// Catch pages improperly labeled as homepage
if(window.location.pathname.length > 1 && mistats.taxonomy.match(/^_Homepage\|/i)) {
	mistats.taxonomy = 'BadTaxonomy||||';
}

if(window.location.pathname.length > 1 && mistats.pagelevel.match(/^\*Home/i)) {
 		mistats.pagelevel = 'Bad Page Level';
}
/*
mistats.detectDevice = function ()
{
   var a;
   var pw;
   var ua;

   ua = navigator.userAgent;
   pw = Math.min(screen.width, screen.height) / (window.devicePixelRatio && !isNaN(window.devicePixelRatio) ? parseFloat(window.devicePixelRatio) : 1);

   a = ':' + ('orientation' in window ? (Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait') : 'unsupported');
   a += mistats.pagename.match(/^vendor:/i) && ua.match(/(ipad|iphone|ipod).+applewebkit.+mobile\/\S+$/i) ? ':in-app browser' : '';

   if ((navigator.platform || ua).match(/ipad/i)
    || (ua.match(/windows\snt\s/i) && !ua.match(/windows\sphone/i) && ua.match(/\sarm;/i))
    || (ua.match(/android/i) && pw > 800)
    || ua.match(/android\s3/i)
    || ua.match(/rim\stablet/i)
    || ua.match(/silk/i))
      return 'tablet' + a;

   if ((navigator.platform || ua).match(/iphone|ipod/i)
    || (ua.match(/android/i) && !ua.match(/android\s3/i) && pw <= 800)
    || (ua.match(/blackberry/i) && ua.match(/mobile/i))
    || ua.match(/windows\sphone/i)
    || (pw && pw <= 320))
      return 'phone' + a;

   return 'other';
};
*/

mistats.device =
{
   userAgent: navigator.userAgent.toLowerCase(),

   isFacebook: function()
   {
      return this.userAgent.search(/fban|fbios|fbforiphone/) > -1;
   },

   isWebView: function ()
   {
      return !this.isFacebook() && this.userAgent.search(/(ipad|iphone|ipod).+applewebkit.+mobile\/\S+$/) > -1;
   },

   type: function ()
   {
      var a;
      var pw;
      var ua;

      ua = this.userAgent;
      pw = Math.min(screen.width, screen.height) / (window.devicePixelRatio && !isNaN(window.devicePixelRatio) ? parseFloat(window.devicePixelRatio) : 1);

      a = ':' + ('orientation' in window ? (Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait') : 'unsupported');
      if (this.isFacebook())
         a += ':in-fb browser';
      else if (this.isWebView())
         a += ':in-app browser';

      if ((navigator.platform || ua).match(/ipad/i)
       || (ua.match(/windows\snt\s/i) && !ua.match(/windows\sphone/i) && ua.match(/\sarm;/i))
       || (ua.match(/android/i) && pw > 800)
       || ua.match(/android\s3/i)
       || ua.match(/rim\stablet/i)
       || ua.match(/silk/i))
         return 'tablet' + a;

      if ((navigator.platform || ua).match(/iphone|ipod/i)
       || (ua.match(/android/i) && !ua.match(/android\s3/i) && pw <= 800)
       || (ua.match(/blackberry/i) && ua.match(/mobile/i))
       || ua.match(/windows\sphone/i)
       || (pw && pw <= 320))
         return 'phone' + a;

      return 'other';
   },

   details: function ()
   {
      var dv;
      var os;
      var ua;

      function osVersion()
      {
         var hw;
         hw = ua.match(/\([^\)]+/);
         hw && (os = hw[0].match(/([\._]?\d+){1,3}/));
         os = os ? os[0].replace(/_/g, '.') : '1.0';
      };

      function getDevice()
      {
         var date;
         var g;
         var i;
         var map;
         var v;

         date = new Date();

         map =
         {
            'i386':      'simulator',
            'ipad1,1':   'ipad1',
            'ipad2,1':   'ipad2',
            'ipad3,':    'ipad3+',
            'iphone1,1': 'iphone1',
            'iphone1,2': 'iphone3g',
            'iphone2,1': 'iphone3gs',
            'iphone3,1': 'iphone4',
            'iphone4,1': 'iphone4s',
            'iphone5,':  'iphone5',
            'ipod1,1':   'ipod',
            'ipod2,1':   'ipod2',
            'ipod3,1':   'ipod3',
            'ipod4,1':   'ipod4',
            'ipod5,1':   'ipod5'
         };

         for (i in map)
            if (ua.match(i))
               return map[i];

         v = os.replace(/\./g, '');
         while (v.length < 3)
            v += '0';
         v = parseInt(v);

         switch (dv)
         {
            case 'ipad':
               window.ondevicemotion = function (pEvent)
               {
                  if (!pEvent.acceleration)
                     s.c_w('mi_igen', '1', new Date(date.getTime() + 63072000000));
                  else if (window.devicePixelRatio === 1)
                     s.c_w('mi_igen', '2', new Date(date.getTime() + 63072000000));
                  else
                     s.c_w('mi_igen', '3+', new Date(date.getTime() + 63072000000));
                  window.ondevicemotion = null;
               };
               g = (s.c_r('mi_igen') || '').match(/1|2|3\+/);
               g && (dv += g[0]);
               break;
            case 'iphone':
               if (v < 200)
                  dv += '1';
               else if (screen.colorDepth === 18)
                  dv += '3g';
               else if (window.devicePixelRatio === 1)
                  dv += '3gs';
               else if (v < 500)
                  dv += '4';
               else if (Math.max(screen.width, screen.height) < 568)
                  dv += '4s';
               else
                  dv += '5';
               break;
            case 'ipod':
               if (screen.colorDepth === 18)
               {
                  if (v > 313)
                     dv += '1';
                  else if (v > 421)
                     dv += '2';
                  else
                     dv += '3';
               } else if (window.devicePixelRatio === 2)
               {
                  if (Math.max(screen.width, screen.height) < 568)
                     dv += '4';
                  else
                     dv += '5';
               }
         }
      };

      ua = this.userAgent;

      dv = ua.match(/ipad|iphone|ipod|android/);
      if (!dv)
         return 'other';
      dv = dv[0];

      osVersion();
      getDevice();

      return dv + ':' + os;
   }
};

if (mistats.returnTracker)
{
   if (mistats.pagename === 'Welcome_page_ad')
      mistats.returnTracker.track('Welcome Ad');
   s.eVar3 = mistats.returnTracker.hasReturned();
}

// Convert MI variables to Omniture variables
s_account  = mistats.account;
s.pageName = mistats.pagename && !mistats.pagename.match(/^pubsys:/i) ? mistats.pagename : ('noname:' + location.href);
s.channel  = mistats.sitename + ": " + mistats.channel;
s.server   = mistats.server;
s.referrer = document.referrer;

s.hier1 = mistats.bizunit + '|' + mistats.sitename + '|' + mistats.taxonomy + '|' + (mistats.channel || '').replace(/\|/g, '_');

s.prop1  = mistats.url;
s.prop2  = 'dev:' + mistats.device.type();
s.prop3  = mistats.pagelevel;
s.prop4  = mistats.contentsource;
s.prop5  = mistats.insiteid;
s.prop6  = 'D=h1';
s.prop7  = mistats.custom1;
s.prop8  = mistats.custom2;
s.prop9  = mistats.custom3;
s.prop11 = 'refresh:' + ((location.hash || '').match(/mirefresh/i) ? 'yes' : 'no') + '|hasFocus:' + (document.hasFocus ? (document.hasFocus() ? 'yes' : 'no') : 'unknown');
s.prop13 = mistats.segments;
s.prop15 = 'dev:' + mistats.device.details();
s.prop20 = mistats.cmsid;
s.prop18 = mistats.altcategories;
s.prop19 = mistats.wordCount ? mistats.wordCount() : null;
s.prop29 = (mistats.keywords || '').replace(/,+/g, ',').replace(/^,/, '').replace(/,$/, '');
s.prop30 = mistats.geography;
s.prop31 = mistats.pubdate;
s.prop32 = mistats.moddate;
s.prop35 = ((location.hash || '').length > 1 ? location.hash : '') + (location.search.match(/storylink=\w+/gi) || []).join('#');
s.prop37 = (s.prop3 || '').match(/postload/i) ? '' : mistats.popular;
s.prop39 = ((location.search || '').length > 1 ? location.search : '');
s.prop47 = mistats.widgets;

s.pageURL = 'D=c1' + (s.prop39 ? '+c39' : '');

if (mistats.visitorId)
   s.visitorID = mistats.visitorId;

// Pagename as a conversion variable - Added 3/31/10 - JJ - Ticket# 727-8314208
s.events = 'event7';
s.eVar4 = 'D=pageName';

if (mistats.audienceCounts)
   mistats.audienceCounts.updateAll();

// Improper Vendor Tracking Code
// Added 09/06/09
if(typeof(pubsys) != 'undefined') {
	if(pubsys == true) {
             	s.prop20 += '|P: ' + s.channel + ' : ' + mistats.server;
	}
}
else {
	s.prop20 = '|U: ' + s.channel + ' : ' + mistats.server;
}

// Prepend CMSID if this is an Iframe
if (window != top)
   s.prop20 = 'IFRM|' + s.prop20;

// Capture referring domain -- 2012-02-03 JG
s.prop49 = function ()
{
   var g;
   var h;
   var hs;
   var r;
   var rs;

   r = document.referrer.toLowerCase() || '';

   if (!r.length || !r.match(/\w+/))
   {
      if (window.opener)
         try
         {
            r = window.opener.location.href || '';
         } catch (miError)
         {
            return 'external opener';
         }
      else
         return 'no referrer';
   }

   r = r.replace(/https*\W+/, '').split('/')[0];
   h = location.hostname.toLowerCase();

   if (r == h)
      return 'internal';

   rs = r.split('.');
   hs = h.split('.');

   r = r.replace(/[www\.]*/, '');

   rs.splice(0, (rs.length > 2) ? rs.length - 2 : 0);
   hs.splice(0, (hs.length > 2) ? hs.length - 2 : 0);

   if (rs.join('.') == hs.join('.'))
      return 'subdomain: ' + r;

   g = r.lastIndexOf('google.');

   if (g !== -1)
      return r.substring(0, g + 7);

   return r;
} ();

// Script Loader
function scriptLoader() {}

// Script Loader Prototype
scriptLoader.prototype =
{
   injectScript: function (url, callback)
   {
      var script;

      script = document.createElement('script');
      script.type = 'text/javascript';

      if (callback)
      {
         // IE
         if (script.readyState)
            script.onreadystatechange = function ()
            {
               if (script.readyState == 'loaded' || script.readyState == 'complete')
               {
                  script.onreadystatechange = null;
                  callback();
               }
            };
         // Everyone else
         else
            script.onload = function()
            {
               callback();
            };
      }

      // Inject script into html head
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
   },

   injectStyle: function (url, callback)
   {
      var style;

      style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';

      // IE
      if (callback)
      {
         if (style.readyState)
            style.onreadystatechange = function ()
            {
               if (style.readyState == 'loaded' || style.readyState == 'complete')
               {
                  style.onreadystatechange = null;
                  callback();
               }
            };
         // Everyone else
         else
            style.onload = function ()
            {
               callback();
            };
      }

      // Inject script into html head
      style.href = url;
      document.getElementsByTagName('head')[0].appendChild(style);
   }
};

// Interaction Tracker
if (mistats.InteractionTracker)
   mistats.interactionTracker = new mistats.InteractionTracker();

// Track surveywall on CharlotteObserver
if (mistats.GCSTracker && mistats.bizunit && mistats.bizunit.match(/CLT|NAO/))
   mistats.gcsTracker = new mistats.GCSTracker();

// Post Load Omniture Tracking
mistats.updateTracking = function()
{
   if (mistats.interactionTracker)
      mistats.interactionTracker.increment('gallery_views');

   if (mistats.gcsTracker)
      mistats.gcsTracker.track(true);

/*
   if (mistats.bizunit && !mistats.bizunit.match(/MIA|ELN/))
   {
      mistats.postLoadArgs = arguments;
      if (!mistats.postLoadTracking)
      {
         mistats.postLoad = new scriptLoader();
         mistats.postLoad.injectScript('http://www.mcclatchyinteractive.com/mistats/refinalizestats.js', function ()
         {
            mistats.postLoadTracking.omniture(mistats.postLoadArgs)
         });
      } else
         mistats.postLoadTracking.omniture(mistats.postLoadArgs);
   }
*/
};

// Check and report iframe usage -- 2011/11/22 JG
mistats.iframes =
{
   topLevel: window,
   nestCount: 0
};

while (mistats.iframes.topLevel != top)
{
   mistats.iframes.nestCount++;

   try
   {
      mistats.iframes.topLevel = mistats.iframes.topLevel.parent;
   } catch(e)
   {
      break;
   }
}

if (mistats.iframes.nestCount)
{
   s.prop48 = ['IFRM', mistats.iframes.nestCount, document.referrer.split('?')[0].replace(new RegExp('https*://', 'i'), '')];
   if (mistats.iframes.nestCount > 1)
      try
      {
         s.prop48[s.prop48.length] = mistats.iframes.topLevel.location.href.split('?')[0].replace(new RegExp('https*://', 'i'), '');
      } catch (e)
      {
         s.prop48[s.prop48.length] = 'Diff';
      }
   s.prop48 = s.prop48.join('|');
}

s.prop12 = function ()
{
   var n;

   for (n in navigator)
      if (navigator[n] && typeof navigator[n] === 'string')
      {
         if (navigator[n].match(/gomez/i))
            return 'GomezAgent: ' + mistats.bizunit + ': ' + location.hostname.replace(/^www\./i, '');
         else if (navigator[n].match(/facebookexternal/i))
            return 'FacebookAgent: ' + mistats.bizunit + ': ' + location.hostname.replace(/^www\./i, '');
      }

   return null;
}();

// Do not execute Omniture tag if this is a footer Iframe for an Aurora site
if (location.pathname.match(/\/footer/i)
 && mistats.bizunit
 && mistats.bizunit.match(/KEN|IDA|CDT|BRA|LED|MAC|RHH|TCH|TBH|SUN|BEL/))
   mitagsent = true;

// Capture Tacoda tag
s.prop47 = function ()
{
   var layout;
   var s
   var scripts;

   layout = document.getElementById('layout_type');
   if (layout && layout.className)
      return ['layout', location.hostname.replace(/^www\./i, ''), layout.className.toLowerCase()].join(':');

   scripts = document.getElementsByTagName('script');
   for (s = 0; s < scripts.length; s++)
      if (scripts[s].src && scripts[s].src.match(/tacoda\.net\/.*slf\.js/i))
         return 'TacodaTag: ' + location.hostname + location.pathname;

   return '';
}();

s.prop14 = function ()
{
   var c;
   var s;
   var scripts;

   scripts = document.getElementsByTagName('script');

   c = 0;

   for (s = 0; s < scripts.length; s++)
      if (scripts[s].src && scripts[s].src.match(/mcclatchyinteractive\.tt\.omtrdc\.net/i))
         c++;

   return (c) ?
   [
      'mbox',
      c,
      mistats.bizunit,
      location.hostname.toLowerCase(),
      'limit=' + (mistats.mitntrules && mistats.mitntrules.limit ? mistats.mitntrules.limit : 'unknown'),
      'ch=' + (typeof mitnt === 'object' && mitnt.debug && mitnt.debug.channel ? mitnt.debug.channel : 'unknown')
   ].join(':') : '';
}();

s.prop46 = function ()
{
   if (!('msDoNotTrack' in navigator || 'doNotTrack' in navigator))
      return 'dnt:n/a';
   switch (navigator.msDoNotTrack || navigator.doNotTrack)
   {
      case '1':
      case 'yes':
         return 'dnt:on'
   }
   return 'dnt:off';
}();

mistats.findAdTags = function ()
{
   var hasGPT;
   var i;
   var objs;
   var t;
   var tags;
   var wins;

   tags = {};
   wins = [window];
   objs = document.getElementsByTagName('iframe');
   for (i = 0; i < objs.length; i++)
      wins[wins.length] = objs[i].contentWindow;

   for (i = 0; i < wins.length; i++)
      try
      {
         objs = wins[i].document.getElementsByTagName('script');
         for (t = 0; t < objs.length; t++)
            if ((objs[t].src || '').match(/^https*:\/{2}ad\.doubleclick\.net\/adj\/mi\.\w{3}/i))
               tags.hasDart = true;
            else if ((objs[t].src || '').match(/https*:\/\/open.ad.yieldmanager.net/i))
               tags.hasApt = true;
      } catch (err)
      {
      }

   s.prop38 = [];
   for (i in tags)
      s.prop38[s.prop38.length] = i;

   if (typeof googletag === 'object')
   {
      objs = document.getElementsByTagName('div');
      for (i = 0; !hasGPT && i < objs.length; i++)
         if ((objs[i].id || '').match(/gpt/))
         {
            tags = objs[i].getElementsByTagName('script');
            for (t = 0; !hasGPT && t < tags.length; t++)
               hasGPT = !!(tags[t].innerHTML || '').match('googletag.display\\s*\\\([\\\'"]' + objs[i].id + '[\\\'"]\\s*\\\)');
         }
   }

   if (!hasGPT)
      s.prop38[s.prop38.length] = 'noGPT';

   s.prop38.length && (s.prop38.unshift((mistats.bizunit || 'XXX')));
   s.prop38 = s.prop38.join('|');
};

mistats.findAdTags();

// IMG tag call
// Double Tag Check - Added 11/31/2007 - JJ
<!-- ** DO NOT ALTER ANYTHING BELOW THIS LINE ** -->
if(!mitagsent)
{
	var s_code=s.t();if(s_code)document.write(s_code)
	var mitagsent = true;
}


// Log data to V15 suite for Merced
if (!mistats.tagSentV15 && mistats.bizunit && mistats.bizunit === 'MER')
{
   mistats.tagSentV15 = true;
   s.sa('nmv15-Merced');
   s_code = s.t();
   if (s_code)
      document.write(s_code);
   s.sa(mistats.account);
}

if (location.href.match(/#\s*$/) || (location.hash || '').match(/wgt=|navlinks*=|storylink=|mirefresh/i))
{
   if (history.replaceState)
      history.replaceState('', document.title, location.pathname + (location.search || ''))
   else if (location.hash !== '#')
      location.hash = '';
}

// Call quantserve .js file - Added 7/22/2008 - JJ Ticket # 727-5945439
if (!location.hostname.match(/dealsaver/i) && (location.protocol || '').toLowerCase() !== 'https:')
{
   var _qoptions = { qacct:"p-50B2Fi6bBqYto", labels: mistats.bizunit };
   document.write("\n<" + "script type='text/javascript' src='http://edge.quantserve.com/quant.js'>" + "</" + "script>");
}

// Inject content tracking script -- 2011/12/19 JG
if (mistats.tyntid && !location.hostname.match(/adperfect|dealsaver|secondstreetmedia|syncaccess/i))
{
   if (!mistats.mediahostname)
      mistats.mediahostname = (mistats.sitefile && mistats.sitefile.match(/https*\W+[^\/]+/i)) ?
         mistats.sitefile.match(/https*\W+[^\/]+/i)[0] : 'http://media.mcclatchyinteractive.com';
   (new scriptLoader()).injectScript(mistats.mediahostname + '/mistats/mi_content_tracker.js');
}

(function () {
	var d = new Image(1, 1);
	d.onerror = d.onload = function () {
	d.onerror = d.onload = null;
};
d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-203838h&cg=0&cc=1&si=", escape(window.location.href), "&rp=",
escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');
})();

mistats.initAnalyzer = function (pSwitch)
{
   var t;
   var tmpObj;
   var analyzerMode;

   if (typeof localStorage === 'undefined' || typeof scriptLoader === 'undefined')
      return;

   analyzerMode = location.search.toLowerCase().match(/mi_analyzer=\w+/);
   analyzerMode = pSwitch || (analyzerMode ? analyzerMode[0].substr(12) : '');

   if (analyzerMode === 'off')
   {
      for (t in localStorage)
         if (t.indexOf('mianalyzer_') === 0)
            localStorage.removeItem(t);

      tmpObj = document.getElementById('mistats_cp');
      if (tmpObj)
         document.body.removeChild(tmpObj);
      tmpObj = document.getElementById('mistats_panel');
      if (tmpObj)
         document.body.removeChild(tmpObj);

      return;
   }

   for (t in localStorage)
      if (t.indexOf('mianalyzer_') === 0)
      {
         analyzerMode = 'on';
         break;
      }

   if (analyzerMode === 'on')
   {
      mistats.mediadomain = (mistats.sitefile || '').match(/^https*:\/{2}[^\/]+/i);
      mistats.mediadomain = mistats.mediadomain ? mistats.mediadomain[0].replace(/https*:\/{2}/i, '') : 'media.mcclatchyinteractive.com';

      mistats.loadCP = new scriptLoader();
      mistats.loadCP.injectScript('http://' + mistats.mediadomain + '/mistats/analyzer/js/analyticsCP.js', function () {});
      mistats.loadCP.injectStyle('http://' + mistats.mediadomain + '/mistats/analyzer/css/analyticsCP.css', function () {});
   }
};

mistats.initAnalyzer();

