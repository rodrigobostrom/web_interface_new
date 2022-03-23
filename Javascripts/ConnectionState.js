//Declaring connection variables
var connectState = false;
var ros = new ROSLIB.Ros({});
var localHost;

window.ros = ros;

function connect()
{
    console.log("ConnectState = " + connectState);

    if (!connectState)
    {
        console.log("Entrou no IF");

        this.localHost = prompt("Enter the ip address of the websocket:", "localhost");
        this.rosUrl = "ws://" + this.localHost.toString() + ":9090/";
        ros.connect(rosUrl);

        console.log("rosUrl = " + rosUrl);
    }
    else
    {
        ros.close();
    }
}

// Connection State Functions
function updateConnectionImage()
{
    var connectionImage = document.getElementById('connected_image');

    if(connectState)
    {
        connectionImage.src = 'img/Connected.png';
    }
    else
    {
        connectionImage.src = 'img/Disconnected.png';
    }
}