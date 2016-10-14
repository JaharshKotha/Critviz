//rc.hideLabels are used to indicate if student names should be hidden in x axis or not.
function visualizeGraph(rc){
    //rc.inputColorScheme=document.getElementById("rc.inputColorScheme").value;
    rc.inputColorScheme=rc.metadata["color-scheme"];

    if(document.getElementById("title")!=undefined)
        document.getElementById("title").innerHTML = rc.metadata.title;

    if(rc.svg!=null)
        d3.select("#svg").remove();

    //=====================================this needs to be replaced later=====================
    rankings = []
    allrankings = []

    p=0
    for(var i=0;i<rc.jsonData[0].data.length;i++){
        rankings[i] = []
        for(var j=0;j<rc.jsonData[0].data[i].values.length;j++){
            rankings[i].push(rc.jsonData[0].data[i].values[j]); //rankings is a multidimensional array with rankings of each student
            allrankings[p] = rc.jsonData[0].data[i].values[j];  //allrankings is single dimensional array with rankings of each students in order
            p++;
        }
        rankings[i].rank_avg = rc.jsonData[0].data[i].primary_value; //rank avg corresponds to primary value in json file for each student

    }

    rankScale = Math.abs(rc.metadata['worst-value-possible']-rc.metadata['best-value-possible'] + 1);

    var labels="";

    //Note how all the dimensions are a percentage of the window size. This makes the visualization window size independent.
    //This is very important part of creating a responsive page.
    var margin = {
            top: 0.1 * window.innerHeight,
            right: 0.01 * window.innerWidth,
            bottom: 0.0, left: 0.05 * window.innerWidth},
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

    // if best-worst primary values are not defined, then take the min max from the data for the Y domain
    primary_vals = rankings.map(function(x){return x.rank_avg});
    min_primary_val = rc.metadata['worst-primary-value-possible'] == undefined ? Math.floor(Math.min(...primary_vals)): Math.min(rc.metadata['worst-primary-value-possible'],rc.metadata['best-primary-value-possible']) ;
    max_primary_val = rc.metadata['best-primary-value-possible'] == undefined ? Math.ceil(Math.max(...primary_vals)):  Math.max(rc.metadata['worst-primary-value-possible'],rc.metadata['best-primary-value-possible']);

    // This section is to determine the direction of Y-axis ascending or descending
    //the user can either set higher_primary_value_better or 'best-primary-value-possible' / 'worst-primary-value-possible'
    if(rc.metadata['worst-primary-value-possible'] != undefined && rc.metadata['best-primary-value-possible'] != undefined)
        flip = rc.metadata['best-primary-value-possible'] > rc.metadata['worst-primary-value-possible']
    else
        flip = rc.metadata['higher-primary-value-better']
    //flip the Y axis
    if (flip)
        y.domain([min_primary_val-0.5, max_primary_val]);
    else
        y.domain([max_primary_val+0.5, min_primary_val]);


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
    p5=0;
    t=0;
    t2=0;
    t3=0;
    t4=0;
    t5=0;
    //https://coolors.co/browser


    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text(function(d) { return d; });

    bar = rc.svg.selectAll(".bar")
        .data(allrankings)
        .enter().append("rect")
        .attr("x", function(d,i) {
            t3++;
            if(rankings[p3].length==0)p3++;
            if(t3>rankings[p3].length) {
                p3++;
                t3=1;
                return ((width/rankings.length)*(p3));
            }
            return ((width/rankings.length)*(p3));
        })
        .attr("width", function(){return width/rankings.length})
        .attr("y", function(d,i) {
            t++;
            if(rankings[p].length==0) {
                p++; return 0;
            } if(t>rankings[p].length) {p++; t=1; return y(rankings[p].rank_avg) + (t-1) * ((height - y(rankings[p].rank_avg))/rankings[p].length);}   return y(rankings[p].rank_avg) + (t-1) * ((height - y(rankings[p].rank_avg))/rankings[p].length);  })
        .attr("height", function(d,i) {
            t2++;
            if(t2==rankings[p2].length+1) {
                p2++; t2=1;
            }
            if(rankings[p2].length==0) {
                p2++;
                return 0;
            }

            // cause some rendering error if the value is 0, see data file from Arlene
            //if(d==0) {
            //    p2++;
            //    return 100;
            //}

            return (height - y(rankings[p2].rank_avg))/rankings[p2].length - 1})
        .style("fill",function(d){
            //determine if high score get first / last color
            color_index = (rc.metadata['best-value-possible'] > rc.metadata['worst-value-possible']) ? rc.metadata['best-value-possible'] - d : d - rc.metadata['best-value-possible'];
            //scale color in case, the available colors != the available ranking, we round the rating values to the nearest integer
            color_scale = colorKey[rc.inputColorScheme].length / rankScale
            color_index = Math.round(color_index * colorKey[rc.inputColorScheme].length / rankScale);
            color = colorKey[rc.inputColorScheme][color_index];

            //this section is used for CPR data
            //it highlights the top most rectangle in the bar (change the top most color to a lighter one)
            t5++;
            if(t5 == rankings[p5].length + 1) {
                p5++;
                t5=1;
            }
            if(rc.metadata["highlight-top-most-bar"] && t5==1)
                color = ColorLuminance(color, 0.3)

            return color;
        })
        .attr("rx",8)
        .attr("ry",8)
        .on("mouseover", function(d) {
            this.original_color = this.style.fill;
            this.style.fill = "gray"
            tooltip.text(d);
            tooltip.style("visibility", "visible");

            //TODO: highlight the reviewer
        })
        .on("mouseout", function(d,i) {
            this.style.fill = this.original_color
            return tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function(d, i){
            tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        })


    rc.svg.select("g")
        .selectAll(".tick")
        .filter(function(d){ return d=="" || d.startsWith("/")})  //this is a temporary logic. If our x axis parameter is other than url, then this will change.
        .remove();

}



function type(d) {
    d.rank_avg = +d.rank_avg;
    return d;
}


//calculate the lighter / darker color based on it's luminance
function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }

    return rgb;
}