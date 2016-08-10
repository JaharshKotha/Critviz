var svgContainer;
function SpringVisualization(){

focRank = [];
for(i=0;i<numberOfStudents;i++){
 // console.log(focusedStudent);
  if(studentId[i] == focusedStudent){
    focRank = [rank1[i],rank2[i],rank3[i],rank4[i],rank5[i]];
  }
}



//console.log("ttt" + focRank[0])
i=0;


jsonCircles=[];
 for (i=0;i<5;i++)
 {
  jsonCircles[i] = [
  { "x_axis": 100 + 80*i, "y_axis": (5-focRank[i])*80 + 100, "radius": 30, "color" : "black", "label":"1"},
  { "x_axis": 100 + 80*i, "y_axis": (5-focRank[i])*80 + 180, "radius": 30, "color" : "black", "label":"2"},
  { "x_axis": 100 + 80*i, "y_axis": (5-focRank[i])*80 + 260, "radius": 30, "color" : "black","label":"3"},
  { "x_axis": 100 + 80*i, "y_axis": (5-focRank[i])*80 + 340, "radius": 30, "color" : "black","label":"4"},
  { "x_axis": 100 + 80*i, "y_axis": (5-focRank[i])*80 + 420, "radius": 30, "color" : "black","label":"5"}];
  }

jsonCirclesJoined=[];
for(i=0;i<5;i++){
  jsonCirclesJoined = jsonCirclesJoined.concat(jsonCircles[i])
}



  if(svgContainer!=null)
      {
        console.log("removing");
        d3.select("#stringsvg").remove();}


  svgContainer = d3.select("body").append("svg")
                                  .attr("id","stringsvg")
	                                .attr("width", 600)
                                  .attr("height", 800);
 
var circles = svgContainer.selectAll("circle")
                          .data(jsonCirclesJoined)
                          .enter()
                          .append("circle");

/*elem = svg.selectAll("g")
        .data(focRank);

elemEnter = elem.enter()
        .append("g")
        .attr("transform", function(d){return "translate("+d.x+",80)"})*/



circleAttributes = circles
                       .attr("cx", function (d) {  return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { if (d.y_axis==420) return d.radius+5; else return d.radius; })
                       .style("fill", function (d) { if (d.y_axis==420) return 'rgb(182,29,20)'; else return 'rgb(112,146,190)'; })
                       .style("stroke", "none")
                       .on("mouseover", function(d,i) {
                        d3.select(this).style("fill", "orange");
                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("mouseout", function(d,i) { 
                       d3.select(this).style("fill", function (d) { if (d.y_axis==420) return 'rgb(182,29,20)'; else return 'rgb(112,146,190)'; })
                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("click",function(d){
                         focusedStudent = d.label;
                         console.log(focusedStudent);
                        //check index of focus student
                        index = studentId.indexOf(focusedStudent);
                         enlargePeers(index);
                         SpringVisualization();
                       })
                       ;
counter=0;
svgContainer.append("g").selectAll(".stringLabels").data(jsonCirclesJoined).enter().append("text").attr("class","stringLabels")
        .attr("x", function(d){return d.x_axis-8})
        .attr("y", function(d){return d.y_axis+4})
        .text(function(d,i){ if (d.y_axis==420) {counter++; return d.label;} else {  d.label = peers[focusedStudent][i-counter]; return peers[focusedStudent][i-counter]; }})



}