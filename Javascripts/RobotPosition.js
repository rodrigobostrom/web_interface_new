var x = 0;
var y = 0;
var z = 0;
var speed = 0;

class auxRobotPosition {
    constructor (x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setPositionX(i) {
        this.x = i;
    }
    setPositionY(i) {
        this.y = i;
    }
    setPositionZ(i) {
        this.z = i;
    }
    setTravelSpeed(x,y,z) {
        sum = Math.pow(x,2) + Math.pow(y,2) + Math.pow(z,2)
        this.speed = Math.sqrt(sum);
    }
    getPositionX() {
        return this.x;
    }
    getPositionY() {
        return this.y;
    }
    getPositionZ() {
        return this.z;
    }
    getTravelSpeed() {
        return this.speed;
    }
}

var robotPosition = new auxRobotPosition(x, y, z);

var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/kr10/endpoint_state',
    messageType : 'geometry_msgs/PoseStamped'
});

var listener_kr90 = new ROSLIB.Topic({
    ros : ros,
    name : '/kr90/endpoint_state',
    messageType : 'geometry_msgs/PoseStamped'
});

var listener_Speed10 = new ROSLIB.Topic({
    ros : ros,
    name : '/kr10/endpoint_twist',
    messageType : 'geometry_msgs/TwistStamped'
})

var listener_Speed90 = new ROSLIB.Topic({
    ros : ros,
    name : '/kr90/endpoint_twist',
    messageType : 'geometry_msgs/TwistStamped'
})

listener.subscribe(function (message){
    robotPosition.setPositionX(message.pose.position.x.toFixed(4));
    robotPosition.setPositionY(message.pose.position.y.toFixed(4));
    robotPosition.setPositionZ(message.pose.position.z.toFixed(4));
});

listener_kr90.subscribe(function (message){
    robotPosition.setPositionX(message.pose.position.x.toFixed(4));
    robotPosition.setPositionY(message.pose.position.y.toFixed(4));
    robotPosition.setPositionZ(message.pose.position.z.toFixed(4));
});

listener_Speed10.subscribe(function (message){
    x_aux = message.twist.linear.x;
    y_aux = message.twist.linear.y;
    z_aux = message.twist.linear.z;
    robotPosition.setTravelSpeed(x_aux, y_aux, z_aux);
})

listener_Speed90.subscribe(function (message){
    x_aux = message.twist.linear.x;
    y_aux = message.twist.linear.y;
    z_aux = message.twist.linear.z;
    robotPosition.setTravelSpeed(x_aux, y_aux, z_aux);
})

function createPositionTable() {

    var positionTable = document.getElementById("robot_position");

    for (var numberRows = 0; numberRows < 3; numberRows++) {
        var row = positionTable.insertRow(numberRows);

        positionTable.cellPadding = "5px 5px 5px 5px";

        //Inserting the cells in the row;
        var NameCell = row.insertCell(0);
        var ValueCell = row.insertCell(1);

        NameCell.width = "200px";

        ValueCell.width = "120px";

        for (var numberCollumns = 0; numberCollumns < 2; numberCollumns++) {
            switch (numberRows) {
                case 0:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "X";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotPosition.getPositionX();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 1:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Y";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotPosition.getPositionY();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 2:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Z";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotPosition.getPositionZ();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;
            }
        }
    }
}

function updatePositionTable()
{
	var updatePosition = document.getElementById("robot_position");
	
	for (var i = 0; i != 3; i++)
	{
		var auxRobotInfoFunc1 = robotPosition.getPositionX();
        var auxRobotInfoFunc2 = robotPosition.getPositionY();
        var auxRobotInfoFunc3 = robotPosition.getPositionZ();
        var x = Math.abs(auxRobotInfoFunc1);
        var y = Math.abs(auxRobotInfoFunc2);
        var z = Math.abs(auxRobotInfoFunc3);

        switch(i) {
            case 0:
                updatePosition.rows[i].cells.item(1).innerHTML = x;
                break;
            case 1:
                updatePosition.rows[i].cells.item(1).innerHTML = y;
                break;
            case 2:
                updatePosition.rows[i].cells.item(1).innerHTML = z;
                break;
        }
	}
}

function createTravelSpeed() {
    var travelSpeed = document.getElementById("travel_speed");

    travelSpeed.cellPadding = "5px 5px 5px 5px";

    //Inserting the cells in the row;
    var NameCell = row.insertCell(0);
    var ValueCell = row.insertCell(1);

    NameCell.width = "200px";
    ValueCell.width = "120px";

    row.className = "table_even_row";

    var rowName = "Travel Speed";
    NameCell.innerHTML = rowName.bold();
}