var http = require('http');
var headers = {"Host": "search.twitter.com", 
               "User-Agent": "NodeJS HTTP Client"};
var since = 0;
var con = http.createClient(80, "search.twitter.com");

function search() {
    var path = "/search.json?q=nodejs" + "&since_id="+ since;
    var request = con.request('GET', path, headers);
    request.end();
    request.on('response', function (response) {
      var body = "";
      response.setEncoding("utf8");
      response.on('data', function (chunk) { body += chunk; });
      response.on('end', function () {
          var tweets = JSON.parse(body);
          var results = tweets["results"];
          for (var i = results.length - 1; i >= 0; i--) {
              if (results[i].id > since) { since = results[i].id; }
              console.log("@" + results[i].from_user + ": " + results[i].text);
          }
      });
    });
    setTimeout(search, 5000);
};
 
search();