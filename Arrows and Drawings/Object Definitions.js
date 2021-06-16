var arrowObj;
var arrow = new Image();
arrow.src = 'images/arrow.png';
var arrowStart;
var allCreatedObjects = [];
var shapeBeingDragged;
var mouseStarteDraggingFrom;
var textBoxBeingEdited;
var shapeBeingResized;

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);});}
var projectId = createUUID();

var lastId = 0001;
function createShapeId(){
    id = projectId + lastId;lastId += 1;
    return id;}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
// ! Canvas Shapes

var lastShape;
function BasicShape(model){
    var thisShape = this;

    lastShape = this;
    this.src = model.src;
    this.id = model.id;
    this.selfScale= 1;if(model.selfScale){this.selfScale = model.selfScale};
    this.x = model.x;
    this.y = model.y;
    this.shapeFunctions = {};

    this.alive = true;
    this.neverDrawn = true;
    this.imageOn = true;
    this.textBoxOn = false;


    this.shapeDiv = initialiseShapeDiv();
    this.clickDiv = initialiseClickDiv();
    this.shapeDiv.appendChild(this.clickDiv);
    this.shape =makeShape(model.src);

    this.text;
    this.fontSize = 18;

    //make this WH logic apply after creation
    if(model.w){this.w = model.w}else{this.w = this.shape.naturalWidth;}
    if(model.h){this.h = model.h}else{this.h = this.shape.naturalHeight;}

    this.width = this.w*this.selfScale;
    this.height = this.h*this.selfScale;

    this.draggedfrom = {x:undefined, y:undefined};

    this.videoStart = 0; if(model.videoStart){this.videoStart=model.videoStart}
    this.videoFinish = 60;if(model.videoFinish){this.videoFinish=model.videoFinish}


    //fake a function that initialises shapeloda and clickdiv functions
    this.clickDiv.appendChild(this.shape);

    this.shape.addEventListener('load', function(){
        if(thisShape.w==false){thisShape.w = thisShape.shape?.naturalWidth;}
        if(thisShape.h==false){thisShape.h = thisShape.shape?.naturalHeight;}
        drawShape(thisShape);
    })

    this.clickDiv.addEventListener('contextmenu', function(e){
        thisShape.shapeDiv.classList.add('contextShape')
        contextShape = thisShape;
        openShapeMenu(e)});






    this.onFirstDraw = function(){
        container.appendChild(this.shapeDiv);
        InitShapeFunctions(thisShape)
    }


    this.editTextBox = function(){
        startEditingTextBox(thisShape.textBox);
    }

    this.InitialiseTextBox = function(){
        if(this.textBox ==undefined){
            
            makeTextboxFor(thisShape);
            if(thisShape.shapeFunctions['video']==false){
                thisShape.imageOn = false;
            }
            
        }
        thisShape.ShowTextBox()
    }


    this.ShowTextBox= function(){
        thisShape.shapeFunctions["textbox"] = true;
        thisShape.clickDiv.appendChild(this.textBox);
        makeShapeResiazble(thisShape);
    }



    this.HideTextBox = function(){
        thisShape.shapeFunctions["textbox"] = false;
        thisShape.textBox.remove();
        makeShapeNotResiazble(thisShape);
    }
    


    // dragging and arrows
    

    this.clickDiv.addEventListener('mousedown', 
    function(event){
        if(event.button ==0){
            if (event.shiftKey){
                startArrow(thisShape);
            }
            else{if(thisTextBoxIsntBeingEdited(thisShape)){
                startDraggingShape(thisShape)
            }}
        }

    })



    this.scaleUp = function(){
        this.selfScale*= 0.90;
        this.width = this.w*this.selfScale;
        this.height = this.h*this.selfScale;
    }
    this.scaleDown = function(){
        this.selfScale/= 0.90;
        this.width = this.w*this.selfScale;
        this.height = this.h*this.selfScale;
    }

    this.corners = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
    
        points= [{x: x,      y: y},{x: x+w/2,  y:y},{x: x+w,    y:y},//top
            {x: x+w,    y:y+h/2},   //right
            {x: x+w,    y:y+h},{x: x+w/2,  y:y+h},{x: x,      y:y+h},//bottom
            {x: x,      y:y+h/2} ];
    return points;
    }

    this.divStyleMath;
    this.aspect;
    //Draws image onto canvas

    this.drawarrows = function(){
        for(var i = 0; i < thisShape.arrows.length; i++){
            thisShape.arrows[i].draw();
        }
    
    }

    
    this.drawTemp = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
        cDisplay.drawImage(this.shape, x-w/2, y-h/2, w, h);
    }   




    // connections (arrows)
    this.arrowcodes = []; if(model.arrows){this.arrowcodes=model.arrows}
    this.arrows = [];

    this.clickDiv.addEventListener('mouseup',
    function(e){if(iAmDrawingAnArrowNow){
                thisShape.recieveArrow();
                resize(); }})

    this.recieveArrow = function(e){
        let a = new Arrow(arrowObj, thisShape);}

        
    this.connections = {};
    this.addConnection = function addConnection(connection){
        this.connections[connection] = {notes:undefined}
    }
    this.removeConnection = function removeConnection(connection){
        delete this.connections[connection]
    }






    // manage
    this.delete = function (){
        thisShape.shape.remove();
        thisShape.alive = false;
        thisShape.shapeDiv.remove()
        playerIsNotPlaying(thisShape);
        delete thisShape.shape;
        delete thisShape.shapeDiv;
        delete thisShape;
    }

    this.identify=function (){
        let newID = createShapeId()
        idKeys[thisShape.id] = newID
        thisShape.id = newID;
        thisShape.shapeDiv.id = thisShape.id;
        thisShape.clickDiv.id = thisShape.id;
        thisShape.shape.id = thisShape.id;
    }



    determineAndSetupYoutubeFor(this);




    function initVideo(){
        if(thisShape.shapeFunctions["video"] && purposeOfClick.isToOperate()){
            thisShape.clickDiv.removeEventListener('click',initVideo)
            thisShape.createVideo();
        }
    }
    this.clickDiv.addEventListener('click',initVideo)
            
    this.createVideo = function(){
        
        thisShape.vidDiv = document.createElement('div');
        thisShape.vidDiv.height= "100%";
        thisShape.vidDiv.width = "100%";
        thisShape.vidDiv.id = thisShape.id+"YTAPI";
        thisShape.clickDiv.appendChild(thisShape.vidDiv);

        let newPlayer = new YT.Player(thisShape.vidDiv.id,{
            height: thisShape.shape.height,
            width: thisShape.shape.width,
            videoId: thisShape.YTid,
            playerVars:{
                autoplay:1,
                controls:0,
                modestbranding:1,
                rel:0,
                start: thisShape.videoStart,
                end: thisShape.videoFinish+2
            },
            events: {
                "onReady": thisShape.videoReady,
            //   'onReady': thisShape.addListeners,
            "onStateChange":thisShape.togglePlayStatus
            }});
        thisShape.vidPlayer = newPlayer;
        thisShape.vidDiv = thisShape.vidPlayer.getIframe();
        thisShape.vidDiv.height= "100%";
        thisShape.vidDiv.width = "100%";
        thisShape.vidDiv.classList.add('pointerEventsNone');
        thisShape.clickDiv.addEventListener('click', function(){
            if(purposeOfClick.isToOperate()){
                if(thisTextBoxIsntBeingEdited(thisShape)){
                    playPauseToggle(thisShape)
                }
            }})


        // slider code
        thisShape.slider = makeSlider();
        thisShape.slider.addEventListener('input', thisShape.setVideoPosition);
        thisShape.slider.addEventListener('mousedown', function(){
            activeSlider = thisShape
        });
        thisShape.shapeDiv.appendChild(thisShape.slider);
    }

    this.videoReady = function(){
        thisShape.videoFinish = thisShape.vidPlayer.getDuration();
        thisShape.shape.remove();
        thisShape.imageOn = false;
    }

    
    this.togglePlayStatus=function(){
        let statePorP = {
            0 : playerIsNotPlaying,
            1 : playerIsPlaying,
            2 : playerIsNotPlaying,
            3 : playerIsNotPlaying,
            5 : playerIsNotPlaying}
        statePorP[thisShape.vidPlayer.getPlayerState()](thisShape);
    }
    



    this.textboxBackgroundColor = "#20202088"; if(model.textboxBackgroundColor){this.textboxBackgroundColor = model.textboxBackgroundColor};
    this.textThumbnail = false;

    this.setVideoPosition = function setVideoPosition(){
        thisShape.vidPlayer.seekTo(findVideoPositionFromSlideValue(thisShape, thisShape.slider), allowSeekAhead_YoutubeAPI)
        playOrPause(thisShape);
        }

    allCreatedObjects.push(this);
}















function makeShape(src){
    return styleShape(new Image(), src)
}
function styleShape(shape, src){
    shape.src = src;
    shape.width=0;
    shape.height=0;
    shape.draggable = false;
    shape.classList.add('drawnshape');
    shape.classList.add('FFDecks');
    shape.style.width ="100%";
    shape.style.height ="100%";

    return shape
}

function initialiseShapeDiv(){
    let sd = document.createElement('div')
    sd.classList.add('drawnshape');
    sd.style.position = 'fixed';
    sd.style.overflow = 'hidden';
    return sd
}

function initialiseClickDiv(){
    let sd = document.createElement('div')
    sd.classList.add('clickdiv');
    // sd.style.width = "100%";
    // sd.style.height = "100%";
    return sd
}


const bin = document.getElementById('bin');
bin.addEventListener('mouseup',
    function(){
        if (shapeBeingDragged){
            deleteDrawnShape(shapeBeingDragged);

        }
        if (activeTool){
            if(activeTool.parentNode == (ytClipList || ffdecksBar)){
                activeTool.remove();
                delete activeTool
            }
            unselectAllTools()
        }
    })


function deleteDrawnShape(shape){
    drawnScreenShapes = drawnScreenShapes.filter(
        function(ele){return ele != shape;})
    shape.delete();
    drawCanvas();
}








    


// new stuff
function InitShapeFunctions(thisShape){

    if(thisShape.src.includes('images/box.png')){
        thisShape.shapeFunctions['textbox'] = true;
        thisShape.imageOn = false;
    }//placeholder, move to something more sensible

    if (thisShape.shapeFunctions['textbox']){
        thisShape.InitialiseTextBox(); 
    }
}



