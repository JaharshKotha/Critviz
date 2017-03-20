  //rc.hideLabels are used to indicate if student names should be hidden in x axis or not.
function visualizeGraph(rc){
//rc.inputColorScheme=document.getElementById("rc.inputColorScheme").value;
rc.inputColorScheme=rc.metadata["color-scheme"];

document.getElementById("title").innerHTML = rc.metadata.title;

if(rc.svg!=null)
  d3.select("#svg").remove();

//=====================================this needs to be replaced later=====================
rankings = []
allrankings = []
stids = [];
allstids = [];
p=0;
var cclen=[];

for(var i=0;i<rc.jsonData[0].data.length;i++){
  rankings[i] = []
  stids[i] = rc.jsonData[0].data[i].stuid;
  for(var j=0;j<rc.jsonData[0].data[i].values.length;j++){
  rankings[i].push(rc.jsonData[0].data[i].values[j]); //rankings is a multidimensional array with rankings of each student
  allrankings[p] = rc.jsonData[0].data[i].values[j];  //allrankings is single dimensional array with rankings of each students in order
  allstids[p] = stids[i];
  p++;
  }
rankings[i].rank_avg = rc.jsonData[0].data[i].primary_value; //rank avg corresponds to primary value in json file for each student
cclen[i]=rc.jsonData[0].data[i].critcomparer.length;

}

	ccarray = [];
		ccstu = [];
		ccvalues = [];
		new_cc = [];
		curval=0;
		ccrit=0;
		flg=0;
		for(var j=0;j<rc.jsonData[0].data.length;j++)
		{
			ccarray[j] = [];
			new_cc[j] = [];
			ccvalues[j] = [];
			ccarray[j][0]=rc.jsonData[0].data[j].stuid;
			new_cc[j][0] = rc.jsonData[0].data[j].stuid;
			ccstu[j]=rc.jsonData[0].data[j].stuid;
			ccvalues[j][0]=rc.jsonData[0].data[j].stuid;
			for(var k=0;k<cclen[j];k++)
			{
				ccvalues[j].push(rc.jsonData[0].data[j].values[k]);
			}
			var tem=0;
			
			for(var k=0;k<cclen[j];k++)
			{
				curval=ccvalues[j][k+1];
				
				for(var ij=0;ij<cclen[j];ij++)
				{
					if(curval==rc.jsonData[0].data[j].critcomparer[ij].rank)
					{
						ccrit=rc.jsonData[0].data[j].critcomparer[ij].critid;
						
						var te =1;
						for(var ji=0;ji<(ccarray[j].length-1);ji++)
						{
							
							
							if(ccrit==ccarray[j][te])
							{flg=1;break;}
						++te;
						
						}
						if(flg==1)
						{
							flg=0;
							continue;
						}
						else
						{
							flg=0;
							ccarray[j].push(rc.jsonData[0].data[j].critcomparer[ij].critid);
							new_cc[j].push(rc.jsonData[0].data[j].critcomparer[ij].critid);
						}
					}
					
				}
				//ccarray[j][tem]=jsonData[0].data[0].critcomparer[tem];
				//ccstu[j].push(jsonData[0].);
				++tem;
			}
		}
	
	
	stcc=[];
	ct=0;
		for(var ij=0;ij<ccarray.length;ij++)
		{
			for(var ji=1;ji<ccarray[ij].length;ji++)
			{
			stcc[ct]=ccarray[ij][0]+'%'+ccarray[ij][ji];
			++ct;
			}
		}
		
			for(var ij=0;ij<ccarray.length;ij++)
		{
			for(var ji=1;ji<ccarray[ij].length;ji++)
			{
			ccarray[ij][ji]=[];
			len = jsonData[0].data[ij].critcomparer[ji-1].otherstu.length;
			while(len>0)
			{
				ccarray[ij][ji].push(jsonData[0].data[ij].critcomparer[ji-1].otherstu[len-1]);
				len--;
			}
			
			}
		}
		
		//console.log(ccarray);
		//console.log(ccstu);
		//console.log(ccvalues);
		//console.log(stcc);
		//console.log(new_cc);
		
//console.log(allstids);
rankScale = Math.abs(rc.metadata['worst-value-possible']-rc.metadata['best-value-possible'] + 1);



var labels="";

//Note how all the dimensions are a percentage of the window size. This makes the visualization window size independent.
//This is very important part of creating a responsive page.
var margin = {top: 0.1 * window.innerHeight, right: 0.01 * window.innerWidth, bottom: 0.0, left: 0.05 * window.innerWidth},
    width = window.innerWidth*0.9;
    height = (window.innerHeight * 0.6) -  margin.top - margin.bottom;

y = d3.scale.linear()
    .range([height, 0]);

yAxis = d3.svg.axis()
    .scale(y)
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10)
    .orient("left");

y.domain([rc.metadata['worst-value-possible']+0.5,rc.metadata['best-value-possible']]);


//If the user has not use brushing yet, this will make sure that all the students are being shown in the main graph.
if (rc.brushCheck==false){
    
    x = d3.scale.ordinal()
    .rangeBands([0, width]);

xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
	

// If no student names are specified in the json file, d3 needs something unique on x-axis to plot the graph.
// In that case, it would be column_url. Also note that we rc.hideLabels as we dont want to show column_url in this case. 
//TODO: Why does it not require column_url in return statement. It still works if it does not return.
x.domain(rc.jsonData[0].data.map(function(d,i) {if(d.first_name!="") return (d.first_name); else  return(d.column_url);  }));
  
//slider function takes care of building the navigation graph on top of our original graph.
//slider();  
}

//=====================================this needs to be replaced later=====================


if(rc.brushCheck==true){
  f = 0;
  if(rc.selected!=undefined)
    find = rc.selected[0];
  else
    find = 0;
  while(rc.jsonData[0].data[f].column_url!=find && rc.jsonData[0].data[f].first_name!=find){
    f++;
  }

fextent = 0
if(rc.selected!=undefined)
  find = rc.selected[rc.selected.length-1];
else
  find = x.domain()[x.domain().length-1];

while(rc.jsonData[0].data[fextent].column_url!=find && rc.jsonData[0].data[fextent].first_name!=find)
  fextent++;

rankings = [];
allrankings = [];
p=0;
for(var i=0;i<fextent-f;i++){
  rankings[i] = []
  for(var j=0;j<rc.jsonData[0].data[f+i].values.length;j++){
  rankings[i].push(rc.jsonData[0].data[f+i].values[j]);
  allrankings[p] = rc.jsonData[0].data[f+i].values[j];
  p++;
  }
rankings[i].rank_avg = rc.jsonData[0].data[f+i].primary_value;
}
}
//=========================================================================================
    
 rc.svg = d3.select("body").append("svg")
    .attr("id","svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom+100)
  .append("g")
    .attr("transform", "translate(" + ( margin.left) + "," + (margin.top) + ")")


  
  
  rc.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll(".tick text")
      .attr("transform", "rotate(-90)")
      .attr("dx",-35)
      .attr("dy",-5)
	  .attr("id",function(d,i){ return stids[i];})

  
    
  //svg.select("g").append("tick")

  rc.svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -36)
      .attr("x",-(height/2))
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(rc.metadata['y-axis-label']);



k=0;
p=0;
p2=0;
p3=0;
p4=0;
t=0;
t2=0;
t3=0;
t4=0;
cx=0;
cy=0;
wid=0;
hei=0;
//https://coolors.co/browser



  scoreBar = rc.svg.selectAll(".scoreBar")
      .data(allrankings)
    .enter().append("rect")
      .attr("class", function(d,i){ return allstids[i];})
      .attr("x", function(d,i) {t3++; if(rankings[p3].length==0){p3++;} if(t3>rankings[p3].length) {p3++; t3=1; return ((width/rankings.length)*(p3));} return ((width/rankings.length)*(p3)); })
      .attr("width", function(){return width/rankings.length})
      .attr("y", function(d,i) { t++; if(rankings[p].length==0) { p++; return 0;} if(t>rankings[p].length) {p++; t=1; return y(rankings[p].rank_avg) + (t-1) * ((height - y(rankings[p].rank_avg))/rankings[p].length);}   return y(rankings[p].rank_avg) + (t-1) * ((height - y(rankings[p].rank_avg))/rankings[p].length);  })
      .attr("height", function(d,i) {  t2++; if(t2==rankings[p2].length+1) {p2++; t2=1;} if(rankings[p2].length==0) { p2++; return 0;} if(d==0) {p2++;  return 100;}   return (height - y(rankings[p2].rank_avg))/rankings[p2].length - 1})
	  .style("fill",function(d){return colorKey[rc.inputColorScheme][Math.floor(((d-1)*colorKey[rc.inputColorScheme].length / rankScale))];})
	  .attr("rx",8)
	  .attr("ry",8)
	  .attr("id",function(d,i){return stcc[i];})
	  .on("mouseover", function() { cx=this.getAttribute("id");
									split_id = cx.split("%");
									critsplitid = split_id[1];
									
									var x = document.getElementsByClassName(critsplitid);
									var y=x.length;
									
									ccx=x[0].getAttribute("x");
									ccy=x[y-1].getAttribute("y");
									wid=x[0].getAttribute("width");
									hei=x[0].getAttribute("height");
									ccy=parseInt(ccy)+parseInt(hei)+15;
									ccx=parseInt(ccx)+parseInt(wid)/2;
									draw_circle(ccx,ccy);
									
									ccval_len = ccvalues.length;
									tx = 0;
									while(ccval_len>0)
									{
										if(ccvalues[tx][0] == split_id[0])
										{
											break;
										}
										else{--ccval_len;++tx;}
									}
									
									
									ccval_len = ccvalues[tx].length;
									ty = 1;
									while(ccval_len>0)
									{
										if(new_cc[tx][ty] == split_id[1])
										{
											break;
										}
										else{--ccval_len;++ty;}
									}
									ot_arr = ccarray[tx][ty];
									
									var li=0;
									for(li=0;li<ot_arr.length;li++)
									{
										var ind = ot_arr[li]+"%"+critsplitid;
										console.log(ind);
									 document.getElementById(ind).style.opacity =0.5;
									document.getElementById(ind).style.stroke ="red";	
									}
									
									})
     .on("mouseout", function(d,i) {  
	 remcircle();
	 this.style.fill = colorKey[rc.inputColorScheme][Math.floor(((d-1)*colorKey[rc.inputColorScheme].length / rankScale))];
	 ccval_len = ccvalues.length;
									tx = 0;
									while(ccval_len>0)
									{
										if(ccvalues[tx][0] == split_id[0])
										{
											break;
										}
										else{--ccval_len;++tx;}
									}
									
									
									ccval_len = ccvalues[tx].length;
									ty = 1;
									while(ccval_len>0)
									{
										if(new_cc[tx][ty] == split_id[1])
										{
											break;
										}
										else{--ccval_len;++ty;}
									}
									ot_arr = ccarray[tx][ty];
									
									var li=0;
									for(li=0;li<ot_arr.length;li++)
									{
										var ind = ot_arr[li]+"%"+critsplitid;
										console.log(ind);
									 document.getElementById(ind).style.opacity =1;
									 document.getElementById(ind).style.stroke ="none";
										
									}
	 })
    

  rc.svg.select("g")
      .selectAll(".tick")
      .filter(function(d){ return d=="" || d.startsWith("/")})  //this is a temporary logic. If our x axis parameter is other than url, then this will change.
      .remove();

}

function remcircle()
{
	d3.selectAll("circle").remove();
}
function draw_circle(x,y)
{
	//<circle cx=ccx cy=ccy r="10" stroke="green" stroke-width="4" fill="yellow" />
	d3.select("g").append("circle").attr("cx", x)
                     .attr("cy", y)
                       .attr("r", "10")
                      .style("fill", "white")
					  .style("stroke","pink")
					  .style("stroke-width", "4");
}

function type(d) {
  d.rank_avg = +d.rank_avg;
  return d;
}


function slider(){
    
    //Note how percentatges are used to make the navigation graph too responsive with window size.
    //So resizing the window does not crop the graph.

    var margin = {top: 0.0 * window.innerHeight, right: 0.01 * window.innerWidth, bottom: 0.05*window.innerHeight, left: 0.05 * window.innerWidth},
    width = window.innerWidth*0.9;
    var height = (window.innerHeight * 0.2) -  margin.top - margin.bottom;


// If appending/refreshing slider, remove the one earlier present.
if(rc.svg2!=null){
  d3.select("#svg2").remove();
}

x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width]);


y2 = d3.scale.linear()
    .range([height, 0]);

xAxis2 = d3.svg.axis()
        .scale(x2)
        .orient("bottom");

//Brush is the rectangular scoreBar that floats on the navigation graph. This is not the call, but just definition of function.
//This function will be called later.
brush = d3.svg.brush()
    .x(x2)
    .extent([0,400])
    .on("brush", brushed)


x2.domain(rc.jsonData[0].data.map(function(d,i) {  if(d.first_name!="") return (d.first_name); else {rc.hideLabels = true;} return d.column_url; }));
y2.domain([rankScale+0.5,0]);

rc.svg2 = d3.select("body").append("svg")
    .attr("id","svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    rc.svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2);

rc.svg2.append("rect")
    .attr("class", "grid-background")
    .attr("width", width)
    .attr("height", height);


sasTopBar = rc.svg2.selectAll(".scoreBar")
      .data(rankings)
    .enter().append("rect")
      .attr("class", "scoreBar")
      .attr("x", function(d,i) { return (width/rankings.length) * i }) //draw the vertical scoreBar at increasing positions.
      .attr("width", width/rankings.length)
      .attr("y", function(d){ if(d.rank_avg==0) return y2(rankScale+0.5); else return y2(d.rank_avg)})
      .attr("height", function(d){ if(d.rank_avg==0) return height - y2(rankScale+0.5); if (d.rank_avg!=0) return (height - y2(d.rank_avg)); else return 0; })
    .style("fill","blue")
    .attr("rx",4)
    .attr("ry",4);


//We don't need any labels on navigator. Remove the labels that come by default.
  rc.svg2.select("g")
      .selectAll(".tick text")
      .remove();

     rc.svg2.select("g")
      .selectAll(".tick")
      .remove();


// We have specified the brush earlier, now it is time to use it to draw it.
var gBrush = rc.svg2.append("g")
    .attr("class", "brush")
    .call(brush); //this will draw the brush - with all the properties of 'brush'

gBrush.selectAll("rect")
    .attr("height", height);


// Selected variable will specify what values are selected by brush
// This will create an array "selected" with values corresponding to x-axis values of students selected on navigation scoreBar.

rc.selected =  x2.domain().filter(function(d){
        //This is being performed for all students because d3 iterates to the length of data
        return (brush.extent()[0] <= x2(d)) && (x2(d) <= brush.extent()[1])
      }
    );                     
      


//This is a nested function only accessible to slider function
function brushed() {
//d3.event.stopPropagation();
rc.brushCheck=true;
if (!d3.event.sourceEvent) return;  
      rc.selected =  x2.domain().filter(function(d){
        return (brush.extent()[0] <= x2(d)) && (x2(d) <= brush.extent()[1])});                     
      x.domain(rc.selected);
      visualizeGraph();
  


}

}
