import { useEffect, useState } from 'react';
import { PlayerInputProps } from '../../../../types/index';

export default function PlayerInput({
  key,
  startValue,
  index,
  addToPlayers,
  placeholder,
  name,
}: PlayerInputProps) {
  const [input, setInput] = useState(startValue || '');

  useEffect(() => {
    const timeOutId = setTimeout(() => addToPlayers(index, input), 500);
    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <input
      key={key}
      type='text'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
    />
  );
}
