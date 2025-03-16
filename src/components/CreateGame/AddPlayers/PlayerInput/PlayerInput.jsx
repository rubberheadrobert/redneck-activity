import { useEffect, useState } from "react";

export default function PlayerInput({
  addToPlayers,
  index,
  placeholder,
  startValue,
}) {
  const [input, setInput] = useState(startValue || "");

  useEffect(() => {
    const timeOutId = setTimeout(() => addToPlayers(index, input), 500);
    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
    />
  );
}
