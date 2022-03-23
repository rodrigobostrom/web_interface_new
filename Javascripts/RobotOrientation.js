var r = 0;
var p = 0;
var y = 0;

class auxRobotOrientation {
    constructor (r, p, y){
        this.r = r;
        this.p = p;
        this.y = y;
    }

    setOrientationR(q0,q1,q2,q3) {
        this.r = (180/Math.PI)*(Math.atan2(2*(q0*q1+q2*q3),1-2*(Math.pow(q1,2)+Math.pow(q2,2))));
    }
    setOrientationP(q0,q1,q2,q3) {
        this.p = (180/Math.PI)*(Math.asin(2*(q0*q2-q3*q1)));
    }
    setOrientationY(q0,q1,q2,q3) {
        this.y = (180/Math.PI)*(Math.atan2(2*(q0*q3+q1*q2),1-2*(Math.pow(q2,2)+Math.pow(q3,2))));
    }
    getOrientationR() {
        return roundToTwo(this.r);
    }
    getOrientationP() {
        return roundToTwo(this.p);
    }
    getOrientationY() {
        return roundToTwo(this.y);
    }
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

var robotOrientation = new auxRobotOrientation(r, p, y);

// Listener do KR10
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/kr10/endpoint_state',
    messageType : 'geometry_msgs/PoseStamped'
});
// Listener do KR90
var listener_kr90 = new ROSLIB.Topic({
    ros : ros,
    name : '/kr90/endpoint_state',
    messageType : 'geometry_msgs/PoseStamped'
});

listener.subscribe(function (message){

    q0 = message.pose.orientation.w;
    q1 = message.pose.orientation.x;
    q2 = message.pose.orientation.y;
    q3 = message.pose.orientation.z;

    robotOrientation.setOrientationR(q0,q1,q2,q3);
    robotOrientation.setOrientationP(q0,q1,q2,q3);
    robotOrientation.setOrientationY(q0,q1,q2,q3);

});

listener_kr90.subscribe(function (message){

    q0 = message.pose.orientation.w;
    q1 = message.pose.orientation.x;
    q2 = message.pose.orientation.y;
    q3 = message.pose.orientation.z;

    robotOrientation.setOrientationR(q0,q1,q2,q3);
    robotOrientation.setOrientationP(q0,q1,q2,q3);
    robotOrientation.setOrientationY(q0,q1,q2,q3);

});
function createOrientationTable() {

    var orientationTable = document.getElementById("robot_orientation");

    for (var numberRows = 0; numberRows < 4; numberRows++) {
        var row = orientationTable.insertRow(numberRows);

        orientationTable.cellPadding = "5px 5px 5px 5px";

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
                            var rowName = "R";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationR();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 1:

                    row.className = "table_odd_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "P";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationP();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;

                case 2:

                    row.className = "table_even_row";

                    switch (numberCollumns) {
                        case 0:
                            var rowName = "Y";
                            NameCell.innerHTML = rowName.bold();
                            break;
                        case 1:
                            var auxRobotInfoFunc = robotOrientation.getOrientationY();
                            ValueCell.innerHTML = auxRobotInfoFunc;
                            ValueCell.tabIndex = "1";
                            break;
                    }
                    break;
            }
        }
    }
}

function updateOrientationTable()
{
	var updateOrientation = document.getElementById("robot_orientation");
	
	for (var i = 0; i != 4; i++)
	{
		var auxRobotInfoFunc1 = robotOrientation.getOrientationR();
        var auxRobotInfoFunc2 = robotOrientation.getOrientationP();
        var auxRobotInfoFunc3 = robotOrientation.getOrientationY();
        var r = Math.abs(auxRobotInfoFunc1);
        var p = Math.abs(auxRobotInfoFunc2);
        var y = Math.abs(auxRobotInfoFunc3);

        switch(i) {
            case 0:
                updateOrientation.rows[i].cells.item(1).innerHTML = r;
                break;
            case 1:
                updateOrientation.rows[i].cells.item(1).innerHTML = p;
                break;
            case 2:
                updateOrientation.rows[i].cells.item(1).innerHTML = y;
                break;
	    }
    }
}