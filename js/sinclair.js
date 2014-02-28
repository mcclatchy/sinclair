/*
 * Sinclair Project
 * author Lazaro Gamio
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

      if(!input.scrapeResource && !input.fallback) {
        input.def.reject("You did not include a resource");
      }

      // Try the live file
      $.ajax({
        url:input.scrapeResource
      }).done( function(data) {
        // Remove all the images and scripts
        data = data.replace(/<(img|script)\b[^>]*>/ig, '');

        // Look for the container and ship along
        var html = $("<div>").append($.parseHTML(data)).find(input.container).html();
        input.def.resolve(html);
      })
      .fail( function() {
        if(input.fallback) {
          $.ajax({
            url: input.fallback
          }).done( function(data) {
            // Remove all the images and scripts
            data = data.replace(/<(img|script)\b[^>]*>/ig, '');

            // Look for the container and ship along
            var html = $("<div>").append($.parseHTML(data)).find(input.container).html();
            input.def.resolve(html);
          })
          .fail( function() {
            input.def.reject("Could not get any of the resources");
          })
        } else {
          input.def.reject("Scrape Resource not available and no fallback set");
        }
      })

      return input.def;
    },

    /*
     * These functions are appended to the $.fn object in the init() function.
     */

    fn: {

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
