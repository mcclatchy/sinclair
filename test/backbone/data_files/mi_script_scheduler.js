/*
this script provides a way to test to see if a script has been loaded previously, and if so, does not load it again.
it checks for the object that will be created by a script, if the object exists, the script has been loaded.
*/

function miScriptScheduler() {

    this.scriptCheck = ""; /* value of function check (eg. window.jQuery)*/
    this.scriptPath = ""; /* file path to required script */
    //var cc = this; /*cache a copy of the object for use inside jquery methods*/

    /*
    method checks value of scriptCheck, if undefined a script node is created
    with the src attribute set to scriptPath. This node is then injected into the   DOM
    */
    
    this.scheduleScript = function ()
    {
        if(!this.scriptCheck)
        {
            /* script test function not found, load script with no waiting*/
                var tempElement = document.createElement("script");
                tempElement.src = this.scriptPath;
                var bases = document.getElementsByTagName('base');
                if(bases.length && bases[0].childNodes.length) {
                   bases[0].appendChild(tempElement);
                }
                else {
                  document.getElementsByTagName('head')[0].appendChild(tempElement);
                }
            
        }
        else {
            return(0);
        }
    } /*end scheduleScript method*/
} /* end constructor*/

