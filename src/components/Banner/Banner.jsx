import "./Banner.css";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";

const StyledBanner = styled.div`
  display: inline-block;
  color: whitesmoke;
  padding: 1rem;
  background-color: rgb(0, 43, 128, 0.5);
  font-size: 2rem;
  border-radius: 1rem;
`;

export default function Banner() {
  return <StyledBanner>Redneck Activity</StyledBanner>;
}
