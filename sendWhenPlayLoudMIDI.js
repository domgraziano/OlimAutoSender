/*
 Trigger for OlimAutoSend device
 Written by Domenico Graziano
 november 2016
 somewhere in Bristol
 */


//Useful log function found on http://compusition.com/ well done Adam Murray 2007-2016
function log() {
    for (var i = 0, len = arguments.length; i < len; i++) {
        var message = arguments[i];
        if (message && message.toString) {
            var s = message.toString();
            if (s.indexOf("[object ") >= 0) {
                s = JSON.stringify(message);
            }
            post(s);
        }
        else if (message === null) {
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

function trigger(MIDIinVelocity, returnvalue, threshold, amount) {

    var track = new LiveAPI('this_device canonical_parent');
    log(returnvalue);
    sendCurrentChannel(MIDIinVelocity, track, returnvalue, threshold, amount);

}

function sanitiseLivePath(path) {
    path = path.replace('"', '').replace('"', '');
    return path;
}

//Send my signal/s whatever I play Loud to ... @TODO let the user device where to send the signal
function sendCurrentChannel(MIDIinVelocity, track, returntrack, threshold, amount) {

    //log(returntrack);
    //get the live api path
    var path = "" + sanitiseLivePath(track.path) + " mixer_device";
    var deviceParams = new LiveAPI(path);
    //See the current MIDIvelocity info
    //log(MIDIinVelocity);

    var sendDevices = deviceParams.get("sends");
    //interestedSendDevice aka where I send the signal, try to log(sendDevices) to see the data structure and understand better
    //I'm passing int number identifying the id of the deviceparam but I always want an even position in the array that's the real id
    //log(sendDevices);

    var interestedSendDevice = sendDevices[2 * returntrack + 1];
    //log(interestedSendDevice);

    var myLiveObject = new LiveAPI('this_device canonical_parent');

    var sendId = ["id", interestedSendDevice];
    var sendObject = new LiveAPI(sendId);
    if (MIDIinVelocity > threshold) {
        sendObject.set("value", amount / 100);
    } else {
        sendObject.set("value", 0);
    }

    /* If we want a slow knob decrease we need to use the following
     ** the while loop in the funcction callback seems to block the ableton workflow though there must be a better way
     if(sendObject.get("value")==1){
     fadeOutKnob(sendObject,1, 0.50);
     }*/
}

//Decrease knob slowly - change decrease factor to change it
/*function fadeOutKnob(sendObject, num, decrease_factor){
 while(num>0.1){
 sendObject.set("value", num);
 num*=decrease_factor;
 }
 }*/