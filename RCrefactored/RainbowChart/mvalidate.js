function mvalidate(rc){

allrankingIndex=0
    
//console.log(min_rank_val+" "+max_rank_val);

rc.metadata['higher_primary_value_better'] == undefined ? sortandfind() : sortonly();


function sortonly()
{
flip =rc.metadata['higher_primary_value_better'];
flip ? sortdesc() : sortasc();


}
function sortasc()
{


  for(var i=0;i<rc.jsonData[0].data.length;i++){
      
      if(rc.jsonData[0].data[i].primary_value == 0)
      {
      
        rc.jsonData[0].data[i].primary_value=Number.MAX_SAFE_INTEGER;
      }
    }
  
    rc.jsonData[0].data.sort(function(a, b) {
    return parseFloat(a.primary_value) - parseFloat(b.primary_value);
});

}
function sortdesc()
{
	rc.jsonData[0].data.sort(function(a, b) {
    return parseFloat(b.primary_value) - parseFloat(a.primary_value);
});

}

for(var i=0;i<rc.jsonData[0].data.length;i++){
        rankings[i] = []
        for(var j=0;j<rc.jsonData[0].data[i].values.length;j++){
            rankings[i].push(rc.jsonData[0].data[i].values[j]); //rankings is a multidimensional array with rankings of each student
            allrankings[allrankingIndex] = rc.jsonData[0].data[i].values[j];  //allrankings is single dimensional array with rankings of each students in order
            if(min_rank_val>allrankings[allrankingIndex]  )
            {
                min_rank_val=allrankings[allrankingIndex];
            }
            if(max_rank_val<allrankings[allrankingIndex] && allrankings[allrankingIndex]!= Number.MAX_SAFE_INTEGER)
            {
                max_rank_val = allrankings[allrankingIndex];
            }
            allrankingIndex++;
        }
        rankings[i].rank_avg = rc.jsonData[0].data[i].primary_value; //rank avg corresponds to primary value in json file for each student
        if(min_primary_value > rankings[i].rank_avg)
        {

            min_primary_value = Math.floor(rankings[i].rank_avg);
        }
        if(max_primary_value < rankings[i].rank_avg && rankings[i].rank_avg != Number.MAX_SAFE_INTEGER)
        {
            max_primary_value = Math.ceil(rankings[i].rank_avg);
            
        }

    }

}

