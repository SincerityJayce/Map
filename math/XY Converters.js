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
