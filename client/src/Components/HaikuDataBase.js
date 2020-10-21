import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Draggable from "react-draggable";
import { useHistory } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import HaikuGenerator from "./HaikuGenerator";
import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

import Button from "@material-ui/core/Button";

const CreateHaikuDatabase = () => {
  const {
    handleCreateHaikuDatabase,
    haikuDataBaseName,
    setHaikuDataBaseName,
    haikuArray,
    setHaikuArray,
    urlTitle,
  } = useContext(HaikuContext);

  let history = useHistory();

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [active, setActive] = useState(false);
  const [isTrue, setTrue] = useState(false);

  const [isMoving, setIsmoving] = useState(false);
  const nodeRef = React.useRef(null);



  useEffect(() => {
    setHaikuDataBaseName(sessionStorage.getItem("haikuDataBaseName"));
  }, []);

  useEffect(() => {
    if (isTrue) {
      history.push(`/Generate/${urlTitle}`);
    }
  }, [isTrue]);

  const handleStart = (e, data) => {
    console.log(data.y);
    if (data.y < -75) {
      setTrue(true);
      console.log(isTrue);
      return;
    }
  };

  const handleStop = (e, data) => {
    if (data.y > 125) {
    }
  };

  return (
    <Wrapper>
      <MobileHeader className='W000TTTTTTTT'>
      <ToDataBase to={`/ManageDb/${urlTitle}`}>
      <DbName>{haikuDataBaseName}</DbName>
      </ToDataBase>
      </MobileHeader>
      <Instructions>Click on your database's name to edit it</Instructions>
      <HaikuDataBaseForm onSubmit={(e) => handleCreateHaikuDatabase(e)}>
        <InputsWrapper>
          <VerseWrapper>
            <VerseInput
              type="text"
              placeholder="type in a verse"
              value={haikuArray}
              minLength="2"
              maxLength="28"
              onChange={(e) => setHaikuArray(e.target.value)}
            ></VerseInput>
          </VerseWrapper>
        </InputsWrapper>
        <Instructions>
          Verses should be between 2 and 28 characters long.. Submit at least 3
          different verses. Swipe the arrow up to generate a haiku.
        </Instructions>
        <Button type="submit" variant="contained" color="primary" >Submit Verse</Button>
        
      </HaikuDataBaseForm>
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
            <ExpandLessIcon
              className="handle"
              fontSize="large"
            ></ExpandLessIcon>
          </div>
        </Draggable>
      </DraggableDiv>
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
  ${({ active }) =>
    active &&
    `
    display: "none";
    background: rgb(242, 242, 242);
   
  `};
`;



const DbName = styled.div`
  font-size: 25px;
`;

const HaikuDataBaseForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 300px;
  margin-top:90px;
`;

const InputsWrapper = styled.div`
  display: flex;
  padding: 10px;
`;

const VerseWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VerseInput = styled.input`
  padding: 5px;
  margin: 5px;
  width: 400px;
  text-align: center;
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size:16px;
`;

const Instructions = styled.div`
  padding-left: 25px;
  
  color: rgb(204, 204, 204);
  @media screen and (max-width: 812px) {
    width: 100vw;
  }
`;

const SubmitHaikuDbButton = styled.button`
 
  border: none;
  outline: none;
  background-color: white;
  text-decoration: underline;
  font-size: 25px;
  :hover {
    cursor: pointer;
  }
`;

const DraggableDiv = styled.div`


margin-top:100px;
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


const ToDataBase = styled(Link)`
  color: black;
  text-decoration: underline;
  top:0;
`;
const MobileHeader = styled.div`
@media screen and (min-width: 812px) {
    display: none;
  }`;


export default CreateHaikuDatabase;
