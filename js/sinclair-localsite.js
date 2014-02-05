// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: Macon Telegraph
////////////////////////////////////////////////////////////////////////////

// MI Stats Function 
function miStatsObject(){} 

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "Macon Telegraph"; 	      			// Site Name
mistats.account     = "nmmacon";                      			// Report Suite ID
mistats.bizunit     = "MAC";                          			// Business Unit
mistats.pubname     = "MA";                           			// Publication Code
mistats.regcookie   = "thetelegraph_user_auth";       			// Insite Cookie Name
mistats.segcookie   = "segments";                     			// Insite Segments Cookie Name
mistats.sitefile    = "http://media.macon.com/misites/mac/macon.js";	// Site Specific File Name

// Third Party
mistats.tacoda      = "17782";			      			// Tacoda ID
mistats.tyntid	    = "user=djBpfubiOr36gxadbiUzgI&s=122";		// Tynt ID

// Call custom .js file for sites use (uncomment to use)
//document.write("\n<" + "script type='text/javascript' src='http://media.mcclatchyinteractive.com/mistats/custom.js'>" + "</" + "script>");

mistats.tntLoader = function ()
{
   var head;
   var script;

   function mediaDomain()
   {
      var i;
      var md;
      var scripts;

      scripts = document.getElementsByTagName('script');
      for (i = 0; i < scripts.length; i++)
      {
         md = (scripts[i].src || '').match(/^https*:\/\/media\d?\.\w+\.com\/mi\w+/i);
         if (md)
            return md[0].substr(0, md[0].lastIndexOf('/'));
      }

      return location.protocol + '//media.mcclatchyinteractive.com';
   };

   if (!location.hostname.match(/dealsaver|syncaccess/i))
      return document.write('<scr' + 'ipt type="text/javascript" src="' + mediaDomain() + '/mistats/mitnt_common.js"></scr' + 'ipt>');

   head = document.getElementsByTagName('head');
   if (!head.length)
      return;

   script = document.createElement('script');
   script.type = 'text/javascript';
   script.async = 'async';
   script.src = mediaDomain() + '/mistats/mitnt_common.js';
   head[0].appendChild(script);
};

mistats.tntLoader();

// Yahoo Site Variables
if (typeof miyahoo !== 'undefined')
{
   miyahoo.ads.live.yahoo.request_type = "fc";
   miyahoo.ads.preview.yahoo.request_type = "ac";
   miyahoo.ads.live.yahoo.enabled = true;
   miyahoo.ads.live.dart.enabled = true;
   miyahoo.ads.preview.yahoo.enabled = false;
   miyahoo.ads.preview.dart.enabled = true;

   misite = {};
   misite.yahoo_pub_id = "20411155868";
   misite.yahoo_site_name = "The Telegraph";
}

