// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
  url: 'ws://127.0.0.1:9090'
});

ros.connect(ros.url);

ros.on('connection', function() {
  console.log('Connected to websocket server.');
  connectState = true;
});

ros.on('error', function(error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function() {
  console.log('Connection to websocket server closed.');
});