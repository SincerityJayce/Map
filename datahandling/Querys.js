function thisShapeHasAVisibleTextbox(thisShape){
    let thisbool;
    if(thisShape.textBox?.parentNode !== thisShape.clickDiv){
        thisbool = false;
    } else {thisbool = true}
return thisbool
}

function determineYouTubeID(link) {
    let f = (link.match(/img.youtube.com\/vi\/[\w\-]{11}/))
return f
}

function FoundShape(id){
    let o = undefined;
    for (var i=0; i<drawnScreenShapes.length;i+=1){
        if (id == drawnScreenShapes[i].id){
            o = drawnScreenShapes[i];
            console.log(o, 'shape from id');
        }
    }
    return o;
}

function ask_isTheShapeInitialisingOnscreen(object, x, y){
    let xn = (x/scale + object.width);
    let yn = (y/scale + object.height);
    x = x/scale;
    y = y/scale;
    if (xn > 0 && x < window.innerWidth &&
        yn > 0 && y < window.innerHeight){
        return true;
    } else {return false;}
}