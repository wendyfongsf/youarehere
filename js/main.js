(function() {
  var httpRequest;

  document.getElementById("ajaxButton").onclick = function() { 
    var address = document.getElementById("ajaxTextbox").value;
    makeRequest(
      'https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyAzOF-EGWefl40wZ28RNwZLG4MRVQCw6cg',
      address, 
      sendToDOM); 
  };

  function makeRequest(url,address,callback) {
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } 
      catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (e) {}
      }
    }

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = callback;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    var jsonparams = JSON.stringify({"address":address});
    httpRequest.send(jsonparams);
  }

  function sendToDOM() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var repdata = JSON.parse(httpRequest.responseText);
          if (repdata.officials.P28.channels) {
            var result = '<div class="col-lg-4">\
            <h2>' + repdata.officials.P28.name + '</h2>\
            <img src=' + repdata.officials.P28.photoUrl + '>\
            <p><a href="http://www.twitter.com/' + repdata.officials.P28.channels[1].id.replace(" ", "") + '\
            ">http://www.twitter.com/\
            ' + repdata.officials.P28.channels[1].id + '</a></p>\
            </div>';
          }
          else
          {
            var result = '<div class="col-lg-4">\
            <h2>' + repdata.officials.P28.name + '</h2>\
            <img src=' + repdata.officials.P28.photoUrl + '></p>\
            </div>';
          } 


        $("#councilmember").replaceWith(result);
      } else {
      alert('There was a problem with the request.');
      }
    }
  }

})();
