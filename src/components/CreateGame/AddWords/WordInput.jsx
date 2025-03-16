import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Input = styled.input`
  font-size: 1.5rem;
  text-align: center;
  font-family: inherit;
  border-radius: 0.5rem;
`;

export default function WordInput({ index, wordsEditOnChange, word }) {
  const [input, setInput] = useState(word);

  useEffect(() => {
    const timeOutId = setTimeout(() => wordsEditOnChange(index, input), 500);

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
