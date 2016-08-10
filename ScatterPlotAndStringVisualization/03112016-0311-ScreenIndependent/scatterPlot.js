var line;
var focusedStudent;
var color = d3.scale.category10();
var labelx = [];
var labely= [];
function scatterPlot(){
  var margin = {top: 50, right: 0, bottom: 30, left: 100},
  width = screen.width*0.5 - margin.left - margin.right,
  height = screen.height*0.75 - margin.top - margin.bottom;
  var radius = 15;
  var x = d3.scale.linear()
  .range([0, width]);

  var y = d3.scale.linear()
  .range([height, 0]);


 var xAxis = d3.svg.axis()
    .scale(x)
    .innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10)
    .orient("left");

  svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  c=0;
  first_name = [], last_name=[],url=[], rank_avg=[], rank1=[], rank2 = [], rank3 = [], rank4 = [], rank5 = [], rank=[],v=[];

  headerNames=[], studentId=[],matrix=[],numberOfStudents=0,focusedStudent=0;

  d3.csv("matrix.csv", function(error, data) {
    headerNames = d3.keys(data[0]);
    if (error) throw error;

    data.forEach(function(d,i) {
      matrix[i] = d;
      studentId[i] = +d['-'];
      numberOfStudents++;

      rank_avg[c] = d['Average'];
      rank1[c] = d['rank1'];
      rank2[c] = d['rank2'];
      rank3[c] = d['rank3'];
      rank4[c] = d['rank4'];
      rank5[c] = d['rank5'];
      rank[c] = [rank1[c], rank2[c], rank3[c], rank4[c], rank5[c]];
      v[c]=0;
      for (i=0;i<5;i++)
      {
        if(rank[c][i]=="")
          break;
        v[c] = v[c] + Math.pow(rank[c][i]-rank_avg[c],2);

      }
      v[c] = v[c]/i;
      c++;
    });

    x.domain([5.4,1.0]);
    y.domain([0,d3.max(v)]);

    svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width/2)
    .attr("y", 50)
    .style("text-anchor", "middle")
    .text("Rank Average");

    svg.append("g")
    .attr("class", "grid")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-3em")
    .attr("dx","-10em")
    .style("text-anchor", "end")
    .text("Confidence")

    circles = d3.range(numberOfStudents).map(function(i) {
     return {index: i};
   });


    displx=[],disply=[],displx2=[],circleposx=0;
    circle = svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx",function(d,i){ 
      return x(rank_avg[i]);
    })
    .attr("cy", function(d,i) { return y(d3.max(v)-v[i]); })
    .attr("r", function(d,i){ return radius;})
    .style("fill", function(d,i) { return 'rgb(35,163,143)'; })

    .on("mouseover",function(d,j){
     d3.selectAll(".dot")
     .transition().duration(200)
     .attr("cx",function(d,i){
      displx[i] = 0;
      for(t1=0;t1<i;t1++){

        if(x(rank_avg[i]) == x(rank_avg[t1]) && y(d3.max(v)-v[i]) ==  y(d3.max(v)-v[t1]) && x(rank_avg[i])==x(rank_avg[j]) && y(d3.max(v)-v[i]) ==  y(d3.max(v)-v[j]))
          displx[i]++;

      }
      circleposx[i] = x(rank_avg[i]) - displx[i]*30;
      return x(rank_avg[i]) - displx[i]*30;
    })
	
	
	//d3.selectAll("text.label").attr("dx",function(d,i){ console.log(x(rank_avg[i])); if (Math.abs(d3.mouse(this)[0]-labelx[i])<100 && Math.abs(d3.mouse(this)[1]-labely[i])<100) return disply[i]*-20;});
	   })


    .on("click", function(d,j) { 
      studentId[j] = d['-'];
      Allocate();


    
      focusedStudent = studentId[j];
      enlargePeers(j);
      StringVisualization();


    })

    .transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, radius+5);
      return function(t) { return d.radius = i(t); };
    });

    svg.append("g").selectAll("text.label").data(studentId).enter().append("text")
    .text(function(d,i){return studentId[i];})
    .attr("class", "label")
    .attr("y",function(d,i){ 
     disply[i] = 1;
     for(t1=0;t1<i;t1++)
      if(x(rank_avg[i]) == x(rank_avg[t1]) && y(d3.max(v)-v[i]) ==  y(d3.max(v)-v[t1]))
        disply[i]++;
      return  y(d3.max(v)-v[i]) - 15*disply[i]-10;
    })
    .attr("x", function(d,i) { labelx[i] = x(rank_avg[i])-5; labely[i] = y(d3.max(v)-v[i]) - 15*disply[i]-10; console.log(x(rank_avg[i])); return x(rank_avg[i])-5; })

  })
}
