import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Draggable from "react-draggable";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

import Button from "@material-ui/core/Button";

const HaikuGenerator = (props) => {
  const { urlTitle } = useContext(
    HaikuContext
  );
  const [generatedHaiku, setGeneratedHaiku] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [isTrue, setTrue] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (isTrue) {
      history.push(`/HaikuGenerator/${urlTitle}`);
    }
  }, [isTrue]);

  useEffect(() => {
    fetch(`https://murmuring-ravine-33143.herokuapp.com/randomHaiku/${urlTitle}`)
      .then((res) => res.json())
      .then((randomHaiku) => {
        setGeneratedHaiku(randomHaiku.dataBaseArray);
        setAnimating(true);
      });
    setAnimating(false);
  }, []);

  const generateNewHaiku = async (e) => {
    console.log("GENERATE");
    fetch(`https://murmuring-ravine-33143.herokuapp.com/randomHaiku/${urlTitle}`)
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
            <div>
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
       </div>
          </HaikuWrapper>
          <GenerateWrapper>
            <Button variant="contained" color="primary" onClick={(e) => generateNewHaiku(e)}> Generate Haiku</Button>
        </GenerateWrapper>
      </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 812px) {
    overflow: hidden;
  }
`;
const HaikuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:200px;
  padding: 70px;
  @media screen and (max-width: 812px) {
    width: 100%;
  }
`;
const DraggableDiv = styled.div`
  display: flex;
  animation: myanimation 4s infinite;
@keyframes myanimation{
  0%{color:teal}
  25%{color:white}
  50%{color:teal}
  75%{color:white}
  100%{color:teal}
}
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
  flex-flow: nowrap;
 padding-bottom:150px;
`;

export default HaikuGenerator;
