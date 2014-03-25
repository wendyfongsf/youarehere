// --HTTP 

(function() {
  var httpRequest;

  document.getElementById("ajaxButton").onclick = function() { 
    var address = document.getElementById("ajaxTextbox").value;
    makeRequest('https://www.googleapis.com/civicinfo/us_v1/representatives/lookup?key=AIzaSyAzOF-EGWefl40wZ28RNwZLG4MRVQCw6cg',address); };

  function makeRequest(url,address) {
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
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url);
    httpRequest.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    var jsonparams = JSON.stringify({"address":address});
    httpRequest.send(jsonparams);
  }

  function alertContents() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        console.log(response);
      } else {
      console.log(httpRequest.responseText)
      alert('There was a problem with the request.');
      }
    }
  }

})();