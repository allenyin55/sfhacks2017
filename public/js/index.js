'use strict';

$(document).ready(function() {
  SpeechAnalysis();
  setInterval(function() {
    controllers.analyzeAudio();
    controllers.analyzeImage();
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
  },
  analyzeImage: function() {
    var sentimentUrl = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize";
    var camera = new JpegCamera("#camera");
    var snapshot = camera.capture();
    
    snapshot.upload({
      api_url: sentimentUrl,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '7b464cb879ae4459a1e1a96eb853bc90'
      }
    }).done(function(response) {
      console.log(response);
      this.discard();
    }).fail(function(status_code, error_message, response) {
      alert("Upload failed with status " + status_code);
    });
  }
}
