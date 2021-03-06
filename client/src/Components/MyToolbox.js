import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";
import Button from "@material-ui/core/Button";

const ToolBox = () => {
  const { haikuDataBaseName, onChange } = useContext(HaikuContext);

  return (
    <div>
      <ToolsWrapper>
        <Wrapper>
          <DbName
            type="text"
            placeholder="Choose your haiku data base name"
            value={haikuDataBaseName}
            onChange={(e) => onChange(e.target.value)}
          ></DbName>
          <GuideLine>
            You can create a new data-base or use an existing one you have been
            using until now.
          </GuideLine>
        </Wrapper>
        <Button variant="contained" color="primary">
          <Start
            to={`/HaikuGenerator/${haikuDataBaseName}`}
            style={
              haikuDataBaseName === null || haikuDataBaseName.length === 0
                ? { pointerEvents: "none" }
                : { pointerEvents: "visible" }
            }
          >
            Enter
          </Start>
        </Button>
        <div></div>
      </ToolsWrapper>
    </div>
  );
};

const ToolsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DbName = styled.input`
  width: 300px;
  text-align: center;
  height: 20px;
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-bottom: 4px;
  font-size:16px;
`;
const GuideLine = styled.div`
  padding-top: 25px;
  color: rgb(204, 204, 204);
`;
const Start = styled(Link)`
  display: flex;
  align-items: stretch;
  justify-content: center;
  text-decoration: none;
  color:white;
  font-size: 20px;
`;


export default ToolBox;
