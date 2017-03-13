/*
GetcCurrentReturns for OlimAutoSend device
Written by Domenico Graziano
november 2016
somewhere in Bristol
*/
//Useful log function found on http://compusition.com/ well done © Adam Murray 2007-2016
function log() {
  for(var i=0,len=arguments.length; i<len; i++) {
    var message = arguments[i];
    if(message && message.toString) {
      var s = message.toString();
      if(s.indexOf("[object ") >= 0) {
        s = JSON.stringify(message);
      }
      post(s);
    }
    else if(message === null) {
      post("<null>");
    }
    else {
      post(message);
    }
  }
  post("\n");
}
 
log("___________________________________________________");
log("Reload:", new Date);


function bang(){
	getCurrentReturns();
}

outlets = 1;

Outlet = getCurrentReturns();

	
function getCurrentReturns(){	
		var thistrack = 'this_device canonical_parent mixer_device';
		var mixerobject = new LiveAPI(thistrack);
		var current_sends = countSends(mixerobject);
		outlet(0, current_sends);
}

function isEven(n) {
   return n % 2 == 0;
}

function countSends(mixerobject){
				alphabet = genCharArray('a', 'z');
				current_sends = mixerobject.get('sends');
				var counter = 0;
				var sends = [];
				for (i = 0; i < current_sends.length; i++) {
					if(isEven(i)){
						sends.push(alphabet[counter]);
						counter++;
					}
				}
				return sends;
};

function genCharArray(charA, charZ) {
    var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}
