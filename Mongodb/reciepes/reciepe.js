 /* Arecipe, like General Tso's Cauliflower (Links to an external site.), 
 has a name, yield (i.e. number of servings), a number of ingredients, 
 and directions (which consist of a number of steps). 
 Note that quantity needs to be specified for some ingredients (e.g. 2 teaspoons of oil) but not for the others (e.g. salt).
please create a Node.js program that does the following:

Create two recipes objects. You may hard-code a couple of simple, make-up recipes 
-- they don't need to be complex or real, but they should have all the properties described above.
Save them to your MongoDB database on CS3.
Query the database for recipes that use the ingredients "beef" and "potato". Print out the id and name of the recipes found.
Query the database for recipes whose names include the word "Steak". 
Print out the id and name of the recipes found. You must use Text Search for this query. You can create the necessary text index outside the program.*/


"use strict";

const MongoClient = require("mongodb").MongoClient;

const Recieoiesdocs = [
    {
        "Name": "Mashed Potatoes",
        "Yield": 6,
        "Ingredients":
            [{ Name: "golden creamer potato", quantity: "4 pound" }, { Name: "chives", quantity: "2 tablespoons chopped" }],
        "Directions": ["add the bay leaf", "boil over medium-high heat and cook until the potatoes are tender",
            "heat the cream and butter in a small saucepan", "Add the hot cream and season with salt "]
    },
    {
        "Name": "Beef Brisket",
        "Yield": 10,
        "Ingredients":
            [
                { Name: "sprigs", quantity: "4 sprigs fresh rosemary" }, { Name: "golden creamer potato", quantity: "1 pound" },
                { Name: " beef brisket", quantity: "1 (4 pound)" }, { Name: "onions", quantity: "4 large red onions, halved" }
            ],
        "Directions": ["Preheat the oven to 325 degrees F", " Put the garlic-rosemary paste in a small bowl and add 2 tablespoons of olive oil",
            "Put the brisket in the roasting pan and sear to form a nice brown crust on both sides", "ay the vegetables all around the brisket and pour the rosemary paste"]

    },
    {
        "Name": "Grilled Flank Steak",
        "Yield": 6,
        "Ingredients":
            [
                { Name: " flank steak", quantity: "2 pounds" }, { Name: "rosemary", quantity: "1 teaspoon chopped" }, { Name: "oregano", quantity: "1 teaspoon chopped" }
            ],
        "Directions": ["Make the marinade: Combine the canola oil, vinegar, mustard, garlic, oregano, parsley, rosemary and Worcestershire sauce in a food processor", "Make the marinade: Combine the canola oil, vinegar, mustard, garlic, oregano, parsley, rosemary and Worcestershire sauce in a food processor", "Bring the marinade to a boil, then reduce the heat to a simmer and cook until thickened, 2 to 3 minutes.",
            "Preheat a grill to high and oil the grates. Grill the steak 3 to 5 minutes per side for medium rare"]
    }
]




let dbUsername = "cs5220stu01";
let dbPassword = "d1vhqzJfb6Ed";
let dbUrl = `mongodb://${dbUsername}:${dbPassword}@cs3.calstatela.edu:4042/${dbUsername}`;
let db;
let client;

/* Connect to MongoDB Server*/
async function ConnectDB() {
    // connect to mongodb 
    client = await MongoClient.connect(dbUrl, { useUnifiedTopology: true });
    // Switch to DB
    db = client.db("cs5220stu01");
    console.log("Connected correctly to server");

}

async function run() {

    let collection = await db.collection("recipes");
    collection.insertMany(Recieoiesdocs);

    await collection.createIndex({ name: "text", "Ingredients.Name": "text" });

    const cursor = await collection.find({ "$text": { "$search": ' "beef"  "potato" ' } }, { _id: 1, name: 1 })
    cursor.count(function (err, count) {
        console.log("Successfully found document (recipes) that use the ingredients 'beef' and 'potato' # " + count);
    });
    await cursor.forEach(function (myDoc) {

        console.log("id    " + myDoc._id + "  Name:  " + myDoc.Name);
    })

    const cursor2 = await collection.find({ $text: { $search: "Steak" } }, { _id: true, name: 1 });
    cursor2.count(function (err, count) {
        console.log("Successfully found document (recipes) whose names include the word 'Steak' # " + count);
    });
    await cursor2.forEach(function (myDoc) {
        console.log("id    " + myDoc._id + "  Name:  " + myDoc.Name);
    })



    client.close();
}
// main method that drop first then add collection
async function init() {

    await ConnectDB()
    await run();




}

// call the init method 
init()

