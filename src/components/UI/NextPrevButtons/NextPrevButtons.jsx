import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &: hover;
  &:focus,
  &:active {
    text-decoration: none;
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  font-size: 2rem;
  color: whitesmoke !important;
  width: 4rem;
  height: 3rem;
  margin: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0; 
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 1.5em; 
  height: 1.5em;
  pointer-events: none;
`;

const StyledButtonDisabled = styled.button`
  background-color: transparent;
  font-size: 2rem;
  color: whitesmoke; !important;
  width: 4rem;
  height: 3rem;
  margin: 0.5rem;
  border: none;
  border-radius: 0.2rem;
   cursor: ${({ isClickable }) => (isClickable ? "pointer" : "not-allowed")};
  opacity: ${({ isClickable }) => (isClickable ? 1 : 0.5)};
  pointer-events: ${({ isClickable }) => (isClickable ? "auto" : "none")};
`;
export default function NextPrevButtons({ prev, next, buttonOnClick, isClickable = true}) {
  return (
    <Container>
      {prev !== "home" ? (
        // this is if the previous page is not the home page
        <>
          <StyledButton onClick={buttonOnClick} name={prev}>
            <StyledIcon icon="angles-left" />
          </StyledButton>
          <StyledButton onClick={isClickable ? buttonOnClick : undefined} name={next} isClickable={isClickable}>
            <StyledIcon icon="angles-right" />
          </StyledButton>
        </>
      ) : (
        <>
        {/*  this is if the previous page is the home page*/}
          <StyledNavLink to="/">
            <StyledButton>
              <StyledIcon icon="angles-left"/>
            </StyledButton>
          </StyledNavLink>
          {next !== "no-next" && !isClickable &&(
            // this is if a setting is making the next page unavailable
            <StyledButtonDisabled onClick={isClickable ? buttonOnClick : undefined} name={next} isClickable={isClickable}>
              <StyledIcon icon="angles-right" />
            </StyledButtonDisabled>
          )}
          {next !== "no-next" && isClickable &&(
            
            <StyledButton onClick={buttonOnClick} name={next}>
              <StyledIcon icon="angles-right" />
            </StyledButton>
          )}
        </>
      )}
    </Container>
  );
}
