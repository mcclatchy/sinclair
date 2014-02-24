this["Templates"] = this["Templates"] || {};

this["Templates"]["default/folio.jst"] = function(obj) {
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

this["Templates"]["default/footer.jst"] = function(obj) {
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

this["Templates"]["default/photo.jst"] = function(obj) {
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

this["Templates"]["default/quote.jst"] = function(obj) {
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

this["Templates"]["default/refer.jst"] = function(obj) {
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

this["Templates"]["default/video.jst"] = function(obj) {
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

this["Templates"]["miami/folio.jst"] = function(obj) {
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

this["Templates"]["miami/footer.jst"] = function(obj) {
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

this["Templates"]["miami/photo.jst"] = function(obj) {
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

this["Templates"]["miami/quote.jst"] = function(obj) {
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

this["Templates"]["miami/refer.jst"] = function(obj) {
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

this["Templates"]["miami/video.jst"] = function(obj) {
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