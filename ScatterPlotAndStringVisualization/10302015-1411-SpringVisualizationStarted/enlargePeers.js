function enlargePeers(focusedStudent){
	console.log("Hee: "+ focusedStudent);
	svg.selectAll(".dot")
    .attr("r", function(d,i){ 
      		if (focusedStudent==i) 
      			return (10+(d3.max(v)-v[i])*2) 
      		else 
      			return (10+(d3.max(v)-v[i])*2); })
      .style("fill", function(d,i) { 
      	if (peerPool[focusedStudent].indexOf(i)!=-1) 
      		return '#000000' 
      	else {
      		if (i==focusedStudent)
      		   return '#ff0000';
      		else 
      		   return '#000000';
  			}
  			})	
      .style("fill-opacity",function(d,i){ return (0.2 + (d3.max(v)-v[i])/d3.max(v))})
      
}