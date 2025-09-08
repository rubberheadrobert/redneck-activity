import { queryAllByLabelText } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const Input = styled.input`
  font-size: 1rem;
  text-align: center;
  font-family: inherit;
  border-radius: 0.5rem;
  width: 65%;
  align-self: center;
`;

export default function WordInput({ index, label, wordsEditOnChange, word }) {
  const [input, setInput] = useState(word);

  useEffect(() => {
    const timeOutId = setTimeout(() => wordsEditOnChange(index, input), 500);

    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <Input
      type='text'
      value={input}
      aria-label={label}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
