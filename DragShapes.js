window.addEventListener('mousemove',
    function(e){
        if (shapeBeingDragged){

            let [x,y] = [(mouseStarteDraggingFrom.x - mouseOnCanvas.x)*totalScale, (mouseStarteDraggingFrom.y - mouseOnCanvas.y)*totalScale]
            shapeBeingDragged.x = shapeBeingDragged.draggedfrom.x - x;
            shapeBeingDragged.y = shapeBeingDragged.draggedfrom.y - y;
            requestAnimationFrame(redrawShapeBeingDragged);
        }
    })

function redrawShapeBeingDragged(){
    drawCanvas()
}


window.addEventListener('mouseup',
    function(e){
        shapeBeingDragged = undefined;   
    })