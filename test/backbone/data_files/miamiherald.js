// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: Miami Herald
////////////////////////////////////////////////////////////////////////////

// MI Stats Function 
function miStatsObject(){} 

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "Miami Herald"; 	      	      					// Site Name
mistats.account     = "nmmiami";                      					// Report Suite ID
mistats.bizunit     = "MIA";                          					// Business Unit
mistats.pubname     = "MA";                           					// Publication Code
mistats.regcookie   = "miamiherald_user_auth";	      					// Insite Cookie Name
mistats.segcookie   = "segments";                     					// Insite Segments Cookie Name
mistats.sitefile    = "http://media.miamiherald.com/misites/mia/miamiherald.js";	// Site File Name

// Third Party
mistats.tacoda      = "17785";                        					// Tacoda ID
mistats.tyntid	    = "user=aJ9aAabiSr36gxadbiUzgI&s=120";				// Tynt ID

// Call custom .js file for sites use (uncomment to use)
//document.write("\n<" + "script type='text/javascript' src='http://media.mcclatchyinteractive.com/mistats/custom.js'>" + "</" + "script>");

// Yahoo Ads Variables
if( typeof(miyahoo) != 'undefined' ) {
	miyahoo.ads.live.yahoo.request_type = "ac";
	miyahoo.ads.preview.yahoo.request_type = "ac";
	miyahoo.ads.live.yahoo.enabled = false;
	miyahoo.ads.live.dart.enabled = true;
	miyahoo.ads.preview.yahoo.enabled = false;
	miyahoo.ads.preview.dart.enabled = true;

	misite = {};
	misite.yahoo_pub_id = "23449523269";
	misite.yahoo_site_name = "Miami Herald";
}

