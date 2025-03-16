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
  color: whitesmoke; !important;
  width: 4rem;
  height: 3rem;
  margin: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
`;
export default function NextPrevButtons({ prev, next, buttonOnClick }) {
  return (
    <Container>
      {prev !== "home" ? (
        <>
          <StyledButton onClick={buttonOnClick} name={prev}>
            <FontAwesomeIcon icon="angles-left" />
          </StyledButton>
          <StyledButton onClick={buttonOnClick} name={next}>
            <FontAwesomeIcon icon="angles-right" />
          </StyledButton>
        </>
      ) : (
        <>
          <StyledNavLink to="/">
            <StyledButton>
              <FontAwesomeIcon icon="angles-left" />
            </StyledButton>
          </StyledNavLink>
          {next !== "no-next" && (
            <StyledButton onClick={buttonOnClick} name={next}>
              <FontAwesomeIcon icon="angles-right" />
            </StyledButton>
          )}
        </>
      )}
    </Container>
  );
}
