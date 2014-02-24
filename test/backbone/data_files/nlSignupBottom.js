
nlSignup.initForm();
nlSignup.displayMessage(document.getElementById('msgSpan'));

//custom code
//hide signup form upon successful signup
var tmpurl= document.location+"";
if(tmpurl.search(/wc_result=thx/) != -1){
	jQuery("#newsletterSignUp div.row" ).each(
		function( intIndex ){
					if(intIndex >1){return;}
			this.style.display="none";
		}
	);
}

//error message
if(tmpurl.search(/wc_result=err/) != -1){
	var msgerrspan = document.getElementById('msgSpan');
	msgerrspan.style.color="black";
}
