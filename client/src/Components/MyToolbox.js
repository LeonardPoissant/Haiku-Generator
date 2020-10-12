import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";
import Header from "./Header";

const ToolBox = () => {
  const { haikuDataBaseName, urlTitle, onChange } = useContext(HaikuContext);

  return (
    <div>
      <ToolsWrapper>
        <h1>Haiku Generator</h1>
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
        <Start
          to={`/HaikuGenerator/${urlTitle}`}
          style={
            haikuDataBaseName === null
              ? { pointerEvents: "none" }
              : { pointerEvents: "visible" }
          }
        >
          <div>Start</div>
        </Start>
        <div></div>
        <About to={"/About"}>About</About>
      </ToolsWrapper>
    </div>
  );
};

const ToolsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
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
`;

const GuideLine = styled.div`
  padding-top: 10px;
  color: rgb(204, 204, 204);
`;

const Start = styled(Link)`
  display: flex;
  align-items: stretch;
  justify-content: center;
  color: black;
  text-decoration: underline;
  font-size: 25px;
`;

const About = styled(Link)`
  color: black;
  text-decoration: underline;
  font-size: 15px;
`;
export default ToolBox;
