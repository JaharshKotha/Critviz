
function enlargePeers(focusedStudent,radius){
 // console.log("studentsId : " + studentId[focusedStudent]);
  
  //create a mapping between row and studentID



	svg.selectAll(".dot")
      .transition().duration(500)
      .style("fill", function(d,i) { 

      	 if (peerPool[focusedStudent].indexOf(i)!=-1) 
      		return 'rgb(112,146,190)' ;
      	else {
      		if (i==focusedStudent)
      		   return 'rgb(182,29,20)';
      		else 
      		   return '#000000';
  			}
        })
        

        
        .attr("r",function(d,i){
            if (i==focusedStudent)
             return radius*(d3.max(v)-v[i]+1);
          else 
             return radius*(d3.max(v)-v[i]+1);

  			})	
      .style("fill-opacity",function(d,i){ if (peerPool[focusedStudent].indexOf(i)!=-1 || focusedStudent==i) return 1.0; else return 0.2;})




}