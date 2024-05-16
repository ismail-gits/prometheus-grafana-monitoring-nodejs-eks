let express = require('express');
let path = require('path');
let fs = require('fs');
let app = express();
const client = require('prom-client') 

const collectDefaultMetrics = client.collectDefaultMetrics;
// Probe every 5th second
collectDefaultMetrics({ timeout: 5000})

const httpRequestsTotal = new client.Counter({
  name: 'http_request_operations_total',
  help: 'Total number of HTTP requests'
})

const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of http requests in seconds',
  buckets: [0.1, 0.5, 2, 5, 10]
})

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

app.get('/', function (req, res) {
    // Simulate sleep for a random number of milliseconds
    var start = new Date()
    var simulateTime = Math.floor(Math.random() * (10000 - 500 + 1) + 500)

    setTimeout(function(argument) {
      // Simulate execution time
      var end = new Date() - start
      httpRequestDurationSeconds.observe(end / 1000); // convert to seconds
    }, simulateTime)

    httpRequestsTotal.inc()

    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/profile-picture-1', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.get('/profile-picture-2', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-2.jpeg"));
  res.writeHead(200, {'Content-Type': 'image/jpeg' });
  res.end(img, 'binary');
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});