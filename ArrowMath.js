function startArrow(shapeObj){

    iAmDrawingAnArrowNow = true;
    arrowObj = shapeObj;
    arrowCoordinates();
    turnTheCanvasCursorInvisible();
    addDisplayToDOM();
    display.classList.add('pointerEventsNone');

                                   
}

function clearDisplay(){
    cDisplay.save();
    cDisplay.setTransform(1, 0, 0, 1, 0, 0);
    cDisplay.clearRect(0,0, canvasAreaW, canvasAreaH);
    cDisplay.restore();
}


function arrowMath(){
    clearDisplay();

    // let allPoints = []
    // for (var i=0;i < pointsICouldStartMyArrowFrom.length;i++){
    //     let opposite = mouseOnCanvas.canvasX-pointsICouldStartMyArrowFrom[i].x;
    //     let adjacent = mouseOnCanvas.canvasY-pointsICouldStartMyArrowFrom[i].y;
    //     let p = [pointsICouldStartMyArrowFrom[i],Math.sqrt(opposite*opposite+adjacent*adjacent)];
    //     allPoints.push(p);
    // }
    // let bestPoints = allPoints.sort(function(a, b){return a[1]-b[1]});
    // let start = {x: bestPoints[0][0].x, y:bestPoints[0][0].y}//arrowStart;
    let [x, y] =convertFileXYintoCanvasXY (arrowObj.x, arrowObj.y)
    let start = {x:x, y:y}
    let finish = {x:mouseOnCanvas.canvasX, y:mouseOnCanvas.canvasY};

    drawArrowBetweenPoints(start, finish, cDisplay);

}    

function drawArrowBetweenPoints(start, finish, context){
    // point 1 = start.x, start.y
    // if (Math.abs())
    let opposite = start.x-finish.x;
    let adjacent = finish.y-start.y;
    let deg = Math.atan2(opposite, adjacent);
    let height = Math.sqrt(opposite*opposite+adjacent*adjacent);
    drawImageRot(start.x, start.y, 200/viewScale, height, deg, context);
}


function arrowCoordinates(){
    if (iAmDrawingAnArrowNow){

    
        pointsICouldStartMyArrowFrom  = arrowObj.corners();
    }
}


function drawImageRot(x,y,width,height,rad, context){
    // Store the current context state (i.e. rotation, translation etc..)
    context.save()

    // //Convert degrees to radian 
    // var rad = deg * Math.PI / 180;

    // //Set the origin to the center of the image
    // cDisplay.translate(x + width / 2, y + height / 2);
    context.translate(x, y);
    //Rotate the canvas around the origin
    context.rotate(rad);
    // //draw the image
    // cDisplay.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);
    context.drawImage(arrow, width / 2 * (-1), 0, width, height);
    // Restore canvas state as saved from above
    context.restore();
    // //manual restore
    // cDisplay.translate(-x, -y);
    // cDisplay.rotate(-rad);
}

window.addEventListener('mouseup',
    function(){
        if(iAmDrawingAnArrowNow){
            iAmDrawingAnArrowNow = false;
            arrowObj = undefined;
            clearDisplay();
            removeDisplayFromDOM()
            turnTheCanvasCursorVisible();
        }

        
    })