import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Draggable from "react-draggable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

import CreateHaikuDatabase from "./HaikuDataBase";

const HaikuGenerator = (props) => {
  const { urlTitle, setHaikuDataBaseName, setUrlTitle } = useContext(
    HaikuContext
  );
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [isTrue, setTrue] = useState(false);
  const nodeRef2 = React.useRef(null);
  let history = useHistory();

  const showDiv = props.isTrue;

  console.log("PROPS", showDiv);

  //https://toolzbox.herokuapp.com/allHaikus/${haikuDb._id}

  /* useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  }, []);*/
  useEffect(() => {
    if (isTrue) {
      history.push(`/HaikuGenerator/${urlTitle}`);
    }
  }, [isTrue]);

  useEffect(() => {
    /*async function fetchDbNames() {
      const UserDbName = await setHaikuDataBaseName(
        sessionStorage.getItem("haikuDataBaseName")
      );
      const MongoDbName = await setUrlTitle(
        sessionStorage.getItem("haikuDataBaseName")
      );
    }
    fetchDbNames();*/

    //murmuring-ravine-33143.herokuapp.com/createHaikus

    fetch(`https://murmuring-ravine-33143.herokuapp.com/allHaikus/${urlTitle}`)
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  }, []);

  const generateNewHaiku = async (e) => {
    console.log("GENERATE");
    fetch(`https://murmuring-ravine-33143.herokuapp.com/allHaikus/${urlTitle}`)
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  };
  const handleStart = (e, data) => {
    console.log(data.y);
    if (data.y > 125) {
      setTrue(true);
    }
  };

  return (
    <Wrapper>
      <>
        <DraggableDiv>
          <Draggable
            axis="y"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
            onStart={handleStart}
            onDrag={handleStart}
          >
            <div>
              <ExpandMoreIcon
                className="handle"
                fontSize="large"
              ></ExpandMoreIcon>
            </div>
          </Draggable>
        </DraggableDiv>

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
          <Generate onClick={(e) => generateNewHaiku(e)}>
            Generate Haiku
          </Generate>
        </GenerateWrapper>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HaikuWrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 812px) {
    width: 100%;
  }
`;

const HaikuDisplay = styled.div`
  padding: 70px;
`;

const DraggableDiv = styled.div`
  @media screen and (min-width: 812px) {
    display: none;
  }
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
