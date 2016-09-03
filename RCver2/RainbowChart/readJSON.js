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
 "Crit1":[CID,SID1,SID2,SID3,SID4,SID5]  // CritID followed by the student id's who were being compared.   
 "Crit2":[CID,SID1,SID2,SID3,SID4,SID5]  // Should be in the same order as the "values" 
 "Crit3":[CID,SID1,SID2,SID3,SID4,SID5]  
 "Crit4":[CID,SID1,SID2,SID3,SID4,SID5]
 "Crit5": // Can be null if the respective crit has not evaluated , but the key will remain in the structure

 */
 
 
 /* jsonData have the following "data" keys for all students. Also given is what is Critviz using
 "first_name": "", empty in student view for other students
 "last_name": "", empty in student view for other students
 "column_url": "/assignments/737/responses/54715/showcrit?crit_assignment_id=744", url specifying the assignment
 "primary_value": 1.285714286, //rank average in critviz
 "secondary_value": 0.489795918, //variance in critviz, ignore
 "values": [1, 1, 1, 1, 1, 1, 3], //ranks in critviz
 "Crit comparer ":[{RANK,CID1,SID1,SID2,SID3,SID4,SID5} ,{RANK,CID2,SID1,SID2,SID3,SID4,SID5}, {RANK,CID3,SID1,SID2,SID3,SID4,SID5} ]  // CritID followed by the student id's who were being compared. A nested representation of the key value pairs.

 */
 
 
var jsonData; //this variable will store all data read from json
var student = [];
var metadata;
// var visFlag = false;
//create studentVariable accessible using student_id
var Student; //global Class
function init(){
    Student = function(jsonData,j){
        this.first_name = jsonData.data[j].first_name;
        this.last_name = jsonData.data[j].last_name;
        this.column_url = jsonData.data[j].column_url;
        this.rank_avg = jsonData.data[j].primary_value;
        this.rankings = jsonData.data[j].values;
		this.stuid = jsonData.data[j].stuid;
		this.critcomparer = jsonData.data[j].critcomparer
    }
}




function readJSON() {
    d3.json("dataFiles/showStudents.json", function (data) {
        jsonData = data;
        init();
        
        metadata = jsonData[0].metadata;
        visualizeGraph();

    })


   }
