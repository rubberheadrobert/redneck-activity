import Banner from "../Banner/Banner";
import { styled } from "styled-components";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import img from "../../images/paper-background-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../UI/Container/Container";

import HomeButton from "./HomeButton";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

export default function Home() {
  return (
    <Container backgroundImage={img}>
      <Banner className="flex-item" />
      <StyledNavLink to="/find-game" className="nav-link">
        <HomeButton text="Find Game" faIcon="search" />
      </StyledNavLink>
      <StyledNavLink to="/create-game" className="nav-link">
        <HomeButton text="Create Game" faIcon="plus"></HomeButton>
      </StyledNavLink>
      <StyledNavLink to="/options" className="nav-link">
        <HomeButton text="Options" faIcon="gear"></HomeButton>
      </StyledNavLink>
    </Container>
  );
}
