
function Arrow (start, target, image){
    this.start = start;
    this.target = target;

    let thisArrow = this;
    this.draw = function(){
        console.log('arrow created,', this)
        if (this.target.alive){
            let [sx, sy] =convertFileXYintoCanvasXY (this.start.x, this.start.y)
            let start = {x:sx, y:sy};
            let [fx, fy] =convertFileXYintoCanvasXY (this.target.x, this.target.y)
            drawArrowBetweenPoints({x:sx, y:sy}, {x:fx, y:fy}, c)
        }else{
            delete thisArrow;
        }
    }

    let thisIsANewArrow = true
    for(var i =0;i<start.arrows.length; i++){
        if(start.arrows[i].target == this.target){
            start.arrows.splice(i, 1);
            thisIsANewArrow = false
        }
    }
    if(thisIsANewArrow){
        start.arrows.push(this);
    }     
}

