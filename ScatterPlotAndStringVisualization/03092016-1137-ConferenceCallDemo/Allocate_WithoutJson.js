
var numberOfStudents=0;
var assigned = [], randomPool = [];

function Allocate(){
	
	d3.csv('ranks.csv', function(error,data){
		
		data.forEach(function(d,i) {
			numberOfStudents++;
			
	});
		console.log(numberOfStudents);

	//create an array of size 5 for all students
	for (i=0;i<numberOfStudents;i++)
		assigned[i] = [];

	//create non duplicate pool of numberOfStudents
	Math.random(1,numberOfStudents);
	for(i=0;i<numberOfStudents*5;i++)
		randomPool[i] = (i%numberOfStudents);

	// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

randomPool = shuffle(randomPool);

// no self-assignment
var skip=0;
for(i=0;i<numberOfStudents;i++){
	for(j=0;j<5;j++){
		if(randomPool[(5*i)+j] != i)
			assigned[i][j] = randomPool[(5*i)+j];
		else
			{ temp = randomPool[(5*i)+j];
			  randomPool[(5*i)+j] = randomPool[(5*i)+j+1];
			  randomPool[(5*i)+j+1]  = temp;
			  assigned[i][j] = randomPool[(5*i)+j];
			}
	}
}

//create a json with id, student's name, rank_avg, variance, array of 5 assigned students.
//later we need to add students id who were 


checkPeers();
//curveFitting();

	});

	
}