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
  { "x_axis": 100 + 50*i, "y_axis": (5-focRank[i])*40 + 100, "radius": 15, "color" : "black", "label":"1"},
  { "x_axis": 100 + 50*i, "y_axis": (5-focRank[i])*40 + 140, "radius": 15, "color" : "black", "label":"2"},
  { "x_axis": 100 + 50*i, "y_axis": (5-focRank[i])*40 + 180, "radius": 15, "color" : "black","label":"3"},
  { "x_axis": 100 + 50*i, "y_axis": (5-focRank[i])*40 + 220, "radius": 15, "color" : "black","label":"4"},
  { "x_axis": 100 + 50*i, "y_axis": (5-focRank[i])*40 + 260, "radius": 15, "color" : "black","label":"5"}];
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
	                                .attr("width", 400)
                                  .attr("height", 500);
 
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
                       .attr("r", function (d) { if (d.y_axis==260) return d.radius+5; else return d.radius; })
                       .style("fill", function (d) { if (d.y_axis==260) return "red"; else return "white"; })
                       .style("stroke", "none")
                       .on("mouseover", function(d,i) {
                        d3.select(this).style("fill", "orange");
                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("mouseout", function(d,i) { 
                       d3.select(this).style("fill", function (d) { if (d.y_axis==260) return "red"; else return "white"; })
                        stringFocus = i;
                        //console.log(i);
                        });

svgContainer.append("g").selectAll(".stringLabels").data(jsonCirclesJoined).enter().append("text").attr("class","stringLabels")
        .attr("x", function(d){return d.x_axis-2})
        .attr("y", function(d){return d.y_axis})
        .text(function(d){if (d.y_axis==260) return d.label; else return "h";})



}