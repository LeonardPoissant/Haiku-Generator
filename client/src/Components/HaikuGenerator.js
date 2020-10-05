import React, { useState, useEffect, useContext } from "react";

import styled, { keyframes } from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const HaikuGenerator = () => {
  const { urlTitle, setHaikuDataBaseName, setUrlTitle } = useContext(
    HaikuContext
  );
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  const [animating, setAnimating] = useState(false);

  //https://toolzbox.herokuapp.com/allHaikus/${haikuDb._id}

  /* useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  }, []);*/

  useEffect(() => {
    async function fetchDbNames() {
      const UserDbName = await setHaikuDataBaseName(
        sessionStorage.getItem("haikuDataBaseName")
      );
      const MongoDbName = await setUrlTitle(
        sessionStorage.getItem("haikuDataBaseName")
      );
    }
    fetchDbNames();

    fetch(`/allHaikus/${urlTitle}`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  }, [urlTitle]);

  const generateNewHaiku = async (e) => {
    fetch(`/allHaikus/${urlTitle}`, {
      mode: "cors",
    })
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  };

  return (
    <>
      <HaikuWrapper>
        <HaikuDisplay>
          {animating ? (
            generatedHaiku.map((verse, index) => {
              return (
                <HaikuVerse
                  key={index}
                  style={{
                    animationDuration:
                      index === 1 ? "3s" : index === 2 ? "4s" : "2s",
                  }}
                >
                  {verse}
                </HaikuVerse>
              );
            })
          ) : (
            <> </>
          )}
        </HaikuDisplay>
      </HaikuWrapper>
      <GenerateWrapper>
        <Generate onClick={(e) => generateNewHaiku(e)}>Generate Haiku</Generate>
      </GenerateWrapper>
    </>
  );
};

const HaikuWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;

const HaikuDisplay = styled.div`
  padding: 70px;
`;

const verseKeyFrames = keyframes`
0% {
  opacity:0;
  display:none;
}
30% {
  opacity:0;
  display:none;
}
50% {
  opacity:0,5;
}
100%{
  opacity:1;
}
`;

const HaikuVerse = styled.div`
  padding: 5px;
  width: 100%;
  animation: ${verseKeyFrames} ease-in;
`;

const GenerateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Generate = styled.button`
  position: absolute;
  padding: 10px;
  border: none;
  outline: none;
  background-color: white;
  text-decoration: underline;
  font-size: 25px;
  :hover {
    cursor: pointer;
  }
`;

export default HaikuGenerator;
