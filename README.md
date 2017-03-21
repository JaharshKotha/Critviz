# Critviz (RC Graph)
A peer review system . Hosted live on (www.critviz.com) 
This repository contains only the rainbow graph used in the system.

Rainbow Graph :

![screen shot 2017-01-22 at 8 18 02 pm](https://cloud.githubusercontent.com/assets/9432757/22190371/107172e4-e0e0-11e6-9305-68f3d061b241.png)

##### What's the Rainbow Graph in a single line ? 
The rainbow graph is a colorful visual representation of the student's peer evaluation data for a given assignment in your course. 

##### What's the input to the Rainbow Graph ? 
The rainbow graph accepts the student's peer evaluation data in the format of a JSON file like this [hideStudents.txt](https://github.com/JaharshKotha/Critviz/files/722651/hideStudents.txt).

![screen shot 2017-01-22 at 10 01 29 pm](https://cloud.githubusercontent.com/assets/9432757/22192141/808634f8-e0ee-11e6-84be-0464c9e5266e.png)


#### Skeleton structure of the JSON : 

##### Metadata : 
/* jsonData have following "metadata" keys. ALso given is what is Critviz using<br/>
 "title": "Title of the graph",<br/>
 "primary-value-label": "The label that you want to appear against your Primary Value",<br/>
 "higher_primary_value_better": "Indicates that on scale of 1-5 , 5 is the best value to score",<br/>
 "higher_values_better": "Currently not being used",<br/>
 "y-range_top": "The highest possible Primary value",<br/>
 "y-range_bottom": "The lowest possible Primary value",<br/>
 "y-axis-label": "Rank Average",<br/>
 "x-axis-label": "Students",<br/>
 "secondary-value-label": "variance, not in use right now, ignored",<br/>
 "values-range-low": "Range of possible values - LOW",<br/>
 "values-range-high": "Range of possible values - High",<br/>
 "number-of-colors": "No.of colours to be used in filling your cells",<br/>
 "color-scheme": "Wether you would like to use any shades of colors"<br/>
 },<br/>
 */

##### Studentdata : 
/* jsonData have the following "data" keys for all students. Also given is what is Critviz using
 "first_name": "", empty in student view for other students <br/>
 "last_name": "", <br/>
 "column_url": "/assignments/737/responses/54715/showcrit?crit_assignment_id=744", //Any unique url specifying the assignment<br/>
 "primary_value": 1.285714286, //rank average in critviz<br/>
 "secondary_value": 0.489795918, //variance in critviz, ignore<br/>
 "values": [1, 1, 1, 1, 1, 1, 3], //ranks in critviz<br/>
 */<br/>
 

<h4>What does the geometric's of this graph convey ? </h4>

Well the first thing that you oberserve is a set of horizontal bars.<br/> 
Let's start with the height of each bar , The height of each horizonatal represents a student's performance and convey's the corresponding primary value for that student in your data set beautifully blended to your screen space.<br/>

![screen shot 2017-01-23 at 11 02 30 am](https://cloud.githubusercontent.com/assets/9432757/22216261/9ad6c8aa-e15b-11e6-9aa3-81c33ca79a10.png)


Now , each of the horizontal bar is split into tiny portions corresponding to the number of persons who have critqued him for that assignment and each portion is colored proportional to the rank he has from that  critique.On hovering over each cell in the bar shows out the rank that student has received .


 <h5> How do I use the code in this repository : </h5>
 
 Using this library is as simple as it can get . Just download the entire package as a zip and place the directory as such in your project directory. Replace the data files mentioned in the data folder with your data and the script dynamically generates the visualization for your data.

 
 
<h5> Technologies used : </h5>
 
 JQuery , JavaScript , D3.js.
 
 
 
 
 
