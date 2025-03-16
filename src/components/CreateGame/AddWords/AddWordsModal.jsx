import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import WordInput from "./WordInput";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalComp = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: rgb(130, 54, 214);
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  border: 0.4rem solid whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    margin: 0 0 1rem 0;
  }
  button {
    style: none;
    height: 3rem;
    width: 50%;
    align-self: center;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 1.1rem;
  }
`;

const Close = styled.button``;

export default function AddWordsModal({
  onClose,
  currentWords,
  showWordsModal,
  wordsEditOnChange,
}) {
  const inputs = currentWords.map((word, index) => {
    return (
      <WordInput
        type="text"
        key={index}
        name={`word${index + 1}`}
        index={index}
        wordsEditOnChange={wordsEditOnChange}
        word={word}
      />
    );
  });

  if (showWordsModal === false) {
    return null;
  } else {
    return (
      <ModalOverlay>
        <ModalComp>
          <h2>Double check the words you added!</h2>
          {inputs}
          <Close onClick={onClose} name="teams">
            Next Player
          </Close>
        </ModalComp>
      </ModalOverlay>
    );
  }
}
