document.body.appendChild(makeSlider());

function makeSlider(){
    let slider = document.createElement('input')
    slider.type="range"
    slider.min="1";
    slider.max="100";
    slider.value='1';
    slider.classList.add('slider');
    slider.classList.add('vidslider');
    // slider.addEventListener('mousedown', seekYoutubeData_Off);
    // slider.addEventListener('mouseup', seekYoutubeData_On);

    return slider
}