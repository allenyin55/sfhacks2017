'use strict';

$(document).ready(function() {
  SpeechAnalysis();
  setInterval(function() {
    controllers.analyzeAudio();
  }, 5000);
  setInterval(function() {
    SpeechAnalysis();
  }, 20000);
});

const controllers = {
  analyzeAudio: function() {
    if (window.sentiStats !== undefined) {
      var sentiStats = window.sentiStats;
      console.log(sentiStats);
    }
    if (sentiStats !== null && sentiStats !== undefined) {
      const returnInfo = sentiStats[sentiStats.length - 1];
    }
  }

    
    // var oReq = new XMLHttpRequest();
    // oReq.onload = function(e) {
    //   var arraybuffer = oReq.response;
    //   console.log(arraybuffer);
    //   // axios({
    //   //   method: 'post',
    //   //   url: sentimentUrl,
    //   //   headers: {
    //   //     'Content-Type': 'application/octet-stream',
    //   //     'Ocp-Apim-Subscription-Key': '7b464cb879ae4459a1e1a96eb853bc90'
    //   //   },
    //   //   data: arraybuffer
    //   // })
    //   // .then(function(response) {
    //   //   console.log(response);
    //   // })
    //   // .catch(function(error) {
    //   //   console.log(error);
    //   // });
    // }
    // oReq.open("GET", '../jpeg_camera/shutter.ogg');
    // oReq.responseType = "arraybuffer";
    // oReq.send();
  }
