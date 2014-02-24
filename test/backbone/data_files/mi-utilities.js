function addEvent(objObject, strEventName, fnHandler) {
  if (objObject.addEventListener) {
    objObject.addEventListener(strEventName, fnHandler, false);
  } else if (objObject.attachEvent) {
    objObject.attachEvent("on" + strEventName, fnHandler);
  }
}
function removeEvent(objObject, strEventName, fnHandler) {
  /* works on events added via addEvent(), hard coded events aren't removed */
  if (objObject.removeEventListener) {
    objObject.removeEventListener(strEventName, fnHandler, false);
  } else if (objObject.detachEvent) {
    objObject.detachEvent("on" + strEventName, fnHandler);
  }
}
function getEventSrc(e) {
  if (!e) e = window.event;
  if (e.target) {
    return e.target;
  } else if (e.srcElement) {
    return e.srcElement;
  }
}

// date functions **************************************************************

Date.prototype.getDayString = function(){
  var day = '';
  switch (this.getDay()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}
Date.prototype.getMonthString = function(full){
  var day = '';
  switch (this.getMonth()) {
    case 0:
      return (full)?'January':'Jan';
    case 1:
      return (full)?'February':'Feb';
    case 2:
      return (full)?'March':'Mar';
    case 3:
      return (full)?'April':'Apr';
    case 4:
      return 'May';
    case 5:
      return (full)?'June':'Jun';
    case 6:
      return (full)?'July':'Jul';
    case 7:
      return (full)?'August':'Aug';
    case 8:
      return (full)?'September':'Sep';
    case 9:
      return (full)?'October':'Oct';
    case 10:
      return (full)?'November':'Nov';
    case 11:
      return (full)?'December':'Dec';
  }
}
Date.prototype.spanishDay = function(){
  var day = '';
  switch (this.getDay()) {
    case 0:
      return 'domingo';
    case 1:
      return 'lunes';
    case 2:
      return 'martes';
    case 3:
      return 'mi&eacute;rcoles';
    case 4:
      return 'jueves';
    case 5:
      return 'viernes';
    case 6:
      return 's&aacute;bado';
  }
}
Date.prototype.spanishMonth = function(full){
  var day = '';
  switch (this.getMonth()) {
    case 0:
      return (full)?'enero':'ene';
    case 1:
      return (full)?'febrero':'feb';
    case 2:
      return (full)?'marzo':'mar';
    case 3:
      return (full)?'abril':'abr';
    case 4:
      return (full)?'mayo':'may';
    case 5:
      return (full)?'junio':'jun';
    case 6:
      return (full)?'julio':'jul';
    case 7:
      return (full)?'agosto':'aug';
    case 8:
      return (full)?'septiembre':'sep';
    case 9:
      return (full)?'octubre':'oct';
    case 10:
      return (full)?'noviembre':'nov';
    case 11:
      return (full)?'diciembre':'dec';
  }
}
// end date functions **********************************************************

function openWindow(url,wname,h,w) {
  var parms = 'resizable,scrollbars,height='+h+',width='+w;
  window.open(url,wname,parms);
}

function addOnClick(selector,wname,h,w) {
  $(selector).click(function(){openWindow(this.href,wname,h,w); return false;})
}

function updateMPSTLink(selector) {
  addOnClick(selector,'marketURL',400,600);
}

// code below should probably be located in a different library, or in the site.js file

// tabbed box code *************************************************************
// IMPORTANT: use of this file requires the presence of the jquery.js library!
/*
function showTab(o) {
//alert('starting tab prep');
  $('.tabname').removeClass('tabon');
  o.className += ' tabon';
  var id='#'+o.href.match(/#(\w.+)/)[1];
  $('.tabbox').removeClass('tabon');
  $('.tabbox '+id).addClass('tabon');
//alert('tab prep complete');
}
//alert('schedule tab box prep');
if (typeof window.jQuery != "undefined") {$(document).ready(function(){$('a.tabname').click(function(){showTab(this);return false;});});}
*/
// end tabbed box code *********************************************************

/*
var newWindow = null
function pops(gotoUrl) {
  if(!newWindow || newWindow.closed) {
    newWindow = open(gotoUrl,"Name2","width=650,height=500,resizable=yes,menubar=no,scrollbars=auto,status=no,left=50,top=50");
  } else {
    newWindow.location = (gotoUrl);
    newWindow.focus();
  }
}
*/

// ordered list forms code *****************************************************
// IMPORTANT: use of this file requires the presence of the jquery.js library!
/*if( document.addEventListener ) document.addEventListener( 'DOMContentLoaded', olform, false);

function olform(){
  // Hide forms
//alert('prep ordered list forms');
  $( 'form.olform' ).hide().end();

  // Processing
  $( 'form.olform' ).find( 'li/label' ).not( '.nodf' ).each( function( i ){
    var labelContent = this.innerHTML;
    var labelWidth = document.defaultView.getComputedStyle( this, '' ).getPropertyValue( 'width' );
    var labelSpan = document.createElement( 'span' );
    labelSpan.style.display = 'block';
    labelSpan.style.width = labelWidth;
    labelSpan.innerHTML = labelContent;
    this.style.display = '-moz-inline-box';
    this.innerHTML = null;
    this.appendChild( labelSpan );
  } ).end();

  // Show forms
  $( 'form.olform' ).show().end();
//alert('ordered list forms prep complete');
}*/
// end ordered list forms ******************************************************
//alert('mi-utilities complete');

function ppRichMedia(object, type) {
  // default flv playback
  var width = 783;
  var height = 430; 
  if (type == "mp3")
  {
    width = 322;
    height = 470;
  }
  var left = window.screen.width/2 - width/2;
  var top = window.screen.height/2 - height/2;
  window.open(object.href,'mh' + type ,'width=' + width + ',height=' + height + ',resizable=no,left=' + left + ',top=' + top + ',screenx=' + left + ',screeny=' + top);
  return false;
}

/**
 * Function to clear an input field
 * Usage: onClick="clearf(this, '<value to test against for clearing such as "Your Zip Code">')" as input tag parameter
 */
function clearf(object,text){
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
function setf(object,text){
                if(object.value == "")
                {
                        object.value = text;
                        this.focus();
                }
}

