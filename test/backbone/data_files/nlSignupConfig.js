//custom form checking:
mi_webcollect.prototype.checkForm = function() {
	if (!this.isValidEmail(document.subscribeForm.elements['Email Address'].value)) {
		document.subscribeForm.elements['Email Address'].style.backgroundColor='yellow';
		alert("Please enter a valid Email Address. (name@host.com)");
		document.subscribeForm.elements['Email Address'].focus();
		return false;
	}
	if(!this.checkConfirm()){
		alert("Email addresses do not match");
		return false;
	}
	return true;
}

function clearVal(elem, inputtxt) {
	if (elem.value == inputtxt) {
		elem.value = '';
	}
}
	
function showForm() {

	document.getElementById('showFormSubmitBtn').style.display='none';
    //document.getElementById('ctl00_ContentPlaceMain_SubmitBtn').type = 'submit'; //does not work in IE
	
	//add input button
	/*var submitButton = document.createElement('input');
	submitButton.setAttribute('type', 'submit');
	submitButton.setAttribute('id', 'ctl00_ContentPlaceMain_SubmitBtn');
	submitButton.setAttribute('class', 'tbutton');
	submitButton.setAttribute('src', 'button-subscribe.jpg');
	submitButton.setAttribute('value', '');
	submitButton.setAttribute('onclick', 'actionSub()');
	//submitButton.onclick="actionSub();"
	document.getElementById('confirmEmail').appendChild(submitButton); 
	
	
	var submitButton = document.createElement('input');
	submitButton.type = 'submit';
	submitButton.id = 'ctl00_ContentPlaceMain_SubmitBtn';
	submitButton.name = 'ctl00$ContentPlaceMain$SubmitBtn';
	submitButton.value = '';
	submitButton.onclick = actionSub;
	submitButton.className = 'tbutton';
	document.getElementById('confirmEmail').appendChild(submitButton);*/

	document.getElementById('confirmEmail').style.display='block';
	var pwidth = document.getElementById('p1').offsetWidth;
	document.getElementById('p2').style.width= pwidth+'px';
	
}

function disableEnterKey(e)
{
var key;      
     if(window.event)
          key = window.event.keyCode; //IE
     else
          key = e.which; //firefox      

     return (key != 13);
}