define(function() {
  return {
    init: function() {
      var videoHTML = $('#videoPlayerContainer>div'),
          videoTagID = videoHTML.attr('id'),
          myPlayer,
          vidID = videoHTML.data('video-id'),
          playlistID = videoHTML.data('playlist-id'),
          body = $('body');

      if(videoHTML.length && typeof videoHTML !== 'undefined'){

        myPlayer = videojs(videoTagID);

        $('#heroPlayerContainer #heroOverlay').prepend('<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>');

        function msToTime(duration) {
          var milliseconds = parseInt((duration%1000)/100)
          , seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)
          , hours = parseInt((duration/(1000*60*60))%24);

          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;

          if(hours < 1){
            return minutes + ":" + seconds;
          } else {
            return hours + ":" + minutes + ":" + seconds;
          }
        }


        if (vidID != "") {
          myPlayer.catalog.getVideo(vidID, function(error, video) {
            if (error) { console.log('Video error',error);
            } else {

              var w = video.duration;
              var x = w.toString();
              var y = x.replace(/\./g, '');
              var z = parseInt(y,10);

              $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + msToTime(z)).show();
              $('.overlayTitle').html(video.name).show();
              $('.overlayCTA').show();
              $('.spinner').remove();

              $('#heroImage').on('click tapone',function(){

                myPlayer.catalog.load(video);

                $('#videoPlayerContainer').addClass('show');
                $('#heroImage').addClass('vjs-selected');
                $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
                $('#heroOverlay').hide();

                myPlayer.play();

                if(body.hasClass('header-desktop-fixed')){
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
                } else if(body.hasClass('header-mobile-fixed')) {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
                } else {
                  $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
                }
              });
            }
           });

        } else if (playlistID != "") {
          myPlayer.catalog.getPlaylist(playlistID, function(error, playlist){
            if (error) { console.log('Playlist error',error);
            } else {
              myPlayer.catalog.load(playlist);

              var i = 0;
              var videosExists = false;
              var y = setInterval(function() {
                checkVideos();
              },1000);

              function checkVideos() {
                $('.vjs-playlist-ad-overlay').remove();
                if (i > 10) {
                  clearInterval(y);
                } else if ($(".vjs-playlist li").length >= 2) {
                  clearInterval(y);
                  videosExists = true;
                  //perform your actions here
                  $('.vjs-playlist').bxSlider({
                    minSlides:1,
                    maxSlides: 4,
                    infiniteLoop: false,
                    slideMargin: 10,
                    slideWidth: 260,
                    moveSlides: 1,
                    nextSelector: '#slider-next',
                    prevSelector: '#slider-prev',
                    hideControlOnEnd: true
                  });
                  if ($('.vjs-playlist-item').length == 2){
                    // exactly 2
                    $('.vjs-playlist').addClass('twoItems');
                    $('#heroPlaylistInfoContainer').remove();
                  } else if ($('.vjs-playlist-item').length == 3){
                    // exactly 3
                    $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('threeItems');
                    $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
                  } else if ($('.vjs-playlist-item').length == 4){
                    // exactly 4
                    $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('fourItems');
                    $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
                  } else {
                    $('.vjs-playlist,#heroPlaylistInfoContainer').addClass('manyItems');
                    $('.videoInfo').text($('.vjs-playlist-item').length + ' Videos');
                  }

                  $('.overlayDuration').html('<i class="icon-video-camera"></i>' + ' ' + 'Video: ' + $('.vjs-playlist-item:first-child .vjs-playlist-duration').text());
                  $('.overlayTitle').html($('.vjs-playlist-item:first-child .vjs-playlist-name').text()).show();
                  $('.overlayCTA').show();

                  $('.bx-next').html('<i class="icon-play"></i>');
                  $('.bx-prev').html('<i class="icon-play"></i>');

                  $('.spinner').remove();

                  var item;
                  for (item = 0; item < $('.vjs-playlist-item').length; item++){
                    var img = $('.vjs-playlist-thumbnail img')[item];
                    img.src = playlist[item].poster;
                  }

                  $('#heroPlaylistContainer, #heroPlaylistInfoContainer').fadeIn('fast').addClass('show');

                  $('#heroImage,.vjs-playlist .vjs-playlist-item').on('click tapone',function(){
                    myPlayer.catalog.load($(this));

                    $('#videoPlayerContainer').addClass('show');
                    $('#heroImage').addClass('vjs-selected');
                    $('.vjs-playlist .vjs-playlist-item.vjs-selected .vjs-playlist-thumbnail').addClass('show');
                    $('#heroOverlay').hide();

                    myPlayer.play();

                    if(body.hasClass('header-desktop-fixed')){
                      $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 57},750);
                    } else if(body.hasClass('header-mobile-fixed')) {
                      $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 60},750);
                    } else {
                      $("html, body").animate({ scrollTop: $('#videoPlayerContainer').offset().top - 157},750);
                    }
                  });

                  $('.vjs-playlist .vjs-playlist-item').each(function(){
                    $(this).on('click tapone',function(){
                      $(this).find('.vjs-playlist-thumbnail').addClass('show');
                    });
                  });
                }
                i++;
              }
            }
          });
        } else {
          myPlayer.pause();
        }

        $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
          if ( e.which > 0 || e.type == "mousedown" || e.type == "mousewheel"){
            $("html,body").stop();
          }
        });
      }
    }
  }
});
