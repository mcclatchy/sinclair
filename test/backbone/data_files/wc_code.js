
//constructor
function mi_webcollect(accountID,thanksMessage,unsubMessage,errorMessage)
{
	this.accountID  = accountID;
	this.thanksMessage = thanksMessage;
	this.unsubMessage = unsubMessage;
	this.errorMessage = errorMessage;
	this.lists = new Array();
	this.formFields = new Array();
}

//config: add fields to the form
mi_webcollect.prototype.addFields = function()
{
	for( var i = 0; i < arguments.length; i++ ) {
		this.formFields.push(arguments[i]);
	}
}

//add a list - for dynamically changing lists from the config file
mi_webcollect.prototype.addList = function(listID, inputID, labelID, labelText)
{
	var temp = new Array(inputID,labelID,labelText);
	this.lists[listID] = temp;
}

//  START CODE FROM ET
// isEmail (STRING s [, BOOLEAN emptyOK])
// whitespace characters
// Email address must be of form a@b.c ... in other words:
// * there must be at least one character before the @
// * there must be at least one character before and after the .
// * the characters @ and . are both required
mi_webcollect.prototype.isValidEmail = function(s)
{   
	if (this.isEmpty(s)) return false;
   
	// is s whitespace?
	if (this.isWhitespace(s)) return false;
	    
	// there must be >= 1 character before @, so we
	// start looking at character position 1 
	// (i.e. second character)
	var i = 1;
	var sLength = s.length;

	// look for @
	while ((i < sLength) && (s.charAt(i) != "@"))
	{ i++
	}

	if ((i >= sLength) || (s.charAt(i) != "@")) return false;
	else i += 2;

	// look for .
	while ((i < sLength) && (s.charAt(i) != "."))
	{ i++
	}

	// there must be at least one character after the .
	if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
	else return true;
}

// Check whether string s is empty.
mi_webcollect.prototype.isEmpty = function(s)
{   
	return ((s == null) || (s.length == 0))
}

// Returns true if string s is empty or 
// whitespace characters only.
mi_webcollect.prototype.isWhitespace = function(s)
{   
	var i;
	var whitespace = " \t\n\r";

    // Is s empty?
    if (this.isEmpty(s)) return true;

    // Search through string's characters one by one
    // until we find a non-whitespace character.
    // When we do, return false; if we don't, return true.
    for (i = 0; i < s.length; i++)
    {   
		// Check that current character isn't whitespace.
		var c = s.charAt(i);

		if (whitespace.indexOf(c) == -1) return false;
    }
    // All characters are whitespace.
    return true;
}
	
mi_webcollect.prototype.checkForm = function() {
	z=0;
	celements=document.getElementsByName('lid');
		for (c=0;c<celements.length;c++){
		if (celements[c].checked){
			z=z+1;
			}
		}
	if (z<1){
	alert("Please select at least one list.");
		return false;
	}
	if (!this.isValidEmail(document.subscribeForm.elements['Email Address'].value)) {
		document.subscribeForm.elements['Email Address'].style.backgroundColor='yellow';
		alert("Please enter a valid Email Address. (name@host.com)");
		document.subscribeForm.elements['Email Address'].focus();
		return false;
	}
	if(!this.checkConfirm()){
		alert("Email addresses do not match");//added scc
		return false;
	}
	return true;
}
//  END CODE FROM ET

mi_webcollect.prototype.addQueryString = function(theurl, qs)
{
	theurl += "";
	//remove old status from query string
	theurl = this.removeQueryVariables(theurl, 'wc_result');
	theurl = this.removeQueryVariables(theurl, 'errorcontrol');
	theurl = this.removeQueryVariables(theurl, 'errorcode');
	
	if(theurl.search(/\?.+/) != -1){theurl += '&' + qs;}
	else{theurl += '?' + qs;}
	return theurl;
}

//removes a variable from the query string
mi_webcollect.prototype.removeQueryVariables = function(theurl, qsVar)
{
	theurl += "";
	try{
		var searchExp = new RegExp("\\?"+qsVar+"=[^&\\n]+?&", '');//start
		theurl = theurl.replace(searchExp, "?");
	}catch(exception){}
	try{
		var searchExp = new RegExp("\\?"+qsVar+"=[^&\\n]+?$", '');//only
		theurl = theurl.replace(searchExp, "");
	}catch(exception){}
	try{
		var searchExp = new RegExp("&"+qsVar+"=[^&\\n]+?$", '');//end
		theurl = theurl.replace(searchExp, "");
	}catch(exception){}
	try{
		var searchExp = new RegExp("&"+qsVar+"=[^&\\n]+?&", '');//middle
		theurl = theurl.replace(searchExp, "&");
	}catch(exception){}

	return theurl;
}

//grabs result message from URL, displays a message in the target element of id=msgEl
mi_webcollect.prototype.displayMessage = function(msgEl)
{
	if(typeof(msgEl) == 'undefined'){return;}
	if(msgEl == null){return;}
	var curPage = document.location + "";
	var messageCode = curPage.replace(/.+wc_result=(\w+).*/, "$1");
	var message = "";
	switch(messageCode)
	{
	case 'thx':
	  message = this.thanksMessage;
	  break;
	case 'err':
	  message = this.errorMessage;
	  break;
	case 'unsub':
	  message = this.unsubMessage;
	  break;
	default:
	  message = '';
	}
	msgEl.innerHTML = message;
}

//if using two email address inputs, checks to make sure they're both the same
mi_webcollect.prototype.checkConfirm = function()
{
	var email1 = document.subscribeForm.elements['Email Address'];
	var email2 = document.subscribeForm.elements['Email Address2'];
	if(email1 != null && email2 != null){
		if(email1.value == email2.value){return true;}
		else{
			email2.style.backgroundColor='yellow';
			email1.style.backgroundColor='yellow';
			return false;
		}
	}
	else{return true;}
}

//changes form to subscribe
mi_webcollect.prototype.actionSub = function()
{
	var subAction = document.getElementById('subAction');
	subAction.value = 'sub_add_update';//subscribe new user, update existing user
	//subAction.value = 'sub';//subscribe new users, do not update existing
}

//changes form to unsubscribe
mi_webcollect.prototype.actionUnsub = function()
{
	var subAction = document.getElementById('subAction');
	subAction.value = 'unsub';
}

//dymicically configure the form
mi_webcollect.prototype.initForm = function()
{
	// init elements:
	var thx_page_input = document.getElementById('thx_page_input');
	var error_page_input = document.getElementById('error_page_input');
	var unsub_page_input = document.getElementById('unsub_page_input');
	var et_account = document.getElementById('et_account');
	var wc_widgetForm = document.getElementById('wc_widgetForm');
	var msgSpan = document.getElementById('msgSpan');
	var subAction = document.getElementById('subAction');
	var curPage = document.location + "";

	//set up the form
	thx_page_input.value = this.addQueryString(curPage, 'wc_result=thx');
	error_page_input.value = this.addQueryString(curPage, 'wc_result=err');
	unsub_page_input.value = this.addQueryString(curPage, 'wc_result=unsub');
	et_account.value = this.accountID ;
	//wc_widgetForm.action = "http://cl.exct.net/subscribe.aspx?lid=" + this.listID;	
	
	//set any dynamically set lists:
	this.initLists();
}

mi_webcollect.prototype.initLists = function()
{
	for ( var list in this.lists ){
		var inputElement = document.getElementById(this.lists[list][0]);
		var labelElement = document.getElementById(this.lists[list][1]);
		if(inputElement != null){
			inputElement.value = list;//set list ID
		}
		if(labelElement != null){
			labelElement.innerHTML = this.lists[list][2];//set list label
		}
	}
}

//make form fields
mi_webcollect.prototype.makeFields = function()
{
	var formText = "";
	var fields = this.formFields;
	for ( var field in this.formFields ){
		formText += '<input type="text" name="'+this.formFields[field]+'">';
	}
	return formText;
}

//get error code returned by ExactTarget
mi_webcollect.prototype.getErrorCode = function()
{
	var code = "";
	var errMsg = "";
	var errorcontrol = "";
	var curPage = document.location + "";
	if(curPage.search(/.+errorcode=\d+.*/) != -1){
		code = curPage.replace(/.+errorcode=(\d+).*/, "$1");
	}
	if(curPage.search(/.+errorcontrol=(.+?)&.*/) != -1){
		errorcontrol = curPage.replace(/.+errorcontrol=(.+?)&.*/, "$1");
	}
	else if(curPage.search(/.+errorcontrol=([^&]+?)$/) != -1){
		errorcontrol = curPage.replace(/.+errorcontrol=([^&]+?)$/, "$1");
	}
	errorcontrol = unescape(errorcontrol);
	switch(code)
	{
		case '1':
			errMsg = "An error has occurred while attempting to save your subscriber information.";
			break;

		case '2':
			errMsg = "The list provided does not exist.";
			break;

		case '3':
			errMsg = "Information was not provided for a mandatory field ("+errorcontrol+").";
			break;

		case '4':
			errMsg = "Invalid information was provided ("+errorcontrol+").";
			break;

		case '5':
			errMsg = "Information provided is not unique ("+errorcontrol+").";
			break;

		case '6':
			errMsg = "An error has occurred while attempting to save your subscriber information.";
			break;

		case '7':
			errMsg = "An error has occurred while attempting to save your subscriber information.";
			break;
	 
		case '8':
			errMsg = "You have already subscribed to this list.";
			break;
	 
		case '9':
			errMsg = "An error has occurred while attempting to save your subscriber information.";
			break;
	 
		case '10':
			errMsg = "An error has occurred while attempting to save your subscriber information.";
			break;
	 
		case '12':
			errMsg = "The email address is already unsubscribed.";
			break;
	 
		case '14':
			errMsg = "The query string contains ETsubscriberKey and the Subscriber Key feature is not enabled on your account.";
			break;
	 
		default:
		  errMsg = '';
	}
	return errMsg;
}
