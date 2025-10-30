import React from 'react';
import { styled } from 'styled-components';
import WordInput from './WordInput';
import { ADD_WORDS_CONSTS } from '../../../utils/constants';
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalComp = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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

interface AddWordsModalProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentWords: string[];
  showWordsModal: boolean;
  wordsEditOnChange: (index: number, newWord: string) => void;
}

const Close = styled.button``;

export default function AddWordsModal({
  onClose,
  currentWords,
  showWordsModal,
  wordsEditOnChange,
}: AddWordsModalProps) {
  const inputs = currentWords.map((word, index) => {
    return (
      <WordInput
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
        <ModalComp id="add-words-modal">
          <h2>Double check the words you added!</h2>
          {inputs}
          <button onClick={onClose} name={ADD_WORDS_CONSTS.TEAMS}>
            Next Player
          </button>
        </ModalComp>
      </ModalOverlay>
    );
  }
}
