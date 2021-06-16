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

function thisShapeOnscreen(object, x, y){
    // this math is fucked, fix it one day
    let xn = (x/scale + object.width);
    let yn = (y/scale + object.height);
    x = x/scale;
    y = y/scale;
    if (xn > 0 && x < window.innerWidth &&
        yn > 0 && y < window.innerHeight){
        return true;
    } else {return false;}
}


function thisTextBoxIsntBeingEdited(thisShape){
    if(textBoxBeingEdited!== thisShape.textBox || textBoxBeingEdited ==undefined){
        return true
    }else{return false}
}

var fullScreenDiv;
var notFullScreen = true;
function checkIfNotFullScreen(){
    if (fullScreenDiv !== (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        fullScreenDiv = undefined;
        notFullScreen = true;
    }
return notFullScreen
}

    