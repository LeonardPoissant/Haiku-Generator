"use strict";

const express = require("./node_modules/express");
const bodyParser = require("./node_modules/body-parser");
const morgan = require("./node_modules/morgan");
const http = require("http");
const path = require("path");
const _ = require("./node_modules/lodash");
const cors = require("cors");
const { identity } = require("lodash");

require("dotenv").config();

const { createHaikuDB, getRandomHaiku, getDbInfo, deleteVerses } = require(path.join(
  __dirname,
  "./haikuHandlers"
));

const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

let MongoClient = require('mongodb').MongoClient;
let db;
let app = express()


  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  app.use(morgan("tiny"))
  app.use(express.static("./server"))
  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: false }))
  app.use("/", express.static(__dirname + "../../client/build"))

  MongoClient.connect(uri, function(err, database) {
    if(err) throw err;
  
    db = database.db("Test")
  
    // Start the application after the database connection is ready
    app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
  });

  //Create/find a document and push new verses in the haikuArray.

  app.post("/createHaikus/:id",  async function (req, res){
    const {id} = req.params;
    const haikuDataBase = req.body;
    const haikuString = haikuDataBase.haikuArray;
    let haikuArray = [];

    haikuArray.push(haikuString);
    try {
       await db.collection(id)
        .updateOne(
          { haikuDataBaseName: id },
          { $push: { haikuArray: haikuString } },
          { upsert: true }
        );
      res.status(201).json({
        status: 201,
        _id: id,
        haikuDataBase: haikuDataBase,
      });
    } catch (err) {
      res.status(500).json({
        data: haikuDataBase,
        message: "Something went wrong",
        err: err,
      });
      console.log(err);
    }})

    //Get all the verses from a specific collection

  app.get("/dbInfo/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const dataBase = await db.collection(id).find().toArray();
      const dataBaseName = dataBase[0].haikuDataBaseName
      const haikuArray =dataBase[0].haikuArray
      res.status(201).json({
        status: 201,
        dataBaseName: dataBaseName,
        haikuArray: haikuArray,
      });
    } catch (err) {
      res.status(500).json({
        data: dataBaseArray,
        message: "Something went wrong",
        err,
      });
    }
  })


  //Get the randomzied  haiku from a specific collection.

  app.get("/db/randomHaiku/:id", async (req, res) =>{
  const { id } = req.params;
  try {
    const dataBaseArray =  await db.collection(id).find().toArray();
  
    const array = dataBaseArray[0].haikuArray
    const flattenedArray = [];
    array.forEach((verse) => {
        flattenedArray.push(verse);
    });

   let n = 3;
    function shuffle(verseArray) {
      for (let i = verseArray.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [verseArray[i - 1], verseArray[j]] = [verseArray[j], verseArray[i - 1]];
      }
    }
    const array_tmp = flattenedArray.slice(0);
    shuffle(array_tmp);
    const randomHaiku = array_tmp.slice(0, n);

    res.status(201).json({
      status: 201,
      dataBaseArray: randomHaiku,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
})

  //Delete selected verses from a specific document.

  app.delete("/db/delete/:id", async (req, res)=>{
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const { id } = req.params
  const data = req.body;
  console.log('DATA',data)
  const deletedArray = data[Object.keys(data)[0]]
  try {
    await client.connect();
    const db = client.db(id);
    const dataBase = await db.collection("Haiku").updateOne(
      { haikuDataBaseName: id },
      { $pull: { haikuArray: { $in: deletedArray } }},
      { upsert: true })
    res.status(200).json({
      status:200,
      message:"Items have been deleted"
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }

})

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
  })

