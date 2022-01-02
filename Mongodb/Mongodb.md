<h2> MongoDB Server </h2>

<pre> What is a MongoDB Compass?

MongoDB Compass is a powerful GUI for querying, aggregating, and analyzing your MongoDB data 
in a visual environment. Easily explore and manipulate your database with Compass, the GUI for MongoDB. 
Intuitive and flexible, Compass provides detailed schema visualizations, 
real-time performance metrics, sophisticated querying abilities, and much more.
</pre>

[Install MongoDB Community Edition on macOS](https://docs.mongodb.com/v4.2/tutorial/install-mongodb-on-os-x/)<br>
[Install MongoDB Compass](https://www.mongodb.com/try/download/compass?tck=docs_compass&_ga=2.164068985.751080216.1641090944-1085455098.1640459631) <br>
[How to use MongoDB Compass to connect to a MongoDB host](https://docs.mongodb.com/compass/current/connect/#connect-to-mongodb)

#### Notes
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

 Introduction to NoSQL Database

NoSQL database by definition is "next generation" type of database mostly
addressing some points: non-relational, distributed, open source and horizontal
scalable.

There are a couple NoSQL databases (where you can find the list here http://nosql-database.org/).
But we will be focusing on the MongoDB specifically based on its popularity in 
past few years.

## Why NoSQL?

Small to medium size company, like the company I work with, often uses MongoDB
as the starting point of the micro service. Why?

When building modern web application now, it's often that business requirement
changes in between development cycle and even change in a day or two.

MongoDB databases is designed to help with rapidly changing data types.

Please keep in mind that MongoDB is only within a type of NoSQL database, specifically
under document model database. For the class purose, we will not address other
type of databases.

> Don't just assume NoSQL = MongoDB. That is wrong.

Document model database like MongoDB stores the data in **documents**. And these
documents are typically use a structure like **JSON**. This format is very close
to how modern webapp develops.

In example, to store some data that will only be used by the front-end, you can
now simply store whatever data client side passes without any sort of schema definition
from the backend.

> Note that this type of storage without validation is considered to be ... dangerous.

Furthermore, in document storage, the notion of schema is very flexible: each
document can contain different fields. This flexibility is helpful for modeling
unstructured data. And it also makes the development easier to evolve application
in the development cycle, such as adding new fields.

In short, document model database are for general purpose and useful for wide
variety of applications due to the flexibility of the data modeling -- which we
will see in the following lectures.

You can read more on the comparison between NoSQL and Relational databases here -- 
https://www.mongodb.com/nosql-explained

## Install MongoDB

https://github.com/csula/Utilities/blob/master/setups/mongo.md

## Import sample data

Download file from https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json

> If you are using school laboratory, type in `wget https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json`

And then run below command:

```sh
mongoimport --db test --collection restaurants --drop --file ~/downloads/primer-dataset.json
```

```sh
"C:\Program Files\MongoDB\Server\3.4\bin\mongoimport.exe" --db test --collection restaurants --drop --file C:\Users\IEUser\Downloads\primer-dataset.json
```

## Mongo shell commands

Once you finish the installation of MongoDB as above steps, you should also have
Mongo shell installed along with the MongoDB server.

You can start the shell by `mongo`.

> For windows user, look for `mongo.exe` under your MongoDB folder

## CRUD with Mongo shell

CRUD stands for Create, Read, Update and Delete. Often used to describe some
most basic functionality of an app.

In the following sections, we will be discussing the CRUD operations with Mongo
shell.

Before you start any of the CRUD command, you will need change your database (just
like mysql you have to `use` database).

```sh
use test;
```

### Common debugging commands

```sh
# to see all databases
# equals to `show databases;` in MySQL
show dbs; 

# to see all collections
# equals to `show tables;` in MySQL
show collections;
```

### To create and insert a document, you can follow below command.

```javascript
db.restaurants.insert(
   {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : ISODate("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : ISODate("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
   }
);
```

### To read or find a document, you can follow the below command.

```javascript
// to find all documents under `restaurants`
db.restaurants.find()

// to find a specific restaurants with a column
db.restaurants.find( { "borough": "Manhattan" } )

// or you can even find a field in an embed document 
db.restaurants.find( { "address.zipcode": "10075" } )

// query against a field of an array
db.restaurants.find( { "grades.grade": "B" } )

// if you want to use grater sign
db.restaurants.find( { "grades.score": { $gt: 30 } } )

// or less sign
db.restaurants.find( { "grades.score": { $lt: 10 } } )

// what about logical operation like and and or?
// AND
db.restaurants.find( { "cuisine": "Italian", "address.zipcode": "10075" } )

// OR
db.restaurants.find(
   { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
)

// sorting
db.restaurants.find().sort( { "borough": 1, "address.zipcode": 1 } )

// when you call find command you actually do not retrieve any object back
// to retrieve objects back you will need to call `toArray()`
db.restaurants.find().toArray()

// projection
// projection allows you to select certain attributes when retrieve JSON
db.restaurants.find({}, {borough: 1});
```

### To update a document

```javascript
// update takes a query object first and then the fields to update
db.restaurants.update(
    { "name" : "Juni" },
    {
      $set: { "cuisine": "American (New)" },
      $currentDate: { "lastModified": true }
    }
)

// can also update embed document
db.restaurants.update(
  { "restaurant_id" : "41156888" },
  { $set: { "address.street": "East 31st Street" } }
)

// update multiple documents at once
db.restaurants.update(
  { "address.zipcode": "10016", cuisine: "Other" },
  {
    $set: { cuisine: "Category To Be Determined" },
    $currentDate: { "lastModified": true }
  },
  { multi: true}
)

// remember if you don't specify $set then it will replace the whole document
db.restaurants.update(
   { "restaurant_id" : "41704620" },
   {
     "name" : "Vella 2",
     "address" : {
              "coord" : [ -73.9557413, 40.7720266 ],
              "building" : "1480",
              "street" : "2 Avenue",
              "zipcode" : "10075"
     }
   }
)
```

### Delete documents

```javascript
// remove all documents meeting this condition
db.restaurants.remove( { "borough": "Manhattan" } )

// to be on the safe side you can use `justOne` to remove a document at once
db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )

// if you want to remove the entire documents
db.restaurants.remove( { } )

// or you can drop the whole document
db.restaurants.drop()
```
## MongoDB Aggregation

Last week, we learned how to do CRUD(Create, Read, Update & Delete) operations
in MongoDB. This is usually sufficient for you to start using MongoDB.
Nevertheless, there are more that MongoDB can do, specifically on the area of
data aggregation. Aggregations are interesting from the data scientists'
point of view because it opens up the possibility to simplify big data into metrics.
From metrics, data scientists can tell a story and present to business. This
presentation leads to actions that will transfer how business functions.

In example, I, as a software engineer, often got asked by product managers to
get the metrics about certain projects like how many users used the new
feature since the launch as compare to before launch. This kind of data often
requires doing data aggregation operations to report a metric.

All in all, we will be learning how to do data aggregation and report a metric
from MongoDB in this lesson!

### What are aggregations?

From the MongoDB documentation:

> Aggregations operations process data records and return computed results.
> Aggregation operations group values from multiple documents together, and can
> perform variety of operations on the grouped data to return a single result.  
> Reference: https://docs.mongodb.com/manual/aggregation/

In short, aggregations operations allow developers to look at the massive data
in a simpler way. For example, counting how many students are in the students
table. In other word, aggregations allow developers to look at the data from
different angles.

### Recap on SQL Group By

As a recap, we have learned how to use group by earlier in MySQL to do some aggregation such as counting number of rows with group by.

```sql
SELECT ArtistID, COUNT(*) FROM Artists
INNER JOIN Titles
ON Artists.ArtistID = Titles.ArtistID
GROUP BY ArtistID;
```

Consider above query, we are counting number of titles published by artist.

You can review the notes under https://github.com/csula/cs1222-fall-2016/blob/master/notes/sql-aggregation.md

### MongoDB Review

Remember that you can do READ operation like below:

```js
db.collection.find();

// use pretty to print pretty
db.colleciton.find().pretty();

// simplest format of aggregation
// use count to count number
db.collection.find().count();

// or use dinstinct to get unique set of results
db.collection.find().distinct("fieldName");
```

In addition to just reading the document as it is, you might find it to be
helpful to just display some of the fields. This operation is called
**projection**. 

You can do projection like below:

```js
db.collection.find( <query filter>, <projection> )
```

You can find out more about MongoDB query in [this API
documentation](https://docs.mongodb.com/manual/reference/operator/query/).

Although there are three different types of aggregations, we will only cover
the pipeline aggregations here. If you want to learn out more for your own
goods. Check MongoDB official documentation.

### Aggregation pipeline

![aggregation pipeline](imgs/aggregation-pipeline.png)

Aggregation pipeline separates out the data aggregation processing into a few
pipelines (or stages). In graph above, we noticed that it briefly separated
into **$match** and **group** pipelines. 

> Aggregation pipelines are not limited to just "$match" and "$group" and there
> are more. See [pipeline operations here](https://docs.mongodb.com/manual/reference/operator/aggregation/#aggregation-pipeline-operator-reference)

In MongoDb, you can simply call `db.collection.aggregate()` method in the mongo shell.

#### Learn by example

In the following section, we will follow the example using the zip code data
set. Please download
http://media.mongodb.org/zips.json to your download directory and import the JSON to your mongo database.

> Reminder: to import a JSON, please use `mongoimport` command as we learned last week

Each document in the `zips` collection has the following form:

```json
{
	"_id": "10280",
	"city": "NEW YORK",
	"state": "NY",
	"pop": 5574,
	"loc": [
		-74.016323,
		40.710537
	]
}
```

##### Return states with Populations above 10 Million

```js
db.zips.aggregate( [
	{ $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
	{ $match: { totalPop: { $gte: 10 * 1000 * 1000 } } }
] )
```

In code above, the aggregation pipeline has two stages ($group followed by $match)

The $group stage groups the documents by the state field, calculate the `totalPop` by the sum of population.

In $group stage, `_id` field is required and will be used to accumulate values.
In example, we are using "state" field to group data. However, if the `_id` is
given to be `null`, the $group operator will operate on the entire collection
as whole.

Other fields presented in the $group object will be used as accumulators. In
example, we accumulate the sum of population by `pop` field.

There are a few other accumulator operator you may use like below:

| Name | Description |
|:--|:--|
| [$sum](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/) | return a sum of numerical values. Ignore non-numeric values. |
| [$avg](https://docs.mongodb.com/manual/reference/operator/aggregation/avg/) | returns an average of numerical values. Ignore non-numeric values. |
| [$first](https://docs.mongodb.com/manual/reference/operator/aggregation/first/) | returns a value from the first document for each group. Order is only defined if the documents are in a defined order. |
| [$last](https://docs.mongodb.com/manual/reference/operator/aggregation/last/) | similar to above but returns last document. |
| [$max](https://docs.mongodb.com/manual/reference/operator/aggregation/max/) | returns the highest expression value for each group. |
| [$min](https://docs.mongodb.com/manual/reference/operator/aggregation/min/<Paste>) | similar to above but returns the lowest |
| [$push](https://docs.mongodb.com/manual/reference/operator/aggregation/push/) | return an array of expression values for each group. |
| [$addToSet](https://docs.mongodb.com/manual/reference/operator/aggregation/addToSet/) | returns an array of unique expression values for each group |
| [$stdDevPop](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevPop/) | returns the population standard deviation of the input values. |
| [$stdDevSamp](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/) | returns the sample standard deviation of the input values. |

The $match stage filters these grouped documents to output only those documents whose totalPop is greater than 10 million.

The equivalent SQL would be:

```sql
SELECT state, SUM(pop) AS totalPop
FROM zips
GROUP BY state
HAVING totalPop >= (10 * 1000 * 1000); 
```

#### Return average city population by state

```js
db.zips.aggregate( [
	{ $group: { _id: { state: "$state", city: "$city" }, pop: { $sum: "$pop" } } },
	{ $group: { _id: "$_id.state", avgCityPop: { $avg: "$pop" } } }
] )
```

In this example, aggregation pipeline consists of two $group stages.

The first $group stage groups the documents by the combination of city and state. And uses $sum to calculate the total population for each combination.

The output documents looks like below:

```json
{
	"_id": {
		"state": "CO",
		"city": "EDGEWATER"
	},
	"pop": 13154
}
```

And then second $group stage groups the documents by `_id.state` field (e.g. `state` field) and uses $avg expression to calculate the average city population for each state.

#### Return largest and smallest cities by state

```js
db.zips.aggregate( [
   { $group:
      {
        _id: { state: "$state", city: "$city" },
        pop: { $sum: "$pop" }
      }
   },
   { $sort: { pop: 1 } },
   { $group:
      {
        _id : "$_id.state",
        biggestCity:  { $last: "$_id.city" },
        biggestPop:   { $last: "$pop" },
        smallestCity: { $first: "$_id.city" },
        smallestPop:  { $first: "$pop" }
      }
   },

  // the following $project is optional, and
  // modifies the output format.

  { $project:
    { _id: 0,
      state: "$_id",
      biggestCity:  { name: "$biggestCity",  pop: "$biggestPop" },
      smallestCity: { name: "$smallestCity", pop: "$smallestPop" }
    }
  }
] )
```










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











  
---

<h4> Node JS <h4>
<p> <code> db.listCollections()</code> Retrieve information, i.e. the name and options, about the collections and views in a database</p>
  <p> create a new collection <code> db.collection(); </code></p>

---

<h3> Query Expression</h3>
