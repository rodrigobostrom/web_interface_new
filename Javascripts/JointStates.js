var jointStateListener = [];
auxJointInfo = [];
var pi = 3.14159;

for (var i = 0; i != 8; i++)
{   
    auxJointInfo.push({
        jointId: i,
        position: 0,
				setPosition: function (x) {
						this.position = x;
				},
				getPosition: function () {
						return this.position;
				},
				getJointId: function () {
						return this.jointId;
				},
    });
}

function roundToTwo(num) {
    return +(Math.round(num + "e+3")  + "e-3");
}

function createJointStateSubscriber() 
{
		var jointStateListener = (new ROSLIB.Topic({
			ros: ros,
			name: '/joint_states',
			messageType: 'sensor_msgs/JointState'
		}));

		jointStateListener.subscribe(function (message)
			{
				for (var i = 0; i != 8; i++)
				{
					var aux = (message.position[i])*(180/Math.PI);
					auxJointInfo[i].setPosition(Math.round(aux));
				}
			}
		);
}

function generateJointStateTable() 
{
  var jointTable = document.getElementById("joint_state");

	jointTable.cellPadding = "5px 5px 5px 5px";

	for (var numberRows = 0; numberRows < 1; numberRows++)
	{
		var row = jointTable.insertRow(numberRows + 1);

		row.className = "table_even_row";

    //Inserting the cells in the row;
		var RowNameCell = row.insertCell(0);
		var A1Cell = row.insertCell(1);
		var A2Cell = row.insertCell(2);
		var A3Cell = row.insertCell(3);
		var A4Cell = row.insertCell(4);
		var A5Cell = row.insertCell(5);
		var A6Cell = row.insertCell(6);
		var A7Cell = row.insertCell(7);
		var A8Cell = row.insertCell(8);

		for(var numberCollumns = 0; numberCollumns < 9; numberCollumns++)
		{
			switch(numberRows)
			{
				case 0:

					row.className = "table_odd_row";

          switch(numberCollumns)
					{
						case 0:
							var rowName = "Position (º)";
							RowNameCell.innerHTML = rowName.bold();
							break;
						case 1:
							var auxJointInfoFunc = auxJointInfo[0].getPosition();
							A1Cell.innerHTML = auxJointInfoFunc;
							break;
            case 2:
              var auxJointInfoFunc = auxJointInfo[1].getPosition();
							A2Cell.innerHTML = auxJointInfoFunc;
							break;
						case 3:
							var auxJointInfoFunc = auxJointInfo[2].getPosition();
							A3Cell.innerHTML = auxJointInfoFunc;
							break;
						case 4:
							var auxJointInfoFunc = auxJointInfo[3].getPosition();
							A4Cell.innerHTML = auxJointInfoFunc;
							break;
						case 5:
							var auxJointInfoFunc = auxJointInfo[4].getPosition();
							A5Cell.innerHTML = auxJointInfoFunc;
							break;
						case 6:
							var auxJointInfoFunc = auxJointInfo[5].getPosition();
							A6Cell.innerHTML = auxJointInfoFunc;
							break;
						case 7:
							var auxJointInfoFunc = auxJointInfo[6].getPosition();
							A7Cell.innerHTML = auxJointInfoFunc;
							break;
						case 8:
							var auxJointInfoFunc = auxJointInfo[7].getPosition();
							A8Cell.innerHTML = auxJointInfoFunc;
							break;
						default:
					}
					break;
				default:
			}
		}
	}
}

function updateJointStateTable()
{
	var updateJointTable = document.getElementById("joint_state");
	
	for (var i = 0; i != 8; i++)
	{
		var auxJointInfoFunc = auxJointInfo[i].getPosition();
    var position = Math.abs(auxJointInfoFunc);

		updateJointTable.rows[1].cells.item(i+1).innerHTML = position;
	}
}