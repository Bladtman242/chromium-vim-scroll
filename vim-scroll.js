var watchMap = {
    add: function(k){
        watchMap[k] = Date.now();
    },
    contains500ms: function(k) {
        var v = watchMap[k];
        if (!v) {
            return false;
        }
        return v >= Date.now() - 500;
    },
};

var vimScroll = {
    eventTriggersPlugin:  function(ev) {
        return (ev.target == document.body)
    },
    scrollTo: function(x,y) {
        window.scrollTo(x,y);
    },
    scrollBy: function(x,y) {
        window.scrollBy(x,y);
    },
    //The entrypoint of the entire extension
    keypressHandler: function(e) {
        if(vimScroll.eventTriggersPlugin(e)) {
            var key = String.fromCharCode(e.keyCode);
            if(key == 'j'){
                scrollBy(0,50)
            } else if(key == 'k') {
                scrollBy(0,-50)
            } else if(key == 'l') {
                scrollBy(50,0)
            } else if(key == 'h') {
                scrollBy(-50,0)
            } else if(key == 'G') {
                scrollTo(window.pageXOffset,document.body.scrollHeight);
            } else if(key == 'g') {
                if (watchMap.contains500ms('g')){
                    scrollTo(window.pageXOffset,0);
                    delete watchMap['g'];
                } else {
                    watchMap.add('g') 
                }
            }
        }
    }
};

//Hook up the handler. This essentially constitutes the entire extension
document.addEventListener("keypress", vimScroll.keypressHandler)
