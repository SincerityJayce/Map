






















newClipBtn = document.getElementById('New Clip Box');
newClipBtn.addEventListener('click', createTheoreticalClipBox);

function createTheoreticalClipBox(){
    let theory = new Clip('https://youtu.be/qm0IfG1GyZU');
    theory.initialiseVideo();
    theory.drawTemp();
}





function Clip(link, x = 500, y = 500, w = 640, h = 390,arrows=[], selfScale=1, id){
    this.id = id;
    this.src = link;
    this.videoId = unpackYTLink(link);
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.selfScale = selfScale;

    this.alive = true;
    this.draggedfrom = {x:undefined, y:undefined};

    this.shapeDiv = initialiseShapeDiv();
    this.shapeDiv.classList.add('linkstarter');
    this.shape;
    let thisShape = this;





    this.addListeners = function(){
        thisShape.shape.addEventListener('mouseup',
        function(e){if(iAmDrawingAnArrowNow){
                    thisShape.recieveArrow();
                    resize(); }})
        thisShape.shape.addEventListener('mousedown', 
        function(event){
            if (event.shiftKey){
                startArrow(thisShape);
            } else {
                thisShape.draggedfrom = {x:thisShape.x, y:thisShape.y};
                mouseStarteDraggingFrom = {x:mouseOnCanvas.x, y:mouseOnCanvas.y}
                shapeBeingDragged = thisShape;
            }
        })
        
        thisShape.identify();
    }

    this.initialiseVideo = function(){
        // come back to this
        this.shape = document.createElement('div');
        this.shape.id = 'HiYoutube';
        this.shapeDiv.appendChild(this.shape);

        this.shape = new YT.Player('HiYoutube',{
            height: '180px',
            width: "320px",
            videoId: thisShape.videoId,
            playerVars:{
                autoplay:1,
                controls:0,
                modestbranding:1,
                rel:0,
            },
            events: {
              'onReady': thisShape.addListeners
            }});
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


    this.aspect;
    //Draws image onto canvas
    this.draw = function(){

        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);

        this.shapeDiv.style = ( 
            'margin-left:'+((x-w/2)/scale)+
            ';top:'+((y-h/2)/scale)+
            ';position: absolute'+
            ';max-width:'+((canvasAreaW-x+w/2)/scale)+
            ';max-height:'+((canvasAreaH-y+h/2)/scale)+
            ';overflow:hidden;');
        this.aspect = this.shape.width/this.shape.height;
        this.shape.height = this.shape.height/ totalScale; // JUST BY CHANGING THIS TO SCALE RATHER THAN TOTAL SCALE, YOU GET COOL EFFECT
        this.shape.width = this.shape.height*this.aspect;

        this.shape.remove();
        if(ask_isTheShapeInitialisingOnscreen(this, x-w/2, y-h/2)){
            this.shapeDiv.appendChild(this.shape);}
    }

    this.drawarrows = function(){
        for(var i = 0; i < thisShape.arrows.length; i++){
            console.log('drawing this arrow', thisShape.arrows[i])
            thisShape.arrows[i].draw();
        }
    
    }

    this.drawTemp = function(){
        let [x, y] = convertFileXYintoCanvasXY(this.x, this.y);
        let [w, h] = convertFileWHintoCanvasWH(this.width, this.height);
        thisShape.shapeDiv.style = ("position: absolute: display: grid; place-items: center;");
    }   




    // connections (arrows)
    this.arrowcodes = arrows
    this.arrows = [];

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
        delete thisShape.shape;
        delete thisShape.shapeDiv;
        delete thisShape;
    }

    this.identify=function (){
        let newID = createShapeId()
        idKeys[thisShape.id] = newID
        thisShape.id = newID;
        thisShape.shapeDiv.id = thisShape.id;
        thisShape.shape.id = thisShape.id;
    }
}






// this.slideDiv = makeSlideDiv();
// this.slider = makeSlider();
// this.slideDiv.appendChild(this.slider);

// function makeSlideDiv(){
//     let slideDiv = document.createElement('div');
//     slideDiv.classList.add('slidecontainer');
//     return slideDiv;
// }
// function makeSlider(){
//     let slider = document.createElement('input')
//     slider.type="range"
//     slider.min="1";
//     slider.max="100";
//     slider.value='1';
//     slider.classList.add('slider');
//     slider.addEventListener('mousedown', seekYoutubeData_Off);
//     slider.addEventListener('mouseup', seekYoutubeData_On);

//     return slider
// }

// let thisVidObj = this;
// this.setVideoPosition = function setVideoPosition(){
//     this.video.seekTo(findVideoPositionFromSlideValue(this.video, this.slider), allowSeekAhead_YoutubeAPI);
// }


// function seekYoutubeData_Off(){
//     allowSeekAhead_YoutubeAPI = false;
// }
// function seekYoutubeData_On(){
//     allowSeekAhead_YoutubeAPI = true;
// }
// var allowSeekAhead_YoutubeAPI = false;

// function findVideoPositionFromSlideValue(video,slider){
//     return (video.start+slider.value*(video.end-video.start-1))
// }

