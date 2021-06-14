function drawShape(thisShape){
    thisShape.width = thisShape.w*thisShape.selfScale;
    thisShape.height = thisShape.h*thisShape.selfScale;
    let [x, y] = convertFileXYintoCanvasXY(thisShape.x, thisShape.y);
    let [w, h] = convertFileWHintoCanvasWH(thisShape.width, thisShape.height);

    // //uncomment this to draw onto canvas
    // c.drawImage(shape, x, y, w, h);

    thisShape.aspect = thisShape.w/thisShape.h;
    thisShape.shape.height = thisShape.height/ totalScale; // JUST BY CHANGING THIS TO SCALE RATHER THAN TOTAL SCA LE, YOU GET COOL EFFECT
    thisShape.shape.width = thisShape.shape.height*thisShape.aspect;
    thisShape.divStyleMath={
        left:(x-w/2)/scale,
        top : ((y-h/2)/scale),
        maxW :((canvasAreaW-x+w/2)/scale),
        maxH : ((canvasAreaH-y+h/2)/scale),
        height: thisShape.shape.height,
        width: thisShape.shape.width
    }
    let d = thisShape.divStyleMath;
    thisShape.shapeDiv.style.left = d.left;
    thisShape.shapeDiv.style.top = d.top;
    thisShape.shapeDiv.style.height = d.height;
    thisShape.shapeDiv.style.width = d.width;
    
    thisShape.shapeDiv.width = thisShape.shape.width;
    thisShape.shapeDiv.height = thisShape.shape.height;


    if(ask_isTheShapeInitialisingOnscreen(thisShape, x-w/2, y-h/2)){

        if(thisShape== contextShape){
            formatRightClickMenu();
        }

        if (thisShape.imageOn){
            if(thisShape.shape.parentNode !==thisShape.clickDiv){
                thisShape.clickDiv.appendChild(thisShape.shape);
            }

        }else{thisShape.shape.remove();}


        if(thisShape.vidPlayer){
            if((thisShape.vidDiv?.parentNode !==thisShape.clickDiv)){
                thisShape.clickDiv.appendChild(thisShape.vidDiv)
            }

            let v = thisShape.vidPlayer.getIframe()
            v.height=thisShape.shape.height;
            v.width=thisShape.shape.width;
        }

        if(thisShape.shapeFunctions["textbox"]){
            console.log(thisShape.shapeFunctions["textbox"])
            let t = thisShape.textBox;
            if((t.parentNode !==thisShape.clickDiv)){
                if(thisShape.vidPlayer?.getPlayerState()==1){return};
                thisShape.clickDiv.appendChild(t)
            }
            thisShape.textBox.style.fontSize = thisShape.fontSize*thisShape.selfScale/viewScale;
        }





    }else{
        thisShape.shape.remove();
        thisShape.vidDiv?.remove();
        thisShape.textBox?.remove();
    }
    
}