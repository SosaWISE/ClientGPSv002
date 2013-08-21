(function() {
  "use strict";

  var http = require("http"),
      url = require("url"),
      path = require("path"),
      fs = require("fs"),
      mime = require("mime"),
      port = process.argv[2] || 8888,
      folder = path.join(process.cwd(), process.argv[3] || '');
  console.log(folder);

  http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname
      , filename = path.join(folder, uri);
    console.log('uri', uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        // console.log('!exist', uri);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found\n");
        response.end();
        return;
      }

      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html';
      }

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          console.log('err', uri, ':', err);
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
        }
        else {
          response.writeHead(200, {"Content-Type": mime.lookup(filename)});
          response.write(file, "binary");
          response.end();
          // console.log('end', uri);
        }
      });
    });
  }).listen(parseInt(port, 10));

  console.log("Static file server running at => http://localhost:" + port + "/\nCTRL + C to shutdown");
})();
