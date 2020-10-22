import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { HaikuContext } from "../HaikuContext/HaikuDataBaseContext";

const Header = () => {
  const { haikuDataBaseName } = useContext(HaikuContext);
  const location = useLocation();

  return (
    <Wrapper className='MYSTERYDIV'>
      {location.pathname === `/HaikuGenerator/${haikuDataBaseName}` ? (
        <>
        <div className='MYSTERYDIV'></div>
          <ChangePageWrapper to={"/"}>
            <ArrowBackIcon />
            <LinkTo>Home</LinkTo>
          </ChangePageWrapper>
          <ChangePageWrapper to={`/Generate/${haikuDataBaseName}`}>
            <LinkTo>Generator</LinkTo>
            <ArrowForwardIcon />
          </ChangePageWrapper>
          <div></div>
        </>
      ) : location.pathname === `/Generate/${haikuDataBaseName}`? (
        <>
        <div className='MYSTERYDIV'></div>
          <ChangePageWrapper to={`/HaikuGenerator/${haikuDataBaseName}`}>
            <ArrowBackIcon />
            <LinkTo>Add more verses</LinkTo>
          </ChangePageWrapper>
          <ChangePageWrapper to={"/"}>
            <LinkTo>Home</LinkTo>
            <ArrowForwardIcon />
          </ChangePageWrapper>
          <div></div>
        </>
      ) : location.pathname === `/` ? (
        <MobileTitle>Haiku Generator</MobileTitle>
      ) :  location.pathname === `/ManageDb/${haikuDataBaseName}`? (
        <>
        <div></div>
          <ChangePageWrapper to={`/HaikuGenerator/${haikuDataBaseName}`}>
            <ArrowBackIcon />
            <LinkTo>Add more verses</LinkTo>
          </ChangePageWrapper>
          <ChangePageWrapper to={`/Generate/${haikuDataBaseName}`}>
            <LinkTo>Generator</LinkTo>
            <ArrowForwardIcon />
          </ChangePageWrapper>
          <div></div>
        </>
        ): (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 812px) {
    display: none;
  }
`;
const ChangePageWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
`;
const LinkTo = styled.div`
`;
const MobileTitle = styled.h1`
@media screen and (max-width: 812px) {
    display: inline;
  }
`;


export default Header;
