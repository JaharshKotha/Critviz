var valueline;
function curveFitting(){
	 valueline = d3.svg.line()
    .interpolate("basis")           // <=== THERE IT IS!
    .x(function(d,i) { return x(rank_avg[i]); })
    .y(function(d,i) { return y(d3.max(v)-v[i]); });




}