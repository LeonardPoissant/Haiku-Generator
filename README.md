## Haiku-Generator

Haiku-Generator is a simple application created for a client using a MERN stack.

<a href="https://gyazo.com/d599404299d046733074e184bc96385b"><img src="https://i.gyazo.com/d599404299d046733074e184bc96385b.gif" alt="Image from Gyazo" width="576"/></a>

The requierements were to make a generator where users could create their own database, generate 3 random lines and have the ability to manage their data following this design:

![Alt text](client/public/FIGMA.png)

The app needed to be accessible to anyone who wanted to play around with it, so I made the API public, instructions are below. fd

That version of the app is available here: https://toolzbox.herokuapp.com/

I couldn't sell my UI ideas :( , so while keeping the design simple, I added some functionalities for smoother mobile and desktop experiences.

<a href="https://gyazo.com/aa924c42306c0b3979fc0208ec7fa0e9"><img src="https://i.gyazo.com/aa924c42306c0b3979fc0208ec7fa0e9.gif" alt="Image from Gyazo" width="760"/></a>

<a href="https://gyazo.com/26ba27a78589053d60f164169277e2cf"><img src="https://i.gyazo.com/26ba27a78589053d60f164169277e2cf.gif" alt="Image from Gyazo" width="760"/></a>

<a href="https://gyazo.com/eb4dbac498e57589c842ef39cdb1034e"><img src="https://i.gyazo.com/eb4dbac498e57589c842ef39cdb1034e.gif" alt="Image from Gyazo" width="1000"/></a>

## Running the app

## Fetching from the API

The API works as follow:

POST: https://toolzbox.herokuapp.com/createHaikus

POST is used to send data to the server and then to create/update the data base in MongoDB.

```java
fetch("https://toolzbox.herokuapp.com/createHaikus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          dataBaseTitle,
          verse,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          console.log(db);
        })
```

GET: https://toolzbox.herokuapp.com/randomHaiku/:id

returns 3 random verses from a specific database.  
Example:

```java
fetch("https://toolzbox.herokuapp.com/randomHaiku/MyAwesomeHaikus")
      .then((res) => res.json())
      .then((randomHaiku) => {
        console.log(randomHaiku)
      });
```

```java
{
  "status": 201,
  "dataBaseArray": [
    "Donohue papers",
    "University of Chicago",
    "hot hand fallacy"
  ]
}
```

GET: https://toolzbox.herokuapp.com/dbInfo/:id

Returns all the information from a specific database.  
Example:

```java
fetch(`https://toolzbox.herokuapp.com/dbInfo/${MyAwesomeHaiku}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
```

```java
{
  "status": 201,
  "dataBaseArray": [
    {
      "_id": "5f7ee58d58463b0a95c0cee0",
      "haikuDataBaseName": "MyAwesomeHaiku",
      "haikuArray": [
        "hot hand fallacy",
        "University of Chicago",
        "Donohue papers",
        "sdf"
      ]
    }
  ]
}
```

DELETE: https://toolzbox.herokuapp.com/delete/:id

Deletes selected verses.  
Example:

```java
fetch(`https://toolzbox.herokuapp.com/delete/${MyAwesomeHaiku}`,
{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          deletedArray,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          console.log(db)
        })
```

```java

{
  "status": 200
  "message": "Items have been deleted"
}
```
