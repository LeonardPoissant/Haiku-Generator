import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import homeCircle from "@iconify/icons-mdi/home-circle";

const Footer = () => {
  return (
    <Wrapper className="CLASSS">
      <Link to={"/"}>
      <Icon icon={homeCircle} color="#ff5c33" width="2em" height="3em" />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
position:relative;
overflow:hidden;
bottom:0;
left:46.2%;
@media screen and (min-width: 812px) {
    display: none;
  }
  
`;

export default Footer;
