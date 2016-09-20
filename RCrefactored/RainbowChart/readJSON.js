/* jsonData have following "metadata" keys. ALso given is what is Critviz using
 "title": "Title of the graph",
 "primary-value-label": "rank average",
 "higher_primary_value_better": false,
 "values-label": "ranks",
 "higher_values_better": false,
 "y-range_top": 1,
 "y-range_bottom": 5.5,
 "y-axis-label": "Rank Average",
 "x-axis-label": "Students",
 "secondary-value-label": "variance, not in use right now, ignored",
 "values-range-low": 1,
 "values-range-high": 5,
 "number-of-colors": 5,
 "color-scheme": 1
 },
 */

/* jsonData have the following "data" keys for all students. Also given is what is Critviz using
 "first_name": "", empty in student view for other students
 "last_name": "", empty in student view for other students
 "column_url": "/assignments/737/responses/54715/showcrit?crit_assignment_id=744", url specifying the assignment
 "primary_value": 1.285714286, //rank average in critviz
 "secondary_value": 0.489795918, //variance in critviz, ignore
 "values": [1, 1, 1, 1, 1, 1, 3], //ranks in critviz
 */
 var Rainbowgraph;
 
function init(){
Rainbowgraph=function (data){
this.jsonData=data; //this variable will store all data read from json
this.metadata=data[0].metadata;
var svg,svg2;
this.selected;
inputColorScheme="5a";
this.brushCheck=false;
hideLabels= false;


}
}
// var visFlag = false;
//create studentVariable accessible using student_id
/*
var Student; //global Class
function init(){
    Student = function(jsonData,j){
        this.first_name = jsonData.data[j].first_name;
        this.last_name = jsonData.data[j].last_name;
        this.column_url = jsonData.data[j].column_url;
        this.rank_avg = jsonData.data[j].primary_value;
        this.rankings = jsonData.data[j].values;
    }
}
*/
var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

function readJSON() {
    d3.json("dataFiles/showStudents.json", function (data) {
        jsonData = data;
        init();
		/*
        for(var j=0;j < jsonData[0].data.length;j++) {
            student[j] = Object.create(new Student(jsonData[0], j));

        }
*/


       // metadata = jsonData[0].metadata;
       //console.log(data);
	    rc = new Rainbowgraph(data);
		
		console.log(rc.jsonData[0].data[0]);
		for(var i=0;i<rc.jsonData[0].data.length;i++){
			
			if(rc.jsonData[0].data[i].primary_value == 0)
			{
			
				rc.jsonData[0].data[i].primary_value=500;
			}
		}
		
		//rc.jsonData[0].data.sort();
	  // console.log(rc.metadata);
	  //rc.jsonData[0].data.sort(sort_by('primary_value', true, parseInt));
	  rc.jsonData[0].data.sort(function(a, b) {
    return parseFloat(a.primary_value) - parseFloat(b.primary_value);
});

		console.log(rc.jsonData[0].data[0]);
        visualizeGraph(rc);

    })


   }