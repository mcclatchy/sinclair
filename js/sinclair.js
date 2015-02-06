/*
 * Sinclair Project
 * Lazaro Gamio, Jay Pilgreen
 * copyright The McClatchy Company
 */

var Sinclair = function(selector, context) {
  // Default safety checks if not included
  var defaults = {
    loadContent: {
      container: "",
      def: new $.Deferred()
    },
    folio: {
      pageTitle: 'The Sinclair Project demo page',
      folioTitle: 'Sinclair Demo',
      shortUrl: 'https://github.com/mcclatchy/sinclair',
      flat: true,
      tracker: true,
      template: undefined
    },
    simpleFooter: {
      links: [],
      template: undefined
    },
    photo: {
      blockType: 'wide',
      url: '',
      credit: '',
      cutline: '',
      template: undefined
    },
    quote: {
      blockType: 'wide',
      quote: '',
      attrib: '',
      citeSrc: undefined,
      template: undefined
    },
    refer: {
      blockType: 'wide',
      hed: '',
      readout: '',
      url: '',
      gotext: ''
    },
    video: {
      blockType: 'wide',
      videoID: '',
      videoTitle: '',
      videoCaption: '',
      ratio: 1
    },
		ad: {
			blockType: 'right',
			size: '[300,250]',
			tracking: '',
			targetID: '',
			adPos: 0,
			atf: 'N'
		}
  }

  return {

    /*
     * Initialize and set the configs
     */
    
    init: function(input) {
      $.extend(true, defaults, input);

      // Pass the defaults through .. if only to view in the console
      this.defaults = defaults;

      // Set the jQuery functions to include
      $.extend($.fn, this.fn);
    },

    /*
     * Main content loader. Fetches the remote url, or loads a backup file if necessary
     */

    loadContent: function(input) {
      // Allow the overload
      input = $.extend(defaults.loadContent, input);
      
      /*
       * Helper functions for handling the loading
       *
       * fetchContainer, will grab the HTML structure of docs, importing either container
       * nodes with all of their children or grabbing each individual, targeted node (a
       * container is stripped out, if this is the case)
       *
       * Additionally, a series of failure functions provide backup loading. The goal
       * being to load the primary resource if feasible, but if failing then to load a
       * local copy. The process is: AJAX call to primary source -> AJAX call to backup ->
       * attempt to broaden the the document's domain by removing any subdomains and
       * loading the primary via an iframe -> loading the backup as an iframe.
       *
       * Failure states include AJAX and access fails, but also retrieving empty jQuery
       * selectors (side stepping interstitial ads). It's notable that regardless of
       * success on the first backup load, the primary source will try to be called via
       * iframe (but order is dictated by not being able to reset any cleared subdomains).
       */
      
      var html="";
      
      function fetchContainer(data,selector){
      	html="";
      	if($.parseHTML(data)){
      		data=$.parseHTML(data);
      	}
      	$(data).find(selector).each(function(){
      		var isContainer=true;
			for(cc=0;cc<$(this).contents().length;cc++){
				if($(this).contents()[cc].nodeType==Node.TEXT_NODE && $(this).contents()[cc].nodeValue.trim().length>0){
					isContainer=false;
					break;
				}
			}
			if(!isContainer){
				html+='<'+$(this).prop('tagName');
				if($(this).attr('class')){
					html+=' class="'+$(this).attr('class')+'"';
				}
				if($(this).attr('id')){
					html+=' id="'+$(this).attr('class')+'"';
				}
				html+='>';
			}
			html += $(this).html();
			if(!isContainer){
				html+='</'+$(this).prop('tagName')+'>';
			}
		});
		return html;
      }

      if(!input.scrapeResource && !input.fallback) {
        input.def.reject("You did not include a resource");
      }
      
      /* AVOID A MIXED CONTENT WARNING QUIETLY THROWN WHILE STAGING ON THE GOOGLE DRIVE SERVERS */
      if(location.protocol==="https:" && input.scrapeResource.indexOf("http://")>=0 && input.fallback.indexOf("http://")<0){
      	console.log("The primary resource would present mixed content on a secure page; subbing in the secure fallback resource instead");
      	input.scrapeResource=input.fallback;
      }

      // Try the live file
      $.ajax({
        url:input.scrapeResource,
        success: function(data){
			// Remove all the images and scripts
			data = data.replace(/<(img|script)\b[^>]*>/ig, '');
			
			// Look for any matching containers and ship along all of their contents
	        html = fetchContainer(data,input.container);
	        
			if(html.length <= 0){
				console.log("No content found, loading fallback")
				loadBackup();
			} else {
				input.def.resolve(html);
				return input.def;
			}
        },
        error: loadBackup = function(){
			if(input.fallback) {
			  $.ajax({
				url: input.fallback,
				success:function(data){
					// Remove all the images and scripts
					data = data.replace(/<(img|script)\b[^>]*>/ig, '');
			
					// Look for any matching containers and ship along all of their contents
					html = fetchContainer(data,input.container);
					
					if(html.length <= 0){
						console.log("No content found in fallback");
					} else {
						//We will not use this now. If we cannot later load out primary, then we will use the fallback
						//input.def.resolve(html);
						//return input.def;
					}
				},
				error: function(){
					console.log("Could not get the backup resource");
				}
			  });
			} else {
			  console.log("Scrape Resource not available and no fallback set");
			}
			  
		    //Always load the iframe, if successfully -- overwrite the fallback response
			document.domain=document.domain.split(".").slice(-2).join("."); //Broaden the domain to drop any subdomains
			var srcFile=document.createElement("iframe");
			srcFile.id="source_text";
			srcFile.src=input.scrapeResource;
			srcFile.style.display="none";
			srcFile.style.width="100%";
			srcFile.style.height="100%";
			srcFile.onload=function(){
				var srcTxt = null;
				try{
					srcTxt = this.contentDocument || this.contentWindow.document; //Grab the iframe's content, if we can do so with expanded domains
					$(srcTxt).find("iframe,script").remove();
				} catch(e){
					console.log(e);
					if(html.length > 0) {
						//If we could not grab the main via iframe (or if it was empty) we will use the already retrieved fallback
						input.def.resolve(html);
						return input.def;
					} else {
						//If we could not get the main and fallback (or they were empty) we will try and grab the fallback via iframe
						srcTxt=null;
						srcFile.src=input.fallback;
						srcFile.onload=function(){
							try{
								srcTxt = this.contentDocument || this.contentWindow.document; //Grab the iframe's content, if we can do so with expanded domains
							} catch(e){
								srcFile.parentNode.removeChild(srcFile);
								//All four methods (main, main via iframe, fallback and fallback via iframe) have all failed
								input.def.reject("Both resources have failed to load via all available methods");
							} finally {
								$(srcTxt).remove("iframe,script");
								srcFile.parentNode.removeChild(srcFile);
								//After failing the first 3 methods, we can use the fallback grabbed via iframe
								html = fetchContainer(srcTxt.body,input.container);
								input.def.resolve(html);
								return input.def;
							}
						}
						document.body.appendChild(srcFile);
					}
					srcFile.parentNode.removeChild(srcFile);
				} finally{
					srcFile.parentNode.removeChild(srcFile);
					$(srcTxt).find("iframe,script").remove();
					html = fetchContainer(srcTxt.body,input.container);
					input.def.resolve(html);
					return input.def;
				}
			}
			document.body.appendChild(srcFile);
        }
      });

      return input.def;
    },

    /*
     * These functions are appended to the $.fn object in the init() function.
     */

    fn: {

			layoutMode: function() {
				var tick = 0;
				$(this).each( function() {
					$(this).prepend("<span style='font-size: 150%; color: #999; padding-right: 10px;'>" + tick + ".</span>");
					tick++;
				});
			},

      /*
       * Draws the bar at the top
       */

      folio: function(input) {
        var self = this;
        input = $.extend(defaults.folio, input);

        // Force booleans
        if(typeof input.flat == "string") input.flat = (input.flat === "true") ? true : false;
        if(typeof input.tracker == "string") input.tracker = (input.tracker === "true") ? true : false;

        if(!input.template) {
          input.template = defaults.templates["default/folio.jst"];
        }

        var html = input.template(input);
        $("body").prepend(html);

        if (input.flat === true) {
          $('#floating-folio').show()
          $('body').css('margin-top', $('#floating-folio').outerHeight(true) + 'px')
        }

        $(window).scroll(function() {
          var $scrollTrigger = self.outerHeight(true);
          var $windowTop = $(window).scrollTop();
          var $windowWidth = $(window).width();
          if ($windowTop > $scrollTrigger && $windowWidth > 920 && input.flat !== true) {
            $('#floating-folio').slideDown(200);
          }
          if ($windowTop < $scrollTrigger && $windowWidth > 920 && input.flat !== true) {
            $('#floating-folio').slideUp(200);
          }

          // RUN TRACKER
          $totalHeight = $('body').height() - $(window).height();
          $('#tracker').css('width', (($windowTop / $totalHeight) * 100) + '%');
        });

        // Allow chaining
        return self;
      },

      /*
       * Simple Footer
       */

      simpleFooter: function(input) {
        var self = this;
        input = $.extend(defaults.simpleFooter, input);

        if(!input.template) {
          input.template = defaults.templates["default/footer.jst"];
        }

        var html = input.template(input);
        self.append(html);

        // Allow chaining
        return self;
      },

      /*
       * Basic Elements
       */

      photo: function(input) {
        var self = this;
        input = $.extend(defaults.photo, input);

        if(!input.template) {
          input.template = defaults.templates["default/photo.jst"];
        }

        var html = input.template(input);
        self.before(html);

        // Allow chaining
        return self;
      },

      quote: function(input) {
        var self = this;
        input = $.extend(defaults.quote, input);

        if(!input.template) {
          input.template = defaults.templates["default/quote.jst"];
        }

        var html = input.template(input);
        self.before(html);

        // Allow chaining
        return self;
      },

      refer: function(input) {
        var self = this;
        input = $.extend(defaults.refer, input);

        if(!input.template) {
          input.template = defaults.templates["default/refer.jst"];
        }

        var html = input.template(input);
        self.before(html);

        // Allow chaining
        return self;
      },

      video: function(input) {
        var self = this;
        input = $.extend(defaults.video, input);

        if(!input.template) {
          input.template = defaults.templates["default/video.jst"];
        }

        var html = input.template(input);
        self.before(html);

        $('#' + input.videoID).height(function() {
          return $(this).width() / input.ratio;
        })

        // Allow chaining
        return self;
      },

			code: function(input) {
				var self = this;
				input = $.extend(defaults.code, input);

				if(!input.template) {
					input.template = defaults.templates["default/code.jst"];
				}

				var html = input.template(input);
				self.before(html);

				// Allow chaining
				return self;
			},
			hype: function(input) {
				var self = this;
				input = $.extend(defaults.hype, input);
				
				if(!input.template) {
					input.template = defaults.templates["default/hype.jst"];
				}
				
				var html = input.template(input);
				self.before(html);
				
				//Allow chaining
				return self;
			},
			
			ad: function(input) {
				var self = this;
				input = $.extend(defaults.ad, input);

				if(!input.template) {
					input.template = defaults.templates["default/ad.jst"];
				}

				var html = input.template(input);
				self.before(html);

				// Allow chaining
				return self;
			}
    }
  }
}

/*
 * AMD Support
 */

if ( typeof define === "function" && define.amd ) {
  require.config({
    shim: {
      templates: ["underscore"]
    }
  });

  define(["underscore", "jquery", "templates"], function(_, $, templates) {
    var sinclair = new Sinclair();
    sinclair.init({ templates: templates });
    return sinclair;
  })
} 

/*
 * No AMD requires jQuery and UnderscoreJS
 */

else if(window.$ && window._ && window.Templates) {
  window.sinclair = new Sinclair();
  window.sinclair.init({ templates: window.Templates });

  (function($) {
    $.extend($.fn, window.sinclair.fn);
  }(jQuery)); 
}

/*
 * Not possible .. issue a warning
 */

else {
  console.error("Error: Sinclair project requires jQuery, UnderscoreJS and the Templates be loaded when not using RequireJS.");
}
