'use strict';

var recordedChunks = [];

var constraints = window.constraints = {
  audio: true,
  video: false
};

function handleSuccess(stream) {
  var audioTracks = stream.getAudioTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using audio device: ' + audioTracks[0].label);
  stream.oninactive = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  gotMedia(stream);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function gotMedia(stream) {
  var recorder = null;
  try {
    recorder = new MediaRecorder(stream, {mimeType : "audio/webm"});
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    return;
  }
  console.log(recorder);

  recorder.ondataavailable = (event) => {
    console.log('Recorded chunk of size ' + event.data.size + "B");
    recordedChunks.push(event.data);
    $.post({
      url: '/audio',
      data: {
        recordedChunks: recordedChunks.slice(Math.max(arr.length - 5, 0))
      }
    }).done(function(data) {
      view.addTweet(data.tweetId, tweetText, imageSrc);
      view.resetFocus();
    }).fail(function(err) {
      console.log('Failed:', err);
    });
  };

  recorder.start(5000);
}

navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);