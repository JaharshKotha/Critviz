var detailsDiv;
function showdetails(){


	d3.selectAll("#detailsDiv").remove();

		detalildDiv = d3.select('body').append('div')
		.attr("id", "detailsDiv");

		detailsDiv.append('img')
		.attr("src","student.jpg")
		.attr("height","200")
		.attr("width","200");

		



}