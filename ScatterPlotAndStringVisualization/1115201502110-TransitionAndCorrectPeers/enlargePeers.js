
function enlargePeers(focusedStudent){
 // console.log("studentsId : " + studentId[focusedStudent]);
  
  //create a mapping between row and studentID



	svg.selectAll(".dot")
    .attr("r", function(d,i){ 

          	if (focusedStudent==i) 
      			return (20/*+(d3.max(v)-v[i])*2*/) 
      		else if (peerPool[studentId[focusedStudent]-1].indexOf(i)!=-1)
              return (20/*+(d3.max(v)-v[i])*2); }*/)
          else
              return 20;
        })
      .style("fill", function(d,i) { 

      // i = studentId[i];
      	 if (peerPool[focusedStudent].indexOf(i)!=-1) 
      		return '#0000ff' ;
      	else {
      		if (i==focusedStudent)
      		   return '#ff0000';
      		else 
      		   return '#000000';
  			}
  			})	
      .style("fill-opacity",function(d,i){ if (peerPool[focusedStudent].indexOf(i)!=-1 || focusedStudent==i) return 1.0; else return 0.05;})




}