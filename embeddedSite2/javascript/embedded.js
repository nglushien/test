requirejs.config({
    "baseUrl": "javascript",
    "paths": {
      "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js",
      "bxSlider": "plugins/bxSlider"
    }
});

require(['jquery', 'library/header', 'library/video', 'library/contentViewer', 'library/socialWidget', 'bxSlider'],
  function ($, header, video, cv, sw, bx) {

    // Initialize Header Functions
    header.init();

    // Initialize Content Viewer Functions
    cv.init();

    // Initialize Content Viewer Functions
    video.init();

    // Check Number of Assets
    var assetsListingCount = $('#assetsList li').length;

    // If the bp is less than 960 and there are more than 3 assets, add
    // a class to the container. Else if the bp is greater than 960 and
    // there are more than 10 assets add a class to the container.
    // CSS will do the rest.
    $(window).on('load resize',function(){
      if($(window).width() < 960){
        if(assetsListingCount > 3) {
          cv.hideAssets();
        }
      } else if ($(window).width() >= 960){
        if(assetsListingCount > 10) {
          cv.hideAssets();
        }
      }
    });

    // Initialize Social Widget
    sw.init();
  }
);
