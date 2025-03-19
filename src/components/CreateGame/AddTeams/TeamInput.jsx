import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Input = styled.input`
  width: 75%;
  margin: 0.5rem auto;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  outline: none;
  padding-bottom: 0.5rem;
  font-family: inherit;
`;
export default function TeamInput({ teamNum, teamNameOnChange }) {
  const [input, setInput] = useState(`Team ${teamNum}`);

  useEffect(() => {
    const timeOutId = setTimeout(
      () => teamNameOnChange(teamNum - 1, input),
      500
    );

    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <Input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}