//Initialize resolution variables
var svgContainer;
var intervalx = screen.width/20;
var intervaly=screen.height/15;
var radius = screen.width/70;
var topMargin = screen.width/40;
var leftMargin = screen.width/20;

function StringVisualization(){
var width = screen.width * 0.35;
var height = screen.height * 0.75;

//focRank stores all ranks of current student in an array
focRank = [];
for(i=0;i<numberOfStudents;i++){
  if(studentId[i] == focusedStudent){
    focRank = [rank1[i],rank2[i],rank3[i],rank4[i],rank5[i]];
  }
}

//jsonCircles stores x,y,radius,color and label values for string circles
//jsonCircles[1..5] define the position of each circle in 1..5 columns
jsonCircles=[];
for (i=0;i<5;i++)
{
  jsonCircles[i] = [
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i])*intervaly + topMargin, "radius": radius, "color" : "black", "label":"1"},
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i]+1)*intervaly + topMargin, "radius": radius, "color" : "black", "label":"2"},
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i]+2)*intervaly+ topMargin, "radius": radius, "color" : "black","label":"3"},
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i]+3)*intervaly+ topMargin, "radius": radius, "color" : "black","label":"4"},
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i]+4)*intervaly+ topMargin, "radius": radius, "color" : "black","label":"5"}];
  
}

//Converting the format of circles
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
	                                .attr("width", width)
                                  .attr("height", height);
 


svgContainer.append("g").selectAll(".strings")
						.data(jsonCirclesJoined)
						.enter().append("line")
						.attr("class","string")
						.attr("x1",function(d,i){if (i%5!=4) return d.x_axis})
						.attr("y1",function(d,i){if (i%5!=4) return d.y_axis+radius})
						.attr("x2",function(d,i){if (i%5!=4) return d.x_axis})
						.attr("y2",function(d,i){if (i%5!=4) return d.y_axis+intervaly-radius})
						.attr("stroke-width", 2)
                        

svgContainer.append("g").selectAll(".strings")
						.data(jsonCirclesJoined)
						.enter().append("line")
						.attr("class","hstring")
						.attr("x1",function(d,i){if (i<20 && d.y_axis==(5-focRank[0])*intervaly + topMargin) return d.x_axis+radius;})
						.attr("y1",function(d,i){if (i<20 && d.y_axis==(5-focRank[0])*intervaly + topMargin) return d.y_axis})
						.attr("x2",function(d,i){if (i<20 && d.y_axis==(5-focRank[0])*intervaly + topMargin) return d.x_axis+radius+intervalx})
						.attr("y2",function(d,i){if (i<20 && d.y_axis==(5-focRank[0])*intervaly + topMargin) return d.y_axis})
						.attr("stroke-width", 5)
                        .attr("stroke", "black");
						

  var circles = svgContainer.selectAll("circle")
                          .data(jsonCirclesJoined)
                          .enter()
                          .append("circle");
circleAttributes = circles
                       .attr("cx", function (d) {  return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d,i) { if (d.y_axis==(5-focRank[0])*intervaly + topMargin) return d.radius+5; else return d.radius; })
                       .style("fill", function (d,i) { if (d.y_axis==(5-focRank[0])*intervaly + topMargin) return 'rgb(182,29,20)'; else return 'rgb(112,146,190)'; })
                       .style("stroke", "none")
                       .on("mouseover", function(d,i) {
                        d3.select(this).style("fill", "orange");
                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("mouseout", function(d,i) { 
                       d3.select(this).style("fill", function (d) { if (d.y_axis==(5-focRank[0])*intervaly + topMargin) return 'rgb(182,29,20)'; else return 'rgb(112,146,190)'; })
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
        .attr("x", function(d){return d.x_axis-radius/2})
        .attr("y", function(d){return d.y_axis+4})
        .text(function(d,i){ if (d.y_axis==(5-focRank[0])*intervaly + topMargin) {counter++; return d.label;} else {  d.label = peers[focusedStudent][i-counter]; return peers[focusedStudent][i-counter]; }})
        .on("selectstart", function(){return false;})
        .on('mousedown.drag', null);




}