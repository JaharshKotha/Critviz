# Critviz (RC Graph)
A peer review system . Hosted live on (www.critviz.com) 
This repository contains only the rainbow graph used in the system.

Rainbow Graph :

![screen shot 2017-01-22 at 8 18 02 pm](https://cloud.githubusercontent.com/assets/9432757/22190371/107172e4-e0e0-11e6-9305-68f3d061b241.png)

##### What's the Rainbow Graph in a single line ? 
The rainbow graph is a colorful visual representation of the student's peer evaluation data for any given assignment in CritViz. 

##### What's the input to the Rainbow Graph ? 
The rainbow graph excepts the student's peer evaluation data in the format of a JSON file like this example.

#### Skeleton structure of the JSON : 

##### Metadata : 
/* jsonData have following "metadata" keys. ALso given is what is Critviz using
 "title": "Title of the graph",
 "primary-value-label": "rank average",
 "higher_primary_value_better": false,
 "values-label": "ranks",
 "higher_values_better": false,
 "y-range_top": 1,
 "y-range_bottom": 5.5,
 "y-axis-label": "Rank Average",
 "x-axis-label": "Students",
 "secondary-value-label": "variance, not in use right now, ignored",
 "values-range-low": 1,
 "values-range-high": 5,
 "number-of-colors": 5,
 "color-scheme": 1
 },
 */

##### Studentdata : 
/* jsonData have the following "data" keys for all students. Also given is what is Critviz using
 "first_name": "", empty in student view for other students
 "last_name": "", empty in student view for other students
 "column_url": "/assignments/737/responses/54715/showcrit?crit_assignment_id=744", url specifying the assignment
 "primary_value": 1.285714286, //rank average in critviz
 "secondary_value": 0.489795918, //variance in critviz, ignore
 "values": [1, 1, 1, 1, 1, 1, 3], //ranks in critviz
 */
 
 
 
