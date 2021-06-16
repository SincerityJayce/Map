function determineAndSetupYoutubeFor(thisShape){
    thisShape.YTid = determineYouTubeID(thisShape.src)?.[0].replace("img.youtube.com/vi/", "");
    if(thisShape.YTid){
        thisShape.shapeFunctions["video"] = true;
    }
}

