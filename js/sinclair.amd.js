define('templates',[],function(){

this["JST"] = this["JST"] || {};

this["JST"]["default/folio.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div id="floating-folio" class="folio">\n  ';
 if(tracker) { ;
__p += '\n    <div class="perc-holder">\n      <div id="tracker"></div>\n    </div> \n  ';
 } ;
__p += '\n  <a href="http://www.miamiherald.com" target="_blank" class="logoB logo"></a>\n  <div id="folio-info">\n    <h2 class="small ral fat upper folio-header"><pre class="folio-title" id="folio-title">' +
((__t = ( folioTitle )) == null ? '' : __t) +
'</pre></h2>\n    <nav class="social-tools">\n      <a class="share-icon twitter-share" href="http://twitter.com/home?status=' +
((__t = ( pageTitle )) == null ? '' : __t) +
'+' +
((__t = ( shortUrl )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href, \'_blank,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n      <a class="share-icon facebook-share" href="http://www.facebook.com/share.php?u=' +
((__t = ( shortUrl )) == null ? '' : __t) +
'&title=' +
((__t = ( pageTitle )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n      <a class="share-icon google-share" href="https://plus.google.com/share?url=' +
((__t = ( shortUrl )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n    </nav>\n  </div>\n  <div class="clearfix"></div>\n</div>\n';

}
return __p
};

this["JST"]["default/footer.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="footer-list ral upper fat xsmall">\n  <a href="http://miamiherald.com" target="_blank" class="logo logoB-tiny"></a>\n  ';
 _.each(links, function(d) { ;
__p += '\n    <a href="' +
((__t = ( d.url )) == null ? '' : __t) +
'" target="_blank">' +
((__t = ( d.name )) == null ? '' : __t) +
'</a>\n  ';
 }) ;
__p += '\n</div>\n';

}
return __p
};

this["JST"]["default/photo.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<figure class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item photo-item">\n  <img src="' +
((__t = ( url )) == null ? '' : __t) +
'" alt="' +
((__t = ( cutline )) == null ? '' : __t) +
'"/>\n  <small class="photo-credit xsmall upper ral align-right block">' +
((__t = ( credit )) == null ? '' : __t) +
'</small>\n  <figcaption>' +
((__t = ( cutline )) == null ? '' : __t) +
'</figcaption>\n  <div class="clearfix"></div>\n</figure>\n';

}
return __p
};

this["JST"]["default/quote.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<blockquote class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item quote-item" cite="' +
((__t = ( citeSrc )) == null ? '' : __t) +
'">\n  <p class="large heavier bright">&ldquo;' +
((__t = ( quote )) == null ? '' : __t) +
'&rdquo;</p>\n  <small class="block">\n    ';
 attrib ;
__p += '\n    ';
 if(citeSrc) { ;
__p += '\n      <a class="gray-link" href="' +
((__t = ( citeSrc )) == null ? '' : __t) +
'" target="_blank">Source &rarr;</a>\n    ';
 } ;
__p += '\n  </small>\n</blockquote>\n';

}
return __p
};

this["JST"]["default/refer.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<aside class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item comment-item">\n  <h3 class="ral fat upper red">' +
((__t = ( hed )) == null ? '' : __t) +
'</h3>\n  <p>' +
((__t = ( readout )) == null ? '' : __t) +
'\n    ';
 if(url) { ;
__p += '\n     <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( gotext )) == null ? '' : __t) +
'</a> \n    ';
 } ;
__p += '\n  </p>\n</aside>\n';

}
return __p
};

this["JST"]["default/video.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<figure class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item video-item">\n  <iframe class="yt-embed" id="' +
((__t = ( videoID )) == null ? '' : __t) +
'" src="http://www.youtube.com/embed/' +
((__t = ( videoID )) == null ? '' : __t) +
'?modestbranding&showinfo=0" frameborder="0" allowfullscreen></iframe>\n  <figcaption><span class="vid-spr ral fat upper">' +
((__t = ( videoTitle )) == null ? '' : __t) +
'</span>' +
((__t = ( videoCaption )) == null ? '' : __t) +
'</figcaption>\n</figure>\n';

}
return __p
};

this["JST"]["miami/folio.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(tracker) { ;
__p += '\n  <div class="perc-holder">\n    <div id="tracker"></div>\n  </div> \n';
 } ;
__p += '\n<div id="floating-folio">\n  <a href="http://www.miamiherald.com" target="_blank" class="logoB"></a>\n  <div id="folio-info">\n    <h2 class="small ral fat upper folio-title" style="position: relative; top: 10px; display: inline-block"><pre id="folio-title">' +
((__t = ( folioTitle )) == null ? '' : __t) +
'</pre></h2>\n    <nav class="social-tools">\n      <a class="share-icon twitter-share" href="http://twitter.com/home?status=' +
((__t = ( pageTitle )) == null ? '' : __t) +
'+' +
((__t = ( shortUrl )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href, \'_blank,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n      <a class="share-icon facebook-share" href="http://www.facebook.com/share.php?u=' +
((__t = ( shortUrl )) == null ? '' : __t) +
'&title=' +
((__t = ( pageTitle )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n      <a class="share-icon google-share" href="https://plus.google.com/share?url=' +
((__t = ( shortUrl )) == null ? '' : __t) +
'" onclick="window.open(return false; this.href,\'_blank\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=260\')"></a>\n    </nav>\n  </div>\n  <div class="clearfix"></div>\n</div>\n\n';

}
return __p
};

this["JST"]["miami/footer.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="footer-list ral upper fat xsmall">\n  <a href="http://miamiherald.com" target="_blank" class="logoB-tiny"></a>\n  ';
 _.each(links, function(d) { ;
__p += '\n    <a href="' +
((__t = ( d.url )) == null ? '' : __t) +
'" target="_blank">' +
((__t = ( d.name )) == null ? '' : __t) +
'</a>\n  ';
 }) ;
__p += '\n</div>\n';

}
return __p
};

this["JST"]["miami/photo.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<figure class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item photo-item">\n  <img src="' +
((__t = ( url )) == null ? '' : __t) +
'" alt="' +
((__t = ( cutline )) == null ? '' : __t) +
'"/>\n  <small class="photo-credit xsmall upper ral align-right block">' +
((__t = ( credit )) == null ? '' : __t) +
'</small>\n  <figcaption>' +
((__t = ( cutline )) == null ? '' : __t) +
'</figcaption>\n  <div class="clearfix"></div>\n</figure>\n';

}
return __p
};

this["JST"]["miami/quote.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<blockquote class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item quote-item" cite="' +
((__t = ( citeSrc )) == null ? '' : __t) +
'">\n  <p class="large heavier bright">&ldquo;' +
((__t = ( quote )) == null ? '' : __t) +
'&rdquo;</p>\n  <small class="block">\n    ';
 attrib ;
__p += '\n    ';
 if(citeSrc) { ;
__p += '\n      <a class="gray-link" href="' +
((__t = ( citeSrc )) == null ? '' : __t) +
'" target="_blank">Source &rarr;</a>\n    ';
 } ;
__p += '\n  </small>\n</blockquote>\n';

}
return __p
};

this["JST"]["miami/refer.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


  var mainClass = (blockType === 'wide') ? 'right' : 'wide';
;
__p += '\n<aside class="' +
((__t = ( mainClass )) == null ? '' : __t) +
' block-item comment-item">\n  <h3 class="ral fat upper red">' +
((__t = ( hed )) == null ? '' : __t) +
'</h3>\n  <p>' +
((__t = ( readout )) == null ? '' : __t) +
'\n    ';
 if(url) { ;
__p += '\n     <a href="' +
((__t = ( url )) == null ? '' : __t) +
'">' +
((__t = ( gotext )) == null ? '' : __t) +
'</a> \n    ';
 } ;
__p += '\n  </p>\n</aside>\n';

}
return __p
};

this["JST"]["miami/video.jst"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<figure class="' +
((__t = ( blockType )) == null ? '' : __t) +
' block-item video-item">\n  <iframe class="yt-embed" id="' +
((__t = ( videoID )) == null ? '' : __t) +
'" src="http://www.youtube.com/embed/' +
((__t = ( videoID )) == null ? '' : __t) +
'?modestbranding&showinfo=0" frameborder="0" allowfullscreen></iframe>\n  <figcaption><span class="vid-spr ral fat upper">' +
((__t = ( videoTitle )) == null ? '' : __t) +
'</span>' +
((__t = ( videoCaption )) == null ? '' : __t) +
'</figcaption>\n</figure>\n';

}
return __p
};

  return this["JST"];

});
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
        var html = $("<div>").append($.parseHTML(data)).find(input.container);
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
            var html = $("<div>").append($.parseHTML(data).find(input.container));
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
    paths: {
      jquery: "//code.jquery.com/jquery.min",
      underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min"

      // Templates compiled directly into the script with Grunt
    },
    shim: {
      templates: ["underscore"]
    }
  });

  define('sinclair',["underscore", "jquery", "templates"], function(_, $, templates) {
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
;
