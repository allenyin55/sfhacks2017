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
    }
    if (sentiStats !== null && sentiStats !== undefined) {
      const data = sentiStats[sentiStats.length - 1];
      console.log(data);
      $.post({
        url: '/audio',
        data: {
          score: data.rating
        }
      }).done(function(data) {
        console.log(data.success);
      }).fail(function(err) {
        console.log('Failed:', err);
      });
    }
  }
}