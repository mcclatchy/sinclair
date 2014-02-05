// Omniture Product Specific File
// Desc: Used to store a single vendors information.
// Product: Pubsys (WorkBench)
////////////////////////////////////////////////////////////////////////////////

/* XMUltra Feed Fix - Added 12/5/2007 - JJ */
// Check for content source
if(mistats.contentsource != undefined)
{
   // Temp var
   var new_cs = mistats.contentsource;

   // Filter HTML encoding and multiple blank spaces
   new_cs = new_cs.replace(/&#60;.+?&#62;/g, "");
   new_cs = new_cs.replace(/\s{2,}/g, "");

   // Reset mistats.contentsource with new
   mistats.contentsource = new_cs;
}
/* End XMUltra Feed Fix */

/* Flag for tracking improper vendor tags */
var pubsys = true;

/* Geography DART geopick - Added 1/25/2008 - JJ */
var mistats_geography;
if(!mistats_geography) mistats.geography = mistats_geography;
/* End Geography DART geopick */

/* Multipage Story Tagging Catcher  - Added 5/20/2008 - JJ */
var baseURL = window.location.href;
var pageNum;

if(baseURL.match(/-p[2-9]/g))
{
   pageNum = baseURL.match(/-p[2-9]/g);
   pageNum = pageNum.toString();
   mistats.cmsid += " | Page: " + pageNum.split('-p')[1];
} else
{
   splitURL = baseURL.split('.html');
   searchURL = splitURL[0] + '-p2.html';
   for(i=0; i < document.links.length; i++)
   {
      if(document.links[i] == searchURL)
      {
         mistats.cmsid += " | Page: 1";
         break;
      }
   }
}
/* End Multipage Story Tagging Catcher */

// we will be checking the URL for a hash or query string
// the following line is depcrecated for this file, not sure if its needed elsewhere though - GD 8/19/08
var internalSearch = window.location.hash;

mistats.unbind = function (pObj, pType, pCallout)
{
   if (pObj.removeEventListener)
      pObj.removeEventListener(pType, pCallout, false);
   else if (pObj.detachEvent)
      pObj.detachEvent('on' + pType, pCallout);
};

mistats.bind = function (pObj, pType, pCallout)
{
   if (pObj.addEventListener)
      pObj.addEventListener(pType, pCallout, false);
   else if (pObj.attachEvent)
      pObj.attachEvent('on' + pType, pCallout);
};

mistats.getElementsByClassName = function (pClass, pParent)
{
   var a;
   var allObjs;
   var matches;

   matches = [];

   if (typeof pParent === 'string')
      pParent = document.getElementById(pParent);

   if (!pParent)
      pParent = document;

   if (typeof pClass === 'string')
      pClass = new RegExp('^' + pClass + '$');

   allObjs = pParent.getElementsByTagName('*');

   for (a = 0; a < allObjs.length; a++)
      if (pClass.test(allObjs[a].className || ''))
         matches[matches.length] = allObjs[a];

   return matches;
};

mistats.getElementByClassName = function (pClass, pParent)
{
   var e;

   e = mistats.getElementsByClassName(pClass, pParent);
   if (e.length)
      return e[0];

   return null;
};

// Server date/time
mistats.Date = function ()
{
   var to;

   function init()
   {
      var ct;
      var x;

      to = document.cookie.match(/mi_to=-*\d+/);
      to = (to) ? parseInt(to[0].replace(/mi_to=/, '')) : 0;

      if (!to)
      {
         if (typeof XMLHttpRequest === 'undefined')
            return null;

         ct = new Date();
         x = new XMLHttpRequest();

         x.onreadystatechange = function ()
         {
            if (to || x.readyState < 2)
               return;

            to = x.getResponseHeader('date');

            if (to)
            {
               x.abort();
               to = Date.parse(to) - ct.getTime();
               s.c_w('mi_to', to, (new Date(ct.getTime() + 1209600000)));
            }
         };
         x.open('get', '/mistats/timestamp.txt', true);
         x.send(null);
      }
   };

   this.getDate = function ()
   {
      return new Date((new Date()).getTime() + to);
   };

   this.getOffset = function ()
   {
      return to;
   };

   init();
};

mistats.date = new mistats.Date();

// Audience Counts
mistats.audienceCounts =
{
   event: 'event17',
   session: function ()
   {
      var vs;

      vs = parseInt(s.c_r('mi_vs1'));
      if (!isNaN(vs) && (new Date()).getTime() - vs < 43200000)
         return vs;

      return null;
   }(),

   hasCookies: function ()
   {
      if (navigator.cookieEnabled && !s.c_r('mi_act'))
      {
         s.c_w('mi_act', '1', new Date((new Date()).getTime() + 1000));
         if (s.c_r('mi_act') == '1')
            return true;
      }

      return false;
   },

   nextWeek: function ()
   {
      var date;

      date = new Date();
      date.setTime(date.getTime() + (Math.abs(7 - date.getDay()) * 86400000));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      return new Date(date.getTime() - mistats.date.getOffset());
   },

   nextMonth: function (pDate)
   {
      var date;

      date = new Date();

      return new Date((new Date(date.getFullYear(), (date.getMonth() + 1), 1)).getTime() - mistats.date.getOffset());
   },

   updateProducts: function (pName, pInc, pDec)
   {
      if (!pInc)
         return;

      s.products = (s.products) ? s.products.replace(new RegExp(',*;' + pName + ' \d+;;;' + this.event + '=-*\d+', 'g'), '').split(',') : [];
      if (pDec && pDec < pInc)
         s.products[s.products.length] = ';' + pName + ' ' + pDec + ';;;' + this.event + '=-1';
      s.products[s.products.length] = ';' + pName + ' ' + pInc + ';;;' + this.event + '=1';
      s.products = s.products.join(',');

      s.events = (s.events) ? s.events.replace(new RegExp(',*' + this.event + '[^,]*', 'g'), '').split(',') : [];
      s.events[s.events.length] = this.event;
      s.events = s.events.join(',');
   },

   updateCount: function (pLabel, pCookie, pValidate)
   {
      var c;
      var cm;
      var cw;
      var i;
      var o;
      var u;

      cm = pCookie + '_m';
      cw = pCookie + '_w';

      c = s.c_r(cw).match(/\d+/g);
      i = c ? parseInt(c[1] || 0) : 0;
      u = c ? parseInt(c[2] || 0) : 0;
      if (pValidate)
      {
         i++;
         u = 0;
      }
      o = c ? parseInt(c[0] || 0) : i;
      if (!this.session && !u)
      {
         u = 1;
         this.updateProducts('Weekly ' + pLabel, i, o);
      }
      s.c_w(cw, [this.session ? o : i, i, u].join('|'), (new Date(this.nextWeek())));

      c = s.c_r(cm).match(/\d+/g);
      i = c ? parseInt(c[1] || 0) : 0;
      u = c ? parseInt(c[2] || 0) : 0;
      if (pValidate)
      {
         i++;
         u = 0;
      }
      o = c ? parseInt(c[0] || 0) : i;
      if (!this.session && !u)
      {
         u = 1;
         this.updateProducts('Monthly ' + pLabel, i, o);
      }
      s.c_w(cm, [this.session ? o : i, i, u].join('|'), (new Date(this.nextMonth())));
   },

   updateAll: function ()
   {
      if (!this.hasCookies())
         return;

      this.updateCount('PVs', 'mi_pc1', true);
      this.updateCount('Stories', 'mi_sc1', mistats.pagelevel && mistats.pagelevel.match(/story/i));
      this.updateCount('Visits', 'mi_vc1', !this.session);

      s.c_w('mi_vs1', this.session || (new Date()).getTime(), (new Date((new Date()).getTime() + 1800000)));
   }
};

mistats.InteractionTracker = function ()
{
   var cEvent    = 'event21';
   var cPagename = 'eVar13';
   var cChannel  = 'eVar14';
   var cServer   = 'eVar16';

   var counts;
   var listeners;
   var pending;
   var pendTimer;
   var types;

   types =
   {
      'cs_vote':    {product: 'Poll Votes'},
      'cs_results': {product: 'Poll Results'},
      'cs_details': {product: 'Poll Details'},
      'cs_hover':   {product: 'Poll Hover'},

      'fbc_new_post':  {product: 'FB-Comment Post'},
      'fbc_new_reply': {product: 'FB-Comment Reply'},
      'fbc_remove':    {product: 'FB-Comment Remove'},
      'fbc_login':     {product: 'FB-Comment Login'},
      'fbc_logout':    {product: 'FB-Comment Logout'},

      'gallery_views': {product: 'Gallery Views'},
      'gallery_panel': {product: 'Gallery Panel Views'},

      'gcs_another':  {product: 'GCS Ask Another'},
      'gcs_signup':   {product: 'GCS Signup'},
      'gcs_survey':   {product: 'GCS Answered Survey'},
      'gcs_abandon':  {product: 'GCS Exited Site'},
      'gcs_navigate': {product: 'GCS Exited Page'},

      'generic': {product: 'Generic Interaction'},

      'hype_click': {product: 'Hype Click'},
      'hype_scene': {product: 'Hype Scene Change'},

      'share_fb':    {product: 'Share Facebook'},
      'share_tw':    {product: 'Share Twitter'},
      'share_gp':    {product: 'Share Google+'},
      'share_rd':    {product: 'Share Reddit'},
      'share_dg':    {product: 'Share Digg'},
      'share_dl':    {product: 'Share Delicious'},
      'share_li':    {product: 'Share LinkedIn'},
      'share_ms':    {product: 'Share Myspace'},
      'share_print': {product: 'Share Print'},
      'share_email': {product: 'Share Email'},
      'share_any':   {product: 'Share Any'},

      'sync_loginwall':     {product: 'Sync Login Wall'},
      'sync_learnmorewall': {product: 'Sync LearnMore Wall'},
      'sync_registerwall':  {product: 'Sync Register Wall'},
      'sync_login':         {product: 'Sync Login Warn'},
      'sync_learnmore':     {product: 'Sync LearnMore Warn'},
      'sync_register':      {product: 'Sync Register Warn'},
      'sync_askmelater':    {product: 'Sync AskLater Warn'},
      'sync_exitsite':      {product: 'Sync Exited Site'},

      'timeline_click': {product: 'Timeline Click'},
      'timeline_prev':  {product: 'Timeline Previous'},
      'timeline_next':  {product: 'Timeline Next'},

      'view_more': {product: 'View More Stories'},

      'widget_show': {product: 'Widget Show'},
      'widget_hide': {product: 'Widget Hide'},
      'widget_move': {product: 'Widget Move'},

      'wgt_topjobs':    {product: 'Trifecta Jobs'},
      'wgt_cars':       {product: 'Trifecta Cars'},
      'wgt_homefinder': {product: 'Trifecta Homes'}
   };

   function resetCounts()
   {
      var type;

      for (type in types)
      {
         counts[type] = 0;
         sessionStorage[type] = null;
      }

      pending = false;
   };

   function resetProps()
   {
      s[cPagename] = '';
      s[cChannel] = '';
      s[cServer] = '';
   };

   function save()
   {
      var type;

      for (type in types)
         sessionStorage[type] = counts[type] || null;

      pending = false;
   };

   function currentBeacon()
   {
      var beacons;
      var i;
      var index;

      beacons = [];

      for (i in window)
         if (i.match(/s_i_\w+[_\d+]*$/))
         {
            index = i.match(/\d+$/);
            index = index ? parseInt(index[0]) : 0;
            beacons[index] = i.replace(/_\d+$/, '') + '_' + index;
         }

      return beacons.length ? beacons[beacons.length - 1] : null;
   };

   function generateProductsString(pCopy)
   {
      var type;
      var products;

      products = (s.products && pCopy) ? s.products.split(',') : [];

      for (type in counts)
         if (types[type].product && counts[type])
            products[products.length] = ';' + ((mistats.sitename) ? mistats.sitename : 'Unknown') + ': ' + types[type].product + ';;;' + cEvent + '=' + counts[type];

      return products.join(',');
   };

   function generateEventsString()
   {
      var events;

      events = (s.events) ? s.events.replace(new RegExp(',*' + cEvent, 'g'), '').split(',') : [];
      events[events.length] = cEvent;

      return events.join(',');
   };

   function sendCountsNow(pEvent)
   {
      var beaconUrl;
      var currBeacon;
      var evtStr;
      var lastBeacon;
      var newVars;
      var type;
      var xmlReq;

      if (!pending)
         return;

      lastBeacon = currentBeacon();
      evtStr = generateEventsString();

      newVars =
      {
         products:        generateProductsString(false),
         events:          evtStr,
         linkTrackEvents: evtStr,
         linkTrackVars:   ['events', 'products', cPagename, cChannel, cServer].join(',')
      };

      newVars[cPagename] = s.pageName;
      newVars[cChannel]  = s.channel;
      newVars[cServer]   = s.server;

      resetCounts();

      if (newVars.products)
         s.tl(true, 'o', 'Interactions', newVars);

      currBeacon = currentBeacon();
      if (currBeacon !== lastBeacon && typeof XMLHttpRequest !== 'undefined')
      {
         beaconUrl = window[currBeacon].src || '';
         window[currBeacon].src = '';
         xmlReq = new XMLHttpRequest();
         xmlReq.open('get', beaconUrl, false);
         xmlReq.setRequestHeader('Accept', 'image/*');
         xmlReq.send(null);
      }
   };

   function sendCountsOnPageView()
   {
      var type;

      if (!pending || (typeof mitagsent !== 'undefined' && mitagsent))
         return false;

      s.products = generateProductsString(true);
      if (!s.products)
         return reset();

      s.events = generateEventsString();

      s[cPagename] = s.c_r('mi_ppn');
      s[cChannel]  = s.c_r('mi_pch');
      s[cServer]   = 'D=server';

      resetCounts();
   };

   function setPending()
   {
      if (pendTimer)
         clearTimeout(pendTimer);

      pending = false;
      pendTimer = setTimeout(function ()
      {
         pending = true;
      }, 25);
   };

   function beforeUnload(pEvent)
   {
      var href;
      var i;
      var thisObj;

      if (!pending)
         return;

      if (pEvent.type === 'mouseup')
      {
         thisObj = pEvent.srcElement || pEvent.target;

         if (pEvent.button > 1 || thisObj.nodeName.match(/OBJECT|EMBED/))
            return;

         while (thisObj && thisObj.nodeName !== 'A')
            thisObj = thisObj.parentNode || null;

         if (!thisObj)
            return;

         if ((thisObj.getAttribute('href') || '').match(/^$|^javascript:|^#|^mailto:/i) || ((thisObj.target || '').match(/_blank/i)))
            return setPending();

         if ((thisObj.href || '').toLowerCase().replace(/^https*:\/{2}/, '').split('/')[0] == location.hostname.toLowerCase())
            return save();
      }

      sendCountsNow(pEvent);
   };

   function setupEvents()
   {
      if (listeners)
         return false;

      mistats.bind(document.documentElement, 'mouseup', beforeUnload);
      mistats.bind(window, 'beforeunload', beforeUnload);
      if (window.addEventListener && 'ontouchstart' in window)
         window.addEventListener('pagehide', beforeUnload, false);

      listeners = true;

      return true;
   }

   function init()
   {
      var tmpCount;
      var type;

      if (!window.sessionStorage)
         return;

      listeners = false;
      pending   = false;
      counts    = {};

      for (type in types)
         if (sessionStorage[type])
         {
            tmpCount = sessionStorage[type];
            if (tmpCount && !isNaN(tmpCount))
            {
               counts[type] = parseInt(tmpCount);
               pending = true;
            }
         }

      sendCountsOnPageView();

      return true;
   };

   this.increment = function (pType)
   {
      var tmp;

      if (typeof console !== 'undefined')
         console.log(pType);

      if (!types[pType])
         return false;

      if (!listeners)
         setupEvents();

      counts[pType] = (counts[pType] || 0) + 1;

      setPending();

      if (this.callout)
         this.callout(pType);

      return counts[pType];
   };

   this.setCount = function (pType, pCount)
   {
      if (typeof console !== 'undefined')
         console.log(pType);

      if (!types[pType])
         return false;

      if (!listeners)
         setupEvents();

      counts[pType] = pCount;

      setPending();

      if (this.callout)
         this.callout(pType);

      return counts[pType];
   };

   this.getCount = function (pType)
   {
      if (types[pType] && counts[pType])
         return counts[pType];
      return 0;
   };

   this.resetProps = resetProps;

   init();

   return this;
};

mistats.CommentingTracker = function ()
{
   var pp;

   function create(pEvent)
   {
      if (pEvent && pEvent.parentCommentID)
         mistats.interactionTracker.increment('fbc_new_reply');
      else
         mistats.interactionTracker.increment('fbc_new_post');
   };

   function remove()
   {
      mistats.interactionTracker.increment('fbc_remove');
   };

   function like()
   {
      if (mistats.interactionTracker.getCount('share_fb'))
         return;
      mistats.interactionTracker.increment('share_fb');
      mistats.interactionTracker.increment('share_any');
   };

   function unlike()
   {
      var sa;
      
      sa = mistats.interactionTracker.getCount('share_any') - 1;
      sa < 0 && (sa = 0);
      mistats.interactionTracker.setCount('share_fb', 0);
      mistats.interactionTracker.setCount('share_any', sa);
   };

   function login()
   {
      mistats.interactionTracker.setCount('fbc_login', 1);
   };

   function logout()
   {
      mistats.interactionTracker.setCount('fbc_logout', 1);
   };

   function clear()
   {
      clearInterval(pp);
   }

   function setup()
   {
      clear();

      FB.Event.subscribe('comment.create', create);
      FB.Event.subscribe('comment.remove', remove);
      FB.Event.subscribe('edge.create', like);
      FB.Event.subscribe('edge.remove', unlike);
      FB.Event.subscribe('auth.prompt', login);
      FB.Event.subscribe('auth.logout', logout);
   };

   function init()
   {
      pp = setInterval(function ()
      {
         if (typeof FB === 'object' && FB.Event && FB.Event.subscribe && mistats.interactionTracker)
            setup();
      }, 500);
      mistats.bind(window, 'load', clear);
   };

   init();
};

mistats.commentingTracker = new mistats.CommentingTracker();

// View Tracker
mistats.ViewTracker = function ()
{
   var date;
   var events;
   var height;
   var length;
   var page;
   var peakView;
   var pgLevel;
   var poller;
   var scroll;

   var cCookie = 'mi_ppv';
   var cTTL = 604800000;

   function trackView(pEvent)
   {
      var comments;
      var newView;
      var numPages;
      var pageLength;
      var rect;
      var zoom;

      zoom = 1;

      if (document.body.getBoundingClientRect)
      {
         rect = document.body.getBoundingClientRect();
         zoom = (rect.right - rect.left) / document.body.offsetWidth;
      }

      if (page.clientHeight / zoom < height || (window.pageYOffset || page.scrollTop) / zoom < scroll)
         return;

      height = page.clientHeight / zoom;
      length = page.scrollHeight / zoom;
      scroll = (window.pageYOffset || page.scrollTop) / zoom;

      date.setTime(date.getTime() + cTTL);

      if (!height)
         return s.c_w(cCookie, 'No Viewport Height', date);

      if (!length)
         return s.c_w(cCookie, 'No Page Height', date);

      comments = document.getElementById('disqus_thread');

      if (comments && comments.offsetTop)
      {
         length -= comments.scrollHeight;
         if (scroll > comments.offsetTop - height)
         {
            if (scroll > (comments.offsetTop - height) + comments.scrollHeight)
               scroll -= comments.scrollHeight;
            else
               scroll = comments.offsetTop - height;
         }
      }

      pageLength = (Math.round(length / 500) * 500);
      numPages = Math.round(length / height);

      if (pageLength <= 250)
         pageLength = 500;
      else if (pageLength > 20000)
         pageLength = 'Over20k';

      if (numPages > 10)
         numPages = '10+';

      newView = (Math.round((((scroll + height) / length) * 100) / 5) * 5);

      if (peakView < newView)
         peakView = newView;
         
      if (peakView >= 100)
      {
         if (events)
         {
            mistats.unbind(window, 'scroll', trackView);
            mistats.unbind(window, 'resize', trackView);
            mistats.unbind(window, 'zoom', trackView);

            events = false;
         }
         peakView = 100;
      }

      s.c_w(cCookie, pgLevel + ': ' + [pageLength + 'px', numPages + 'sc', peakView + '%'].join(' : '), date);
   };

   function init()
   {
      page = document.documentElement;
      peakView = 0;
      date = new Date();

      if (s.prop3.match(/Home|Section|Story|Vendor|Product/i) && !s.prop3.match(/Drupal/i))
         pgLevel = s.prop3.replace(/^\*/, '').substring(0, 3);
      else
         pgLevel = 'Oth';

      trackView();

      mistats.bind(window, 'scroll', trackView);
      mistats.bind(window, 'resize', trackView);
      mistats.bind(window, 'zoom', trackView);

      events = true;
   };

   poller = setInterval(function ()
   {
      if (typeof mitagsent === 'undefined' || !mitagsent)
         return;

      clearTimeout(poller);
      init();
   }, 1000);
};

mistats.viewTracker = new mistats.ViewTracker();

mistats.HypeTracker = function ()
{
   var dn;
   var doc;
   var hype;
   var loader;
   var pp;
   var scene;
   var state;
   var win;

   function clear()
   {
      if (pp)
         clearInterval(pp);
      pp = null;
   };

   function loaded()
   {
      var i;
      var objs;

      objs = hype.getElementsByTagName('div');
      for (i = 0; !loader && i < objs.length; i++)
         if ((objs[i].className || '').match(/HYPE_Loading/i) || (objs[i].innerHTML || '').match(/\s*Loading\s*/i))
            loader = objs[i];

      if (!loader || (loader.style.display || '') === 'none')
         return true;
      return false;
   };

   function click()
   {
      state = hype.innerHTML;
      scene = doc.currentSceneName();

      clearTimeout(pp);
      pp = setTimeout(function ()
      {
         if (state != hype.innerHTML)
         {
            if (scene == doc.currentSceneName())
               mistats.interactionTracker.increment('hype_click');
            else
               mistats.interactionTracker.increment('hype_scene');
         }
      }, 1000);
   };

   function findHype()
   {
      var i;
      var objs;
      var wins;
      var w;

      wins = [window];
      objs = document.getElementsByTagName('iframe');
      for (i = 0; i < objs.length; i++)
         wins[wins.length] = objs[i].contentWindow;

      for (w = 0; w < wins.length; w++)
         try
         {
            objs = wins[w].document.getElementsByTagName('*');
            for (i = 0; i < objs.length; i++)
               for (dn in {'hype_documentname': true, 'hyp_dn': true})
                  if (objs[i][dn] || objs[i].getAttribute(dn))
                     return objs[i];
         } catch (err)
         {
         }

      return null;
   };

   function setup()
   {
      clear();

      if (win.mistats_hypeTracker)
         return;

      win.mistats_hypeTracker = true;

      doc = win.HYPE.documents[hype.getAttribute(dn)];
      mistats.bind(hype, 'mousedown', click);
   };

   function init()
   {
      var pc;

      pc = 0;
      pp = setInterval(function ()
      {
         if (pc++ > 120)
            clear();

         hype = hype || findHype();
         hype && (win = (hype.ownerDocument.parentWindow || hype.ownerDocument.defaultView));
         mistats.interactionTracker && hype && win && win.HYPE && loaded() && (setup());
      }, 1000);
      mistats.bind(window, 'load', clear);
   };

   init();
};

mistats.hypeTracker = new mistats.HypeTracker();

mistats.ReturnTracker = function ()
{
   var cCookie = 'mi_rt';
   var cLimit  = 1815000;

   var name;
   var ready;
   var returned;

   function flag()
   {
      var date;

      date = (new Date()).getTime();
      s.c_w(cCookie, date + ':' + name, new Date(date + 2592000000));
   };

   function init()
   {
      var date;

      if (ready)
         return true;

      if (!(typeof s === 'object' && s.c_r))
         return;

      ready = true;

      rtc = s.c_r(cCookie).split(':');
      if (!(rtc && rtc.length === 2 && !isNaN(rtc[0])))
         return;

      date = (new Date()).getTime();
      s.c_w(cCookie, '', new Date(date - 86400000));

      if (date - parseInt(rtc[0]) > cLimit)
         returned = rtc[1];
   };

   this.track = function (pName)
   {
      init();
      name = (pName || mistats.pagename) || location.hostname;
      if (ready)
         mistats.bind(window, 'beforeunload', flag);
   };

   this.hasReturned = function ()
   {
      init();
      if (ready)
         return returned;
   };
};

mistats.returnTracker = new mistats.ReturnTracker();

mistats.SyncronexTracker = function ()
{
   var origCallBack;
   var syncDiv;
   var tagSent;

   function button(pEvent)
   {
      var thisLink;
      
      thisLink = pEvent.srcElement || pEvent.target;
      while (thisLink && thisLink.nodeName !== 'A')
         thisLink = thisLink.parentNode;
      if (!(thisLink && thisLink.id))
         return;
      mistats.interactionTracker.setCount('sync_exitsite', 0);
      mistats.interactionTracker.increment('sync_' + thisLink.id.replace(/-link/, ''));
      mistats.unbind(thisLink, pEvent.type, button);
   };

   function pageView()
   {
      var origProps;
      var prop;
      var type;

      if (tagSent || typeof s !== 'object' || !(mistats.sitename && mistats.bizunit))
         return;

      olive = location.hostname.match(/olivesoftware/i) ? 'Olive ' : '';

      type = syncDiv.getElementsByTagName('div');
      type = type.length ? (type[0].style.backgroundImage || '').toLowerCase().match(/\/\w+\.png/) : null;
      if (!type)
         return;

      type = type[0].substr(1).replace(/\.png/, '');
      type = !isNaN(type) ? ('Warn Page ' + (parseInt(type) + 1)) : 'Stop Page';

      mistats.returnTracker && (mistats.returnTracker.track('Syncronex ' + type.replace(/ Page/, '')));

      origProps =
      {
         pageName: s.pageName,
         channel:  s.channel,
         hier1:    s.hier1,
         prop3:    s.prop3,
         prop4:    s.prop4,
         prop6:    s.prop6
      };

      s.pageName = 'Vendor: Syncronex: ' + (location.hostname.match(/olivesoftware/i) ? 'Olive ' : '') + type;
      s.channel  = mistats.sitename + ': Vendor: Syncronex';
      s.hier1    = mistats.bizunit + '|' + mistats.sitename + '|Online|Registration||||Vendor: Syncronex';
      s.prop3    = '*Vendor';
      s.prop4    = mistats.sitename + ' : Syncronex';
      s.prop6    = s.hier1;

      s.t();

      for (prop in origProps)
         s[prop] = origProps[prop];

      tagSent = true;
   };

   function newCallBack(pObj)
   {
      origCallBack && (origCallBack.call(window, pObj));
      if (pObj && (pObj['authorized'] || '') === 'true' && pObj['userId'] && typeof s !== 'undefined' && s.c_w)
         s.c_w('mi_suid', pObj['userId'], new Date((new Date()).getTime() + 63072000000));
   };

   function setup()
   {
      var l;
      var links;
      
      links = syncDiv.getElementsByTagName('a');
      for (l = 0; l < links.length; l++)
         mistats.bind(links[l], 'mouseup', button);
      pageView();
      mistats.interactionTracker.setCount('sync_exitsite', 1);
   };

   function init()
   {
      var pc;
      var pp;

      pc = 0;
      pp = setInterval(function ()
      {
         syncDiv = document.getElementById('syncronexOverlayContent');
         if (pc++ > 120 || syncDiv)
            clearInterval(pp);
         if (window.serverCallback && !origCallBack)
         {
            origCallBack = window.serverCallback
            window.serverCallback = newCallBack;
         }
         if (!(syncDiv && mistats.interactionTracker))
            return;
         setup();
      }, 500);
   };

   init();
};

mistats.syncronexTracker = new mistats.SyncronexTracker();

mistats.YouTubeTracker = function ()
{
   var ready;
   var video;

   function Video(pInfo, pTitle)
   {
      var self;
      
      self = this;

      this.init        = false;
      this.title       = pTitle || null;
      this.videoId     = pInfo.videoData.video_id;
      this.current     = pInfo.currentTime;
      this.duration    = pInfo.duration;
      this.playing     = 0;
      this.elapsed     = 0;

      this.open = function ()
      {
         var scr;

         if (!self.title)
         {
            scr = document.createElement('script');
            scr.type = 'text/javascript';
            scr.async = 'async';
            scr.src = 'http://gdata.youtube.com/feeds/api/videos/' + self.videoId + '?v=2&alt=json-in-script&callback=mistats.youTubeTracker.callback';
            document.body.appendChild(scr);

            return;
         }

         self.timer = setInterval(function ()
         {
            self.elapsed += self.playing;
            self.duration - self.current < 2 && (close());
         }, 1000);

         self.init = true;
      };

      this.open();
   };

   function getTitle()
   {
      var obj;

      obj = document.getElementById('detail_page');
      if (obj)
      {
         obj = obj.getElementsByTagName('header');
         if (obj.length)
         {
            obj = obj[0].getElementsByTagName('h1');
            if (obj.length && obj[0].innerHTML)
               return obj[0].innerHTML.replace(/<[^>]+>/g, '').replace(/^\s*|\s*$/g, '').replace(/\s+/g, ' ');
         }
      }

      typeof mianalytics === 'object' && (obj = mianalytics.getElementByClassName('youtube_summary'));
      if (obj)
      {
         obj = obj.getElementsByTagName('h3');
         if (obj.length)
         {
            obj = obj[0].getElementsByTagName('a');
            if (obj.length && obj[0].innerHTML)
               return obj[0].innerHTML.replace(/<[^>]+>/g, '').replace(/^\s*|\s*$/g, '').replace(/\s+/g, ' ');
         }
      }

      //return (location.hostname + location.pathname).toLowerCase();
   };

   function update(pInfo)
   {
      if (!(video.init && pInfo))
         return;

      video.current = Math.round(pInfo.currentTime);
   };

   function currentBeacon()
   {
      var beacons;
      var i;
      var index;

      beacons = [];

      for (i in window)
         if (i.match(/s_i_\w+[_\d+]*$/))
         {
            index = i.match(/\d+$/);
            index = index ? parseInt(index[0]) : 0;
            beacons[index] = i.replace(/_\d+$/, '') + '_' + index;
         }

      return beacons.length ? beacons[beacons.length - 1] : null;
   };

   function close(pEvent)
   {
      var bu;
      var cb;
      var ev;
      var lb;
      var sn;
      var xr;

      video.timer && (clearInterval(video.timer));

      if (!video.init)
         return;

      video.init = false;
      
      if (!video.elapsed)
         return;

      sn = Math.ceil((video.current || 1) / Math.round(video.duration / 4));
      video.elapsed > video.duration && (video.elapsed = video.duration);
      ev = ['event22=' + video.elapsed, 'event23', 'event25'];
      if (video.duration - video.elapsed < 2)
      {
         ev[ev.length] = 'event24';
         sn = 5;
      }
      ev = ev.join(',');

      s.tl(true, 'o', 'video',
      {
         linkTrackEvents: ev.replace(/=\d+/g, ''),
         linkTrackVars: 'events,prop1,prop2,prop3,prop15,prop39,eVar17,eVar18,eVar19,eVar22,eVar23,eVar24',
         events: ev,
         eVar17: video.title,
         eVar18: sn + ':' + ['Start', '25%', '50%', '75%', 'End'][sn - 1],
         eVar19: 'video',
         eVar22: s.pageName,
         eVar23: s.channel,
         eVar24: s.server,
         channel: s.channel,
         prop1: s.prop1,
         prop2: s.prop2,
         prop3: s.prop3,
         prop15: s.prop15,
         prop39: s.prop39
      });

      if (!(pEvent && pEvent.type === 'beforeunload'))
         return;

      unloading = true;
      cb = currentBeacon();
      if (cb !== lb && typeof XMLHttpRequest !== 'undefined')
      {
         bu = window[cb].src || '';
         window[cb].src = '';
         xr = new XMLHttpRequest();
         xr.open('get', bu, false);
         xr.setRequestHeader('Accept', 'image/*');
         xr.send(null);
      }
   };

   function init()
   {
      if (typeof s !== 'object')
         return;

      mistats.bind(window, 'beforeunload', close);
      ready = true;
   };

   this.event = function (pData)
   {
      if (!ready || typeof pData !== 'object')
         return;

      switch (pData.event)
      {
         case 'initialDelivery':
            video = new Video(pData.info, getTitle());
            break;
         case 'infoDelivery':
            switch (pData.info.playerState)
            {
               case -1:
                  close();
                  video = new Video(pData.info)
                  break;
               case 0:
                  close();
                  break;
               case 1:
                  video.playing = 1;
                  break;
               case 2:
               case 3:
                  video.playing = 0;
                  break;
            }
            update(pData.info);
            break;
      }
   };

   this.callback = function (pObj)
   {
      if (!(typeof pObj === 'object' && pObj.entry && pObj.entry.title && pObj.entry.title.$t))
         return;

      video.title = pObj.entry.title.$t;
      video.open();
   };

   init();
};

mistats.ShareTracker = function ()
{
   var at_st;
   var map;
   var pp;

   map =
   {
      'facebook\..+sharer':              'share_fb',
      'twitter\.com\/':                  'share_tw',
      'plus\.google.+share':             'share_gp',
      'reddit':                          'share_rd',
      'digg':                            'share_dg',
      'delicious':                       'share_dl',
      'linkedin':                        'share_li',
      'myspace':                         'share_ms',
      '^mailto:|\/v-email':              'share_email',
      '^javascript:.*print|\/v-print\/': 'share_print'
   };

   function track(pEvent)
   {
      var m;
      var to;
      
      to = pEvent.srcElement || pEvent.target;
      while (to && to.nodeName !== 'A')
         to = to.parentNode || null;
      if (!(to && to.nodeName === 'A' && to.href))
         return;
      for (m in map)
         if ((to.href || '').match(m) && !mistats.interactionTracker.getCount(map[m]))
         {
            mistats.interactionTracker.setCount(map[m], 1);
            mistats.interactionTracker.increment('share_any');
            return;
         }
   };

   function setup()
   {
      var i;
      var m;
      var objs;

      if (!at_st && window.addthis_sendto)
      {
         at_st = window.addthis_sendto;
         window.addthis_sendto = function ()
         {
            at_st.apply(window, arguments);
            if (!(arguments.length && typeof arguments[0] === 'string'))
               return;
            for (m in map)
               if (m.match(arguments[0]) && !mistats.interactionTracker.getCount(map[m]))
               {
                  mistats.interactionTracker.setCount(map[m], 1);
                  mistats.interactionTracker.increment('share_any');
                  return;
               }
         };
      }
      objs = document.getElementsByTagName('a');
      for (i = 0; i < objs.length; i++)
         if (objs[i].href)
            for (m in map)
               if (objs[i].href.match(m))
               {
                  mistats.unbind(objs[i], 'mouseup', track);
                  mistats.bind(objs[i], 'mouseup', track);
                  break;
               }
   };

   function init()
   {
      document.readyState && (pp = setInterval(function ()
      {
         if (mistats.interactionTracker && (document.readyState || '').match(/interactive|complete/))
            setup();
      }, 1000));
      mistats.bind(window, 'load', function ()
      {
         pp && (clearInterval(pp));
      });
   };

   init();
};

mistats.shareTracker = mistats.shareTracker || (new mistats.ShareTracker());

mistats.MessageHandler = function ()
{
   var handlers;

   handlers =
   {
      'youtube': function (pData)
      {
         if (!mistats.YouTubeTracker)
            return;
         mistats.youTubeTracker = mistats.youTubeTracker || (new mistats.YouTubeTracker());
         mistats.youTubeTracker.event(pData);
      },

      'apis\.google' : function (pData)
      {
         if (!mistats.interactionTracker || mistats.interactionTracker.getCount('share_gp') || !(pData || '').match(/::onPlusOne/i))
            return;
         mistats.interactionTracker.setCount('share_gp', 1);
         mistats.interactionTracker.increment('share_any');
      }
   };

   function parse(pEvent)
   {
      if (!(pEvent && pEvent.origin && pEvent.data))
         return;

      for (h in handlers)
         if ((pEvent.origin || '').toLowerCase().match(h))
            return handlers[h](JSON.parse(pEvent.data));
   };

   function init()
   {
      if (window.mistats_messageHandler || typeof JSON === 'undefined' || !JSON.parse)
         return;
      window.mistats_messageHandler = true;
      mistats.bind(window, 'message', parse);
   };

   init();
};

mistats.messageHandler = mistats.messageHandler || (new mistats.MessageHandler());

mistats.GCSTracker = function ()
{
   var cPollLim = 500;
   var cFrameId  = /prompt-iframe/i;
   var cSurvey   = /task-form/i;
   var cAnother  = /task-flag/i;

   var first;
   var gcs;
   var origProps;
   var pollPtr;
   var pollCnt;
   var prompt;
   var responses;

   function getElementLikeId(pStr, pObj)
   {
      var a;
      var allObjs;

      pObj = pObj || document;
      allObjs = pObj.getElementsByTagName('*');

      for (a = 0; a < allObjs.length; a++)
         if (allObjs[a].id && allObjs[a].id.match(pStr))
            return allObjs[a];

      return null;
   };

   function navigate()
   {
      mistats.interactionTracker.setCount('gcs_abandon', 0);
      mistats.interactionTracker.setCount('gcs_navigate', 1);
   };

   function bindToAnchors(pState)
   {
      var a;
      var anchors;
      var binder;
      var host;

      binder = (pState) ? mistats.bind : mistats.unbind;

      host = location.hostname.split('.');
      host.splice(0, ((host.length > 2) ? (host.length - 2) : 0));
      host = new RegExp(host.join('.'), 'i');

      anchors = document.getElementsByTagName('a');
      for (a = 0; a < anchors.length; a++)
         if (anchors[a].href && anchors[a].href.replace(/^https*\W{3}/, '').replace(/\/.*/, '').match(host))
            binder(anchors[a], 'mouseup', navigate);
   };

   function askAnother()
   {
      if (pollPtr)
         return;

      mistats.interactionTracker.increment('gcs_another');
      clearInterval(pollPtr);
      pollCnt = 0;
      pollPtr = setInterval(function ()
      {
         if (++pollCnt < cPollLim && !bindResponses())
            return;

         clearInterval(pollPtr);
         pollPtr = null;
      }, 1500);
   };

   function trackSignup(pEvent)
   {
      var thisObj;

      thisObj = pEvent.srcElement || pEvent.target;

      mistats.unbind(thisObj, pEvent.type, trackSignup);
      mistats.interactionTracker.increment('gcs_signup');
      mistats.interactionTracker.setCount('gcs_abandon', 0);
      bindToAnchors(false);
   };

   function next()
   {
      track();
   };

   function surveyTrack(pEvent)
   {
      var r;
      var thisObj;
      
      thisObj = pEvent.srcElement || pEvent.target;

      if (thisObj.className && thisObj.className.match(/disabled/i))
      {
         mistats.interactionTracker.setCount('gcs_abandon', 0);
         setTimeout(function ()
         {
            mistats.interactionTracker.setCount('gcs_abandon', 1);
         }, 50);
         return true;
      }

      mistats.interactionTracker.increment('gcs_survey');
      mistats.interactionTracker.setCount('gcs_abandon', 0);

      if (responses && responses.length)
         for (r = 0; r < responses.length; r++)
            mistats.unbind(responses[r], pEvent.type, surveyTrack);

      bindToAnchors(false);
      setTimeout(next, 1500);
   };

   function bindResponses()
   {
      var r;

      responses = prompt.getElementsByTagName('*');
      if (!responses.length)
         return false;

      for (r = 0; r < responses.length; r++)
         if (responses[r].className
          && responses[r].className.match(/response|ratings|menuitem/i)
          && !responses[r].className.match(/check/i))
         {
            mistats.unbind(responses[r], 'mouseup', surveyTrack);
            mistats.bind(responses[r], 'mouseup', surveyTrack);
         }

      return true;
   };

   function trackContents()
   {
      var a;
      var signup;

      mistats.interactionTracker.setCount('gcs_abandon', 1);

      bindToAnchors(true);

      signup = prompt.getElementsByTagName('iframe');
      if (signup)
      {
         pollCnt = 0;
         pollPtr = setInterval(function ()
         {
            var login;

            if (++pollCnt > cPollLim)
            {
               clearInterval(pollPtr);
               pollPtr = null;
            }

            if (!(signup && signup[0] && signup[0].contentWindow && signup[0].contentWindow.document))
               return;

            login = signup[0].contentWindow.document.getElementById('plus-link');
            if (!login)
               return;

            mistats.bind(login, 'click', trackSignup);
            clearInterval(pollPtr);
            pollPtr = null;
         }, 500);
      }

      mistats.bind(getElementLikeId(cAnother, prompt), 'click', askAnother);
      bindResponses();
   };

   function resetPoller()
   {
      clearTimeout(pollPtr);
      pollPtr = null;
      pollCnt = 0;
   };

   function hasGCS()
   {
      return (gcs) ? gcs : false;
   };

   function track(pReset)
   {
      var p;

      if (pReset)
      {
         resetPoller();
         if (gcs && typeof mitnt === 'object')
         {
            mitnt.createCookie('mi_gcsGallery', '1', 14);
            if (!mitnt.isInitialized)
               mitnt.load();
         }
      }

      prompt = getElementLikeId(cFrameId);

      if (!(prompt && prompt.style.display === ''))
      {
         if (mistats.interactionTracker.getCount('gcs_abandon'))
            mistats.interactionTracker.setCount('gcs_abandon', 0);

         if (++pollCnt < cPollLim)
            pollPtr = setTimeout(track, 250);

         return;
      }

      resetPoller();

      if (arguments.callee.caller != next)
      {
         s.pageName = 'GallerySurvey Form' + ((first) ? '' : ': First');
         s.channel  = mistats.sitename + ': GallerySurvey: ' + mistats.channel;
         s.prop3    = 'GallerySurvey';

         s.t();

         for (p in origProps)
            s[p] = origProps[p];

         first = true;
      }

      prompt = prompt.contentWindow.document;
      trackContents();
   };

   function init()
   {
      origProps =
      {
         pageName: s.pageName,
         channel:  s.channel,
         prop3:    s.prop3
      };

      pollCnt = 0;

      mistats.bind(window, 'load', function ()
      {
         if (typeof mi !== 'undefined'
          && mi.surveywall
          && mi.surveywall.getConf
          && mi.surveywall.getConf('enabled'))
         {
            gcs = true;
            track(true);
         }
      });
   };

   this.track = track;
   this.hasGCS = hasGCS;

   init();
};

mistats.wordCount = function ()
{
   var cont;
   var entries;
   var i;
   var objs;
   var total;

   if (!(mistats.pagelevel || '').match(/story/i))
      return null;

   entries = [];
   cont = /entry.{0,1}content/i;
   objs = document.getElementsByTagName('*');
   for (i = 0; i < objs.length; i++)
      if (cont.test(objs[i].id || '') || cont.test(objs[i].className || ''))
         entries[entries.length] =
            encodeURIComponent((objs[i].innerHTML || '').
               replace(/<[^>]+>/g, '').
               replace(/&nbsp;/gi, '').
               replace(/\s+/g, ' ').
               replace(/^\s/, '').
               replace(/\s$/, '')
            ).replace(/%20/g, ' ').replace(/%\w{2}/g, '');

   total = entries.length ? entries.join(' ').split(' ').length : 0;
   if (total && total < 50)
      total = 50;
   else
      total = Math.round(total / 100) * 100;

   return 'StoryWords:' + total;
};

/* MI/Omniture Ajax Function Call */
function mistats_resend()
{
   if (mistats.updateTracking)
      mistats.updateTracking('page');
}
/* End MI/Omniture Ajax Function Call */

/* Mobile Tracking Code - Ticket# 727-7330633 - 03/24/08 - JJ*/
if(window.location.pathname.match(/mobile/i))
   mistats.version='1.0|v-mobile'
/* End Mobile Tracking Code */

/* VMix Video Widget Tracking Code - Added: 7/15/09 - JJ*/
var player_loaded = 0;

/* A/B Test Name Tracker - Ticket# 727-8271403 - 09/21/09 -JJ*/
if(typeof(mistats_testsuffix) != 'undefined') {
   if(mistats_testsuffix != "" && mistats_testsuffix.indexOf("a_case") < 0  && mistats_testsuffix.indexOf("default") < 0) {
      mistats.pagename += '|' + mistats_testsuffix;
   }
}

function dhtmlLoadScript(url)
{
   var e = document.createElement("script");
   e.src = url;
   e.type="text/javascript";
   document.getElementsByTagName("head")[0].appendChild(e);
}

function vmixEventHandler(event)
{
   if ((event.type == "player_load") && (!player_loaded))
   {
      player_loaded = 1;
      // Updated evenhandler path/file per ticket # 727-8286782  - JJ
      dhtmlLoadScript("http://media.modbee.com/mistats/vendors/vmix_eventhandler.js");
   } else if (player_loaded) {
      myPlayerEventHandler(event);
   }
}

// Pagename Correction for high-ascii characters - Added 3/8/10 - JJ
var tempString   = new String(mistats.pagename);
mistats.pagename = tempString.replace(/[^\x00-\x7f]/g,'');

// Facebook Fix

// Local Vars
var mi_wls = window.location.search, mi_dr = document.referrer, mi_dc = document.cookie;

// Read Previous Page Cookie
mistats.ppu = mi_dc.match ( '(^|;) ?' + 'mi_ppu' + '=([^;]*)(;|$)' );

// FBC Referrer Check
if(mi_dr.match('facebook.com') && mistats.ppu !== 'null') {
   // Get previous page url
   var mi_rr = unescape(mistats.ppu);
   mi_rr = mi_rr.split('=');
   mi_rr = mi_rr[1].split(',');
   mi_rr = mi_rr[0].split(';');

   // Set s.prop10 (mistats.popstoryurl)
   mistats.popstoryurl = 'Facebook_rec_widget';

   // Get API Key if available
   if(mi_wls.match(/api_key/ig)) {
      mistats.popstoryurl = mistats.popstoryurl + ': api_key';
   }

   // Override Referrer
   s.referrer = mi_rr[0];

   // Make sure we send data
   var mitagsent;
}

// Check for FB caused pageview
if(mi_wls.match(/fb_xd_fragment/ig) || mi_wls.match(/fbc_channel/ig)) {
   var mitagsent = true;
}

// Aurora widget customization tracking. See mianalytics.js
if (typeof mi_aurora_page !== 'undefined' && mi_aurora_page)
{
   mistats.custom2 = mianalytics.getSectionOrder('milistOrder');
   mistats.custom3 = mianalytics.trackCustomizations('mipanelState');
}

// If Caspio form is present, prepend pageName and populate s.prop10
if (document.getElementById('caspioform'))
{
   mistats.pagename = 'CaspioPage|' + mistats.pagename;
   s.prop10 = mistats.bizunit + '|' + mistats.sitename + ': CaspioPage';
}

// Place mistats.popular into one of the local variables if specified in the site file
if (mistats.popular && mistats.subPub)
   switch(mistats.subPub)
   {
      case 1:
         mistats.custom1 = mistats.popular;
         break;
      case 2:
         mistats.custom2 = mistats.popular;
         break;
      case 3:
         mistats.custom3 = mistats.popular;
         break;
      default:
         break;
   };

mistats.bind(window, 'load', function ()
{
   var i;
   var obj;
   var qStr;
   var video;

   if (typeof YT !== 'undefined')
      return;

   obj = document.getElementsByTagName('iframe');
   for (i = 0; !video && i < obj.length; i++)
      (obj[i].src || '').match(/^https*:\/\/www\.youtube\.com\/embed/i) && (video = obj[i]);

   if (!video)
      return;

   !video.id && (video.id = 'mi_yt_player');

   qStr = video.src.indexOf('?');
   qStr = qStr === -1 ? '' : video.src.substr(qStr + 1);
   if (!qStr.match(/enablejsapi=1/i))
   {
      qStr = '?' + qStr.
         replace(/&*enablejsapi=[^&]*/gi, '').
         replace(/&*origin=[^&]*/gi, '').
         replace(/\?+/g, '&').
         replace(/&+/g, '&');
      video.src =
         video.src.replace(/\?.*/, '')
       + qStr
       + (qStr === '?' ? '' : '&')
       + 'enablejsapi=1&origin='
       + encodeURIComponent(location.protocol + '//' + location.hostname);
   }

   if (typeof YT !== 'undefined')
      return;

   obj = document.createElement('script');
   obj.type = 'text/javascript';
   obj.src = 'https://www.youtube.com/iframe_api';
   document.body.appendChild(obj);

   window.onYouTubeIframeAPIReady = function ()
   {
      if (typeof YT !== 'undefined')
         (new YT.Player(video.id, {}));
   };
});

