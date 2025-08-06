import { ReactNode } from "react";
import { styled } from "styled-components";
import {ToggleContainerProps} from "../../../types/index"

const ToggleContainerComp = styled.div`
  background-color: rgb(0, 204, 153, 0.8);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: inherit;
  margin: 0.5rem 1rem;
  border: 5px rgb(255, 204, 102) solid;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;

  & h2 {
    font-size: 1.2rem;
    margin: 0 auto;
    margin-bottom: 0.7rem;
  }

  & section {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }

  & button {
    appearance: none;
    border: none;
    width: 40%;
    padding: 1rem 0;
    border-radius: 1rem;
    background-color: #00b386;
    color: whitesmoke;
    font-size: 0.7rem;
    text-shadow: 1px 1px 1px black;
    font-weight: bold;
  }

  & span {
    background-color: #00b386;
    padding: 0.3em;
    height: 1.8rem;
    width: 1.8rem;
    justify-content: center;
    font-size: 1.5rem;
    border-radius: 100%;
    align-self: center;
  }
`;

export default function ToggleContainer({ children, id}:ToggleContainerProps) {
  return <ToggleContainerComp id={id}>{children}</ToggleContainerComp>;
}
