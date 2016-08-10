//Initialize resolution variables
var svgContainer;
var intervalx = screen.width/20;
var intervaly=screen.height/15;
var radius = screen.width/70;
var topMargin = screen.width/40;
var leftMargin = screen.width/100;

function StringVisualization(){
var width = screen.width * 0.30;
var height = screen.height * 0.75;

//focRank stores all ranks of current student in an array
focRank = [];
for(i=0;i<numberOfStudents;i++){
  if(studentId[i] == focusedStudentNumber){
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
  { "x_axis": intervalx*(i+1)+leftMargin, "y_axis": (5-focRank[i]+4)*intervaly+ topMargin, "radius": radius	, "color" : "black","label":"5"}];
  
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
                        

svgContainer.append("g").data(jsonCirclesJoined).append("rect")
						.attr("class","selfbar")
						.attr("x",function(d){ return d.x_axis-radius;})
						.attr("y",function(d){ return (4)*intervaly + topMargin - radius})
						.attr("rx",20)
						.attr("ry",20)
						.attr("height",radius*2)
						.attr("width",intervalx*5)
						.style("fill","none")
						.style("stroke","black");

svgContainer.append("g").data(jsonCirclesJoined).append("text")
						.attr("class","bartext")
						.attr("x",function(d){return d.x_axis;})
						.attr("y",function(d){ return (4*intervaly) + topMargin + radius/3})
						.text("Student Id : " + focusedStudentNumber)
						.attr("font-size","20")
						.style("stroke","black");



svgContainer.append("g").data(jsonCirclesJoined).append("text")
						.attr("class","bartext2")
						.attr("x",function(d){return d.x_axis+2*intervalx;})
						.attr("y",function(d){ return (4)*(intervaly) + topMargin + radius/3})
						.text("Rank Average : " + rank_avg[focusedStudent] )
						.attr("font-size","20")
						.style("stroke","black");
counter=0;
  var circles = svgContainer.selectAll("circle")
                          .data(jsonCirclesJoined)
                          .enter()
                          .append("circle")
                       .attr("label",function(d,i){ if (d.y_axis==(4)*intervaly + topMargin) {counter++; return null;} else {  d.label = peers[focusedStudentNumber][i-counter]; return peers[focusedStudentNumber][i-counter]; }})
                       .attr("cx", function (d) {  return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d,i) {if (d.y_axis==(4)*intervaly + topMargin) return 0; else return d.radius; })
					   .style("fill", function (d,i) 
										{ 
										if (d.y_axis>(4)*intervaly + topMargin)
											{if(rank_avg[studentId.indexOf(Number.parseInt(d.label))] >= rank_avg[focusedStudent]) 
												return '#e34a33'; 
											else
												return 'orange';
										    }
										else 
											{if(rank_avg[studentId.indexOf(Number.parseInt(d.label))] <= rank_avg[focusedStudent]) 
												{
												return '#2ca25f'; 
											}else
												return "orange";
										}
										})
                       .style("stroke", "none")
                       .on("mouseover", function(d,i) {
                        d3.select(this).attr("r",radius + 5);
                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("mouseout", function(d,i) { 
                       d3.select(this).style("fill", function (d) { 	if (d.y_axis>(4)*intervaly + topMargin)
											{if(rank_avg[studentId.indexOf(Number.parseInt(d.label))] >= rank_avg[focusedStudent]) 
												return '#e34a33'; 
											else
												return 'orange';
										    }
										else 
											{if(rank_avg[studentId.indexOf(Number.parseInt(d.label))] <= rank_avg[focusedStudent]) 
												{
												return '#2ca25f'; 
											}else
												return "orange";
										}})
									.attr("r",radius);

                        stringFocus = i;
                        //console.log(i);
                        })
                       .on("click",function(d){
                         focusedStudentNumber = d.label;
                         
                        //check index of focus student
                        index = studentId.indexOf(focusedStudentNumber);
                         enlargePeers(index,10);
                         StringVisualization();
                       });
counter=0;
svgContainer.append("g").selectAll(".stringLabels").data(jsonCirclesJoined).enter().append("text").attr("class","stringLabels")
        .attr("x", function(d){return d.x_axis-radius/3})
        .attr("y", function(d){return d.y_axis+4})
        .text(function(d,i){ if (d.y_axis==((4)*intervaly + topMargin)) {counter++; return null;} else {  d.label = peers[focusedStudentNumber][i-counter]; return peers[focusedStudentNumber][i-counter]; }})
        .on("selectstart", function(){return false;})
        .on('mousedown.drag', null);




}