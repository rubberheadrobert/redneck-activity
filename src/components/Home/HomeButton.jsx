import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomeOption = styled.button`
  border: 1px black solid;
  border-radius: 1rem;
  flex-grow: 0;
  flex-shrink: 0;
  width: 12rem;
  height: 5rem;
  padding: 1rem;
  text-shadow: darkslategray 1px 2px;
  background-color: #ff6600;
  color: whitesmoke;
  align-self: center;
  font-family: Fantasy;
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  &:active {
    color: rgb(255, 255, 124);
    box-shadow: inset 0 0 20px 10px rgba(0, 0, 0, 0.455);
  }
  &:hover {
    transform: translateX(-5px) translateY(-5px);
  }
  & span {
    margin-left: 0.5rem;
  }
`;

/**
 * @param {{ text: string, faIcon: any }} props
 */

export default function HomeButton({ text, faIcon }) {
  return (
    <HomeOption>
      <FontAwesomeIcon icon={faIcon} />
      <span>{text}</span>
    </HomeOption>
  );
}
