function SpringVisualization(){
rank = [1,2,3,2,2];
i=0;


jsonCircles=[];
 for (i=0;i<5;i++)
 {
  jsonCircles[i] = [
   { "x_axis": 100 + 50*i, "y_axis": rank[i]*40, "radius": 15, "color" : "gray" },
  { "x_axis": 100 + 50*i, "y_axis": rank[i]*40 + 40, "radius": 15, "color" : "gray"},
  { "x_axis": 100 + 50*i, "y_axis": rank[i]*40 + 80, "radius": 15, "color" : "gray"},
  { "x_axis": 100 + 50*i, "y_axis": rank[i]*40 + 120, "radius": 15, "color" : "gray"},
  { "x_axis": 100 + 50*i, "y_axis": rank[i]*40 + 160, "radius": 15, "color" : "gray"}];
  }

jsonCirclesJoined=[];
for(i=0;i<5;i++){
  jsonCirclesJoined = jsonCirclesJoined.concat(jsonCircles[i])
}




 var svgContainer = d3.select("body").append("svg")
	                                .attr("width", 400)
                                  .attr("height", 300);
 
var circles = svgContainer.selectAll("circle")
                          .data(function(d){ console.log(jsonCirclesJoined); return jsonCirclesJoined;})
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) {  return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function (d) { return d.color; })



}