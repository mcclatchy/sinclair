// Program: insite_cookie_manager.jsa
// Purpose: This program should be used to extract user information from either the default '<SITENAME>_user_auth' cookie, 
//   or the more detailed 'insite_account_info' cookie.  
//   NOTE: The 'insite_account_info' cookie is not used by Insite by default, and must be added to the list of custom cookies. See wiki for details.
// Expected Use:
//   When a user instantiates this object several variables will be set and available to the user these are, also users can call the methods outlined here if they need to for some reason.  NOTE: All variables after 'userLoggedIn' are only set if the user is acually logged into Insite.
//     userLoggedIn = 1 if logged in, 0 if not
//     userID       = Users Insite ID
//     userName     = Users Insite username
//     firstName    = Users first name as Insite sees it
//     lastName     = Users last name as Insite sees it
//     email        = Users Email as registered with Insite
// Author:  Ara Yapejian - 3/31/2008

function Insite_Cookie_Manager() {
	// The name of the default Insite Cookie as well as the more detailed 'insite_account_info' cookie
	this.insiteDefaultCookie = 'user_auth';
	this.insiteAccountInfoCookie = 'insite_account_info';
	
	// Purpose: This function will return 1 if the user is logged into insite, and 0 if not.
	this.isUserLoggedIn = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) )
				return( "1" );
			else 
				return( "0" );
		}
	}
	
	// Purpose: This function will return the Insite users 'username' from the default, and always available (When logged in) 'user_auth' cookie.
	this.getInsiteUserName = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				var end = cookieValue[2].indexOf( "%7C" );
				var userName = cookieValue[2].substr(0, end);
				return( userName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users insite ID from the 'insite_account_info' cookie
	this.getInsiteID = function() {
		if( document.cookie.length > 0 ) {
				var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			        if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
					// Get the index of the first and last character in the cookie argument we need
					var start = cookieValue[2].indexOf( "id%3D" );
					var end   = cookieValue[2].indexOf( "%7C", start );
					// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
					//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
					// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the
					//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
					if( end == -1 )
						var extractedCookieValue = cookieValue[2].substr( start );
					else
						var extractedCookieValue = cookieValue[2].substring( start,end );
					start = extractedCookieValue.indexOf( "%3D" );
					start = start + 3;
					var ID = extractedCookieValue.substr(start);
					return( ID );
				} else
					return( "0" );
			} else
				return( "0" );
	}
	
	// Purpose: This function will return the users first name from the 'insite_account_info' cookie
	this.getInsiteFirstName = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "first_name%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 )
					var extractedCookieValue = cookieValue[2].substr( start );
				else
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var firstName = extractedCookieValue.substr(start);
	
				return( firstName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users last name from the 'insite_account_info' cookie
	this.getInsiteLastName = function() {
	if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "last_name%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the 
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 )
					var extractedCookieValue = cookieValue[2].substr( start );
				else                    
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var lastName = extractedCookieValue.substr(start);
	
				return( lastName );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	
	// Purpose: This function will return the users email from the 'insite_account_info' cookie
	this.getInsiteEmail = function() {
		if( document.cookie.length > 0 ) {
			var cookieValue = document.cookie.match( '(^|;)*' + this.insiteAccountInfoCookie + '=([^;]*)(;|$)' );
			if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
				// Get the index of the first and last character in the cookie argument we need
				var start = cookieValue[2].indexOf( "email%3D" );
				var end   = cookieValue[2].indexOf( "%7C", start );
				// Extract that one piece of the cookie based on the start, end values.  The calculate a new 'start' for the '=' to get the 
				//   actual value of the piece we are interested ... increment by 3 based on teh '%3D' Hex code for '='
				// The little 'end == -1' part is needed if the value found is the last value in the cookie ... if it is then the 
				//   'end' index (where we look for the next occurence of a pipe ("%7C") wont exist and brakes stuff.
				if( end == -1 ) 
					var extractedCookieValue = cookieValue[2].substr( start );
				else 
					var extractedCookieValue = cookieValue[2].substring( start,end );
				start = extractedCookieValue.indexOf( "%3D" );
				start = start + 3;
				var email = extractedCookieValue.substr(start);
	
				return( email );
			} else
				return( "0" );
		} else
			return( "0" );
	}
	

// ***********************************
// THE MAIN CONSTRUCTOR FOR THE CLASS
// ***********************************
	this.userLoggedIn = this.isUserLoggedIn();
	// If the user is logged in get all info
	if( this.userLoggedIn != 0 ) {
		this.userID       = this.getInsiteID();
		this.userName     = this.getInsiteUserName();
		this.firstName    = this.getInsiteFirstName();
		this.lastName     = this.getInsiteLastName();
		this.email        = this.getInsiteEmail();
	} else {
		this.userID       = "";
		this.userName     = "";
		this.firstName    = "";
		this.lastName     = "";
		this.email        = "";
        }
	
} // END OF PROGRAM


// ##################
// PURPOSE: This function fetches our insite cookie and returns the insite userName or "-1" if not logged in
function getInsiteUserName( myInsiteCookieName ) {
        if( document.cookie.length > 0 ) {
                var cookieValue = document.cookie.match( '(^|;)*' + myInsiteCookieName + '=([^;]*)(;|$)' );
	        if( cookieValue && !document.cookie.match( '(^|;)*' + this.insiteDefaultCookie + '=\.threshold([^;]*)(;|$)' ) ){
                        var end = cookieValue[2].indexOf( "%7C" );
                        var userName = cookieValue[2].substr(0, end);
                        if( userName == '' ){
                                return( "-1" );
                        }
                        return( userName );
                } else
                        return( "-1" );
        } else
                return( "-1" );
}
// ##################
