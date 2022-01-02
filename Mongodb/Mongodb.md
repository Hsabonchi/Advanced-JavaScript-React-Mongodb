<h2> MongoDB Server </h2>

<pre> What is a MongoDB Compass?

MongoDB Compass is a powerful GUI for querying, aggregating, and analyzing your MongoDB data 
in a visual environment. Easily explore and manipulate your database with Compass, the GUI for MongoDB. 
Intuitive and flexible, Compass provides detailed schema visualizations, 
real-time performance metrics, sophisticated querying abilities, and much more.
</pre>

[Install MongoDB Compass](https://www.mongodb.com/try/download/compass?tck=docs_compass&_ga=2.164068985.751080216.1641090944-1085455098.1640459631) <br>
[Install MongoDB Community Edition on macOS]




<pre> 
  Arecipe, like General Tso's Cauliflower (Links to an external site.), 
 has a name, yield (i.e. number of servings), a number of ingredients, 
 and directions (which consist of a number of steps). 
 Note that quantity needs to be specified for some ingredients (e.g. 2 teaspoons of oil) but not for the others (e.g. salt).
please create a Node.js program that does the following:
Create two recipes objects. You may hard-code a couple of simple, make-up recipes 
-- they don't need to be complex or real, but they should have all the properties described above.
Query the database for recipes that use the ingredients "beef" and "potato". Print out the id and name of the recipes found.
Query the database for recipes whose names include the word "Steak". 
Print out the id and name of the recipes found. You must use Text Search for this query. 
You can create the necessary text index outside the program.</pre>








<ul>
<li> A collection is the equivalent of a table in relational databases </li>
<li> Collection does notenforce a schema </li>
<li> A document in MongoDB is the same as a record in MySQL </li>
<li> Documents in MongoDB are objects stored in a format called BSON </li> 
<li> Each document must have a unique _id field that serves as the primary key </li>
<li> An Object value is also known as an embedded documentor a sub-document </li>
</ul>

<h3>What is BSON? </h3>
<ul> 
  <li>BSON simply stands for “Binary JSON </li>
  <li> BSON’s binary structure encodes type and length information, which allows it to be parsed much more quickly. </li>
  <li>MongoDB stores data in BSON </li>
  <li> Allows developers to query and manipulate objects by specific keys inside the JSON/BSON document</li>
</ul>

<h4> <a href="https://docs.mongodb.com/guides/server/drivers/"> Connect to your MongoDB instance</a> </h4>

<h4>Data Model </h4>
  <ul>
    <li> if you do not specify an _id field, then MongoDB will add one for you and assign a unique id for each document.</h4>
    <li>Embedded documents capture relationships between data by storing related data in a single document structure</li>
  </ul>
  
---

<h4> Node JS <h4>
<p> <code> db.listCollections()</code> Retrieve information, i.e. the name and options, about the collections and views in a database</p>
  <p> create a new collection <code> db.collection(); </code></p>

---

<h3> Query Expression</h3>
