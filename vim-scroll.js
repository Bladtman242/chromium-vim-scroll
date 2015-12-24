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

document.addEventListener("keypress", function(e){
    var key = String.fromCharCode(e.keyCode);
    if(key == 'j'){
        window.scrollBy(0,50);
    } else if(key == 'k') {
        window.scrollBy(0,-50);
    } else if(key == 'l') {
        window.scrollBy(50,0);
    } else if(key == 'h') {
        window.scrollBy(-50,0);
    } else if(key == 'G') {
            window.scrollTo(window.pageXOffset,document.body.scrollHeight);
    } else if(key == 'g') {
        if (watchMap.contains500ms('g')){
            window.scrollTo(window.pageXOffset,0);
            delete watchMap['g'];
        } else {
            watchMap.add('g') 
        }
    }
})
