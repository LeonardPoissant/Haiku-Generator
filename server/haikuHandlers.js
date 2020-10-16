const { forEach, random } = require("lodash");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

// createHaikuDB creates a data base and a document, where the array of haikus is stored, in MongoDB.

// If the data base name is already created we just updtade the document.

const createHaikuDB = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const haikuDataBase = req.body;
  const haikuDataBaseName = haikuDataBase.urlTitle;
  const haikuString = haikuDataBase.haikuArray;
  let haikuArray = [];
  haikuArray.push(haikuString);

  try {
    await client.connect();
    const db = client.db(haikuDataBaseName);
    const createDB = await db
      .collection("Haiku")
      .updateOne(
        { haikuDataBaseName: haikuDataBaseName },
        { $push: { haikuArray: haikuString } },
        { upsert: true }
      );
    client.close();
    res.status(201).json({
      status: 201,
      _id: haikuDataBaseName,
      haikuDataBase: haikuDataBase,
    });
  } catch (err) {
    res.status(500).json({
      data: haikuDataBase,
      message: "Something went wrong",
      err: err,
    });
    console.log(err);
  }
};

// We connect to the right DB using params and send back 3 verses from the haiku array.

const getRandomHaiku = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const { id } = req.params;

  console.log({ id });
  try {
    await client.connect();
    const db = client.db(id);
    const dataBaseArray = await db.collection("Haiku").find().toArray();

    const flattenedArray = [];
    dataBaseArray.forEach((haikuArray) => {
      haikuArray.haikuArray.forEach((array) => {
        flattenedArray.push(array);
      });
    });

    var n = 3;
    function shuffle(a) {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
    }
    array_tmp = flattenedArray.slice(0);
    shuffle(array_tmp);
    const randomHaiku = array_tmp.slice(0, n);

    res.status(201).json({
      status: 201,
      dataBaseArray: randomHaiku,
    });
  } catch (err) {
    res.status(500).json({
      data: randomHaiku,
      message: "Something went wrong",
      err,
    });
  }
};

const getDbInfo = async (req, res) => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db(id);
    const dataBase = await db.collection("Haiku").find().toArray();
    console.log(dataBase[0].haikuDataBaseName)
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
};

const deleteVerses = async (req, res)=>{
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  const data = req.body;

  console.log(data)
  const id = data.urlTitle
  const deletedArray = data.deletedArray
  try {
    await client.connect();
    const db = client.db(id);
    const dataBase = await db.collection("Haiku").updateOne(
      { haikuDataBaseName: id },
      { $pull: { haikuArray: { $in: deletedArray } }},
      { upsert: true }
      )
   
    /*const myHaikuArray = dataBase[0].haikuArray
    console.log("MY ArRAY", deletedArray)
  const myNewArray = myHaikuArray.filter(val => !deletedArray.includes(val));

  console.log("MY ArRAY", myNewArray)*/

  console.log('DBASE',dataBase)
  
    
    res.status(201).json({
      status: 201,
      dataBase:dataBase,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }

}

module.exports = {
  createHaikuDB,
  getRandomHaiku,
  getDbInfo,
  deleteVerses
};
