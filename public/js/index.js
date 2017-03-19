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
}
