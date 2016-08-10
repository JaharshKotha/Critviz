
var numberOfStudents=0;
var assigned = [], randomPool = [],newArray=[];
peers = [], peerPool = [];

function Allocate(){
/*	d3.csv('matrix.csv', function(error,data){
	matrix = data;
	data.forEach(function(d,i) {
	});
})*/


/*d3.csv("matrix.csv", function(text) {
  var data = d3.csv.parseRows(text).map(function(row) {
    return row.map(function(value) {
      return +value;
    });
  });
  console.log(data);
});*/
		
	/*newArray = matrix.map(function(col, i) { 
  	return matrix.map(function(row) { 
    return row[i] 
  })
});


	for(i=0;i<newArray.length;i++){
		peers[i] = [];
		k=0;
		for (j=1;j<newArray.length;j++)
			if(newArray[i][j]!=""){
				peers[i][k] = +studentId[j-1];
				k++;
			}
	}*/



for(i=0;i<studentId.length;i++){
		studentId[i] =+studentId[i]
		l=0;
		peers[studentId[i]] = [];
		for (j=1;j<=studentId.length;j++)	
			if(matrix[i][j]!=""){
				for(k=0;k<studentId.length;k++)
				{
					if(matrix[k][j]!="" && k!=i){
						//console.log(studentId[i]);
						peers[studentId[i]][l] = +studentId[k];
						l++;
					}
				}		
				
				
			}
	}	





		//console.log(numberOfStudents);

	//create an array of size 5 for all students
	for (i=1;i<=numberOfStudents;i++)
		assigned[i] = [];






	/*//create non duplicate pool of numberOfStudents
	Math.random(1,numberOfStudents);
	for(i=0;i<numberOfStudents*5;i++)
		randomPool[i] = (i%numberOfStudents);*/

	// http://stackoverflow.com/questions/962802#962890
/*function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}*/

//randomPool = shuffle(randomPool);

// no self-assignment
// var skip=0;
// for(i=0;i<numberOfStudents;i++){
// 	for(j=0;j<5;j++){
// 		if(randomPool[(5*i)+j] != i)
// 			assigned[i][j] = randomPool[(5*i)+j];
// 		else
// 			{ temp = randomPool[(5*i)+j];
// 			  randomPool[(5*i)+j] = randomPool[(5*i)+j+1];
// 			  randomPool[(5*i)+j+1]  = temp;
// 			  assigned[i][j] = randomPool[(5*i)+j];
// 			}
// 	}
// }

//create a json with id, student's name, rank_avg, variance, array of 5 assigned students.
//later we need to add students id who were 




//curveFitting();

peerPool = peers;

	
}