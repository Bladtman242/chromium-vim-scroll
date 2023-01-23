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

function eventTriggersPlugin(ev) {
    return (ev.target == document.body);
}

function vimScrollTo(x,y) {
    window.scrollTo({left: x, top: y, behavior: 'instant'});
}

function vimScrollBy(x,y) {
    window.scrollBy({left: x, top: y, behavior: 'instant'});
}

//The entrypoint of the entire extension
function keypressHandler(e) {
    if(eventTriggersPlugin(e)) {
        var key = String.fromCharCode(e.keyCode);
        if(key == 'j'){
            vimScrollBy(0,50);
        } else if(key == 'k') {
            vimScrollBy(0,-50);
        } else if(key == 'l') {
            vimScrollBy(50,0);
        } else if(key == 'h') {
            vimScrollBy(-50,0);
        } else if(key == 'G') {
            vimScrollTo(window.pageXOffset,document.body.scrollHeight);
        } else if(key == 'g') {
            if (watchMap.contains500ms('g')){
                vimScrollTo(window.pageXOffset,0);
                delete watchMap['g'];
            } else {
                watchMap.add('g');
            }
        }
    }
}

//Hook up the handler. This essentially constitutes the entire extension
document.addEventListener("keypress", keypressHandler)
console.log('kek')
