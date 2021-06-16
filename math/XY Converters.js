var canvasDrift = {x : 0, y : 0}// Base Functions ///////////

// ! Screen to File XY
function convertCanvasXYintoFileXY(x = 0, y = 0){
    x = (x )*(viewScale) + canvasDrift.x;
    y = (y )*(viewScale) + canvasDrift.y;
    return [x, y];
}
// ! File to Screen XY
function convertFileXYintoCanvasXY(x = 0, y = 0){
    x = (x - canvasDrift.x)/viewScale ;
    y = (y - canvasDrift.y)/viewScale ;
    return [x, y];
}
// ! Screen to File WH
function convertFileWHintoCanvasWH(w, h){
    w /= viewScale;
    h /= viewScale;
    return [w, h];
}

function convertFileXYintoScreenXY(x, y){
    [x, y] = convertFileXYintoCanvasXY(x, y);
    [x,y] = [(x)*scale/viewScale, y*scale/viewScale];
    return [x, y];
}

function convertFileWHintoScreenWH(w, h){
    [w, h] = convertFileWHintoCanvasWH(w, h);
    [w, h] = [w*scale, h*scale];
    return [w, h]
}


function convertSecondsToMinSecString(time){
    if(time){
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
    
        function str_pad_left(string,pad,length) {
            return (new Array(length+1).join(pad)+string).slice(-length);}

        let finalTime = minutes+':'+str_pad_left(seconds,'0',2);
        return finalTime;

    }else{
        return "min:sec"
    }
}

function convertMinSecStringToSeconds(string){
    if(string.match(/[0-9]+[:]?[0-9]{0,2}/)){
        let min=0;
        let sec = parseInt(string);
        if(string.includes(":")){
            [min, sec] = string.split(":");
            min = parseInt(min);
            sec = parseInt(sec);
        }
        
        sec = (min*60)+sec;

        return sec
    } else{
        return 0
    }
}