(function (window) {
  var SpeechAnalysis = function() {
    var hostString = "cog-web-wu.azurewebsites.net";
    var appRoot = "cognitive-services";
    var endpoint = "/ws/speechtotextdemo?language=en-US&g_Recaptcha_Response=null&isNeedVerify=false"
    var uri =  `wss://${hostString}/${appRoot}${endpoint}`;
    var sentimentUrl = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
    var sentiStats = [];

    //var uri = "https://speechjs.azurewebsites.net"

    var speech = new Speech(uri);

    if (!speech.isListening) {
      document.body.className = "listening";
      console.log('listening');

      speech.startListening(
        function(partialTxt) {
          console.log("Partial: " + partialTxt);                  
        }, 
        function(fullText) {
          axios({
            method: 'post',
            url: sentimentUrl,
            headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key': 'a93372a510884c518b6dd44028aacfe6'
            },
            data: {
              "documents": [
              {
                "language": "en",
                "id": "1",
                "text": fullText
              }
              ]
            }
          })
          .then(function(response) {
            console.log("Fulltext: " + fullText);
            sentiStats.push({
              text: fullText,
              rating: response.data.documents[0].score * 100
            });
            window.sentiStats = sentiStats;
          })
          .catch(function(error) {
            document.body.className = "";
            console.log(error);
          });
        }, 
        function(err) {
          document.body.className = "";
          console.log(err);
        }
        );
    } else {
      document.body.className = "";
      speech.stopListening();
    }
  }

  window.SpeechAnalysis = SpeechAnalysis;

})(window)