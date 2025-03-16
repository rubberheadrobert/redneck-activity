import { useEffect, useState } from "react";

export default function PlayerInput({
  teamNum,
  className,
  readOnly,
  teamNamesOnChange,
}) {
  const [input, setInput] = useState(`team${teamNum}`);

  useEffect(() => {
    const timeOutId = setTimeout(
      () => teamNamesOnChange(teamNum - 1, `team${teamNum}`, input),
      500
    );

    return () => clearTimeout(timeOutId);
  }, [input]);

  return (
    <input
      type="text"
      readOnly={readOnly}
      value={input}
      className={className}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
