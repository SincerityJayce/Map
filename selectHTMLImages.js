

window.addEventListener('click',function(e) {
    let x = e.clientX,
        y = e.clientY,
        stack = [],
        elementMouseIsOver = document.elementFromPoint(x, y);
        eventsDictionary = {}
    stack.push(elementMouseIsOver);

    while (elementMouseIsOver.tagName !== 'HTML' && elementMouseIsOver.tagName !== 'DIV'){
        eventsDictionary[elementMouseIsOver] = elementMouseIsOver.style.pointerEvents;
        elementMouseIsOver.style.pointerEvents = 'none';
        stack.push(elementMouseIsOver);
        elementMouseIsOver = document.elementFromPoint(x, y);
        if (elementMouseIsOver.tagName == 'DIV'){
            eventsDictionary[elementMouseIsOver] = elementMouseIsOver.style.pointerEvents;
            elementMouseIsOver.style.pointerEvents = 'none';
            originObject(elementMouseIsOver).contextEvent();
        }

        
    }

    /* Now clean it up */
    var i  = 0,
        il = stack.length;

    for (; i < il; i += 1) {
        // stack[i].style.pointerEvents = eventsDictionary[stack[i]];
        stack[i].style.pointerEvents = "";
    }

    console.log(stack);
});


























// //Original

// window.addEventListener('click',function(e) {
//     var x = e.clientX,
//         y = e.clientY,
//         stack = [],
//         elementMouseIsOver = document.elementFromPoint(x, y);

//     stack.push(elementMouseIsOver);

//     while (elementMouseIsOver.tagName !== 'HTML'){

//         elementMouseIsOver.style.pointerEvents = 'none';
//         elementMouseIsOver = document.elementFromPoint(x, y);

//         stack.push(elementMouseIsOver);
//     }

//     /* Now clean it up */
//     var i  = 0,
//         il = stack.length;

//     for (; i < il; i += 1) {
//         stack[i].style.pointerEvents = '';
//     }

//     console.log(stack);
// });