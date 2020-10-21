import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Draggable from "react-draggable";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Button from "@material-ui/core/Button";
import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";



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
  const [isTrue, setTrue] = useState(false);

  



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
    
      <ToDataBase to={`/ManageDb/${urlTitle}`}>
      <DbName>{haikuDataBaseName}</DbName>
      </ToDataBase>
    
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
          different verses.
          <MobileInstructions>Swipe the arrow up to generate a haiku.</MobileInstructions>
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
const MobileInstructions = styled.div`
@media screen and (min-width: 812px) {
    display: none;
  };
`;
const ToDataBase = styled(Link)`
  color: black;
  text-decoration:none;
`;
const MobileHeader = styled.div`
@media screen and (min-width: 812px) {
    display: none;
  }`;


export default CreateHaikuDatabase;
