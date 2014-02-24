/*********************
 * Youtube video embed function.  Should be in siteresouces.js
 */ 
mi.YouTube = function(id,target_div,width,height){
	mi.App.apply(this,arguments);
	this.id=id;
	this.target_div=target_div;
	this.width=width;
	this.height=height;
	this.player={};
	this._loadPlayer();
};
mi.YouTube.prototype._loadPlayer=function(){
	var self=this;
	if(navigator.userAgent.indexOf('MSIE') !== -1){
		//if(true){
			//alert('swfobject');
		/** load swfobject.js
		if(document.getElementById('swfobject_js')===null){
			var tag=document.createElement('script');
			tag.setAttribute('id','swfobject_js');
			tag.src="http://swfobject.googlecode.com/svn/trunk/swfobject/swfobject.js";
			var firstScriptTag=document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
			}
			**/
		swfobject.embedSWF(
      'http://www.youtube.com/v/' + self.id + '?version=3', self.target_div, self.width, self.height, '9.0.0', false, 
      false, {allowfullscreen: 'true'});
	
	} else {
	
		if(document.getElementById('youtube_js')===null){
			var tag=document.createElement('script');
			tag.setAttribute('id','youtube_js');
			tag.src="https://www.youtube.com/iframe_api";
			var firstScriptTag=document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);
			}
		// create youtube player if API is loaded
		try {
			self.player=new YT.Player(self.target_div,{height:self.height,width:self.width,videoId:self.id});
		} catch (e) {
			console.log('API not loaded, will create player using onYouTubeIframeAPIReady');
		}
		window.onYouTubeIframeAPIReady=function(){
			self.player=new YT.Player(self.target_div,{height:self.height,width:self.width,videoId:self.id});
			};
	}
};