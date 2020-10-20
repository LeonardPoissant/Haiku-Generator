import React, { createContext, useState, useEffect } from "react";

import useRemoveSpace from "../Utils/RemoveSpaces";

export const HaikuContext = createContext(null);

const HaikuDataBaseProvider = ({ children }) => {
  const [haikuDataBaseName, setHaikuDataBaseName] = useState("");
  const [haikuArray, setHaikuArray] = useState([]);
  const [haikuDb, setHaikuDb] = useState({});
  const [urlTitle, setUrlTitle] = useRemoveSpace(haikuDataBaseName);
  const [alert, setAlert] = useState(false);

  const saveContent = (haikuDataBaseName) => {
    window.sessionStorage.setItem("haikuDataBaseName", haikuDataBaseName);
  };

  //MOVE THE USEFFECT BACK TO 2ND AND 3RD PAGE SO ON MAIN PAGE WE CAN CLEAR ON REFRESH.
  /*useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  });*/

  const onChange = (e) => {
    setHaikuDataBaseName(e);
    saveContent(e);
    setUrlTitle(e);
  };

  const handleCreateHaikuDatabase = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUrlTitle(urlTitle);

    console.log("ARRAY", typeof haikuArray);

    //https://toolzbox.herokuapp.com/createHaikus
    // https:murmuring-ravine-33143.herokuapp.com/createHaikus

    if (haikuArray.length >= 2) {
      fetch("https://murmuring-ravine-33143.herokuapp.com/createHaikus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          urlTitle,
          haikuArray,
        }),
      })
        .then((res) => res.json())
        .then((db) => {
          //setHaikuDataBaseName("");
          setHaikuArray([]);
          setHaikuDb(db);
        })
        .catch((err) => {
          console.log(err.data);
        });
    } else {
      setAlert(true);
    }
  };

  return (
    <HaikuContext.Provider
      value={{
        handleCreateHaikuDatabase,
        haikuDataBaseName,
        setHaikuDataBaseName,
        haikuArray,
        setHaikuArray,
        haikuDb,
        urlTitle,
        setUrlTitle,
        onChange,
        alert,
      }}
    >
      {children}
    </HaikuContext.Provider>
  );
};

export default HaikuDataBaseProvider;
