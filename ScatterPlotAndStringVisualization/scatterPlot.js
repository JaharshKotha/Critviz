//Scatter
var line;
var focusedStudent=-1;
var color = d3.scale.category10();
var labelx = [];
var labely= [];
function scatterPlot(){
  var margin = {top: 50, right: 0, bottom: 30, left: 100},
  width = screen.width*0.50 - margin.left - margin.right,
  height = screen.height*0.70 - margin.top - margin.bottom;
  var radius = screen.width/70;
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
  .attr("width", width + margin.left + margin.right+60)
  .attr("height", height + margin.top + margin.bottom + 40)
  .style("fill","black")
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

    x.domain([numberOfStudents,0]);
    y.domain([0,d3.max(v)]);

    svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width/2)
    .attr("dy", 30)
    .style("text-anchor", "end")
    .text("Class rankings");

    svg.append("g")
    .attr("class", "grid")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "-4em")
    .attr("dx","-15em")
    .style("text-anchor", "end")
    .text("Confidence")
      concenCircle = null;
    circles = d3.range(numberOfStudents).map(function(i) {
     return {index: i};
   });


    displx=[],disply=[],displx2=[],circleposx=0;
    circle = svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx",function(d,i){ 
      return x(i);
    })
    .attr("cy", function(d,i) { return y(d3.max(v)-v[i]); })
    .attr("r", function(d,i){radius})
	.attr("id",function(d,i){return studentId[i];})
    .style("fill", function(d,i) { return 'rgb(35,163,143)'; })
	.on("mouseover",function(d,j){



	//d3.selectAll("text.label").attr("dx",function(d,i){ console.log(x(rank_avg[i])); if (Math.abs(d3.mouse(this)[0]-labelx[i])<100 && Math.abs(d3.mouse(this)[1]-labely[i])<100) return disply[i]*-20;});
	   })


    .on("click", function(d,j) {
        if(concenCircle!=null)
            concenCircle.remove();
        

   // this.transition().duration(1000).attr("r",100);
    x = this.getAttribute("cx");
    y = this.getAttribute("cy");
    concenCircle = svg.append("g").append("circle").attr("cx", x).attr("cy", y)
        .attr("r", radius + 5).attr("fill","none").attr("stroke","black").attr("stroke-width","3");

        showme = svg.selectAll(".scatterLabel");

        //get every label to be black again
        for(i=0;i<showme[0].length;i++){
            showme[0][i].style.fill = "black";
        }

        labelFromCircle = this.getAttribute("id");
        if(parseInt(showme[0][j].innerHTML) == labelFromCircle){
            showme[0][j].style.fill = "white";

        }



                studentId[j] = d['-'];
      Allocate();
      focusedStudent = j;
      enlargePeers(focusedStudent,radius);
      StringVisualization();


    })

    .transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attrTween("r", function(d,i) {
      var i = d3.interpolate(0, radius);
      return function(t) { return d.radius = i(t); };
    });


      // svg.append("g").append("circle")
      //     .attr("cx",function(d,i){
      //         return x(i);
      //     })
      //     .attr("cy", function(d,i) { return y(d3.max(v)-v[i]); })
      //     .attr("r", function(d,i){radius+10});


    svg.append("g").selectAll(".scatterLabel").data(studentId).enter().append("text")

    .attr("class", "scatterLabel")
    .attr("y",function(d,i){ 
     disply[i] = 1;
     for(t1=0;t1<i;t1++)
      if(x(rank_avg[i]) == x(rank_avg[t1]) && y(d3.max(v)-v[i]) ==  y(d3.max(v)-v[t1]))
        disply[i]++;

     return  y(d3.max(v)-v[i])+4;

    })
    .attr("x", function(d,i) {

        if(this.getAttribute("id") >10)
            return  x(i)-10;
        else
            return x(i)-8;
})
     .text(function(d,i){return studentId[i];})

  })
}
