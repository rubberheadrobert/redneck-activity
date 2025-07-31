import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import NextPrevButtons from "../../UI/NextPrevButtons/NextPrevButtons";
import img from "../../../images/purple-paper.avif";
import Container from "../../UI/Container/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddWordsModal from "./AddWordsModal";
import {ROUTES} from "../../../utils/routes"
import {ADD_WORDS_CONSTS} from "../../../utils/constants"

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  button {
    background-color: rgb(130, 54, 214, 0.8);
    color: whitesmoke;
    font-size: 1.5rem;
    width: 80%;
    height: 5rem;
    margin: 0.5rem;
    border: 3px solid whitesmoke;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: inherit;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const LoadingContainer = styled.div`
  height: 1.5rem;
  width: 2rem;
  margin: 0.3rem auto;
`;

const CurrentWordInput = styled.input`
  font-size: 1rem;
  width: 80%;
  height: 35%
  border: 3px white solid;
  border-radius: 0.5rem;
  font-family: inherit;
  padding: 0.5rem;
  text-align: center;
`;

const WordArea = styled.div`
  background-color: rgb(130, 54, 214, 0.8);
  border-radius: 0.5rem;
  border: 5px solid whitesmoke;

  h2 {
    font-size: 1.1rem;
    box-shadow: 0 0 10px whitesmoke;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin: 0.3em auto;
    display: inline-block;
  }

  p {
    font-size: 0.8rem;
  }
`;

export default function AddWords({
  wordsAmount,
  players,
  playersAmount,
  handleCreateGameSettings,
  wordsOnChange,
  wordsEditOnChange,
}) {
  const [currentWord, setCurrentWord] = useState("");
  const [currentDisplayedWords, setCurrentDisplayedWords] = useState([]);
  const [canAddWords, setCanAddWords] = useState(true);
  const [currentWordsLeft, setCurrentWordsLeft] = useState(wordsAmount);
  const [isLastPlayer, setIsLastPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentPlayer = useRef(1);
  const currentWordIndex = useRef(0);
  const maxDisplayedWordIndex = useRef(wordsAmount - 1);

  //to display which player needs to add words
  const currentPlayerObj = players[currentPlayer.current - 1];

  console.log(currentPlayer.current);
  console.log(currentWordIndex.current);
  console.log(maxDisplayedWordIndex.current);

  useEffect(() => {});

  //fetch random word
  async function handleFetchRandomWord() {
    try {
      setIsLoading(true);
      const response = await fetch(
        
      );
      const data = await response.json();
      const word = data[0];
      setCurrentWord(word);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  }

  function handleAddWord() {
    if (currentWordIndex.current < maxDisplayedWordIndex.current) {
      const newWords = [...currentDisplayedWords];
      newWords[currentWordIndex.current] = currentWord;
      setCurrentDisplayedWords(newWords);
      setCurrentWordsLeft(currentWordsLeft - 1);
      setCurrentWord("");
    } else if (currentWordIndex.current == maxDisplayedWordIndex.current) {
      const newWords = [...currentDisplayedWords];
      newWords[currentWordIndex.current] = currentWord;
      setCurrentDisplayedWords(newWords);
      setCanAddWords(false);
      setCurrentWord("");
    }
    setCurrentWordsLeft(currentWordsLeft - 1);
    currentWordIndex.current = currentWordIndex.current + 1;
  }

  function handleNextPlayer(event) {
    wordsOnChange(currentDisplayedWords);

    if (isLastPlayer) {
      let existingWords = JSON.parse(localStorage.getItem(ADD_WORDS_CONSTS.WORDS)) || [];

      existingWords.push(currentDisplayedWords);
      let mergedWords = existingWords.concat(currentDisplayedWords);
      localStorage.setItem(ADD_WORDS_CONSTS.WORDS, JSON.stringify(mergedWords));
      handleCreateGameSettings(event);
      return;
    }
    currentPlayer.current = currentPlayer.current + 1;

    setCanAddWords(true);
    setCurrentDisplayedWords([]);
    currentWordIndex.current = 0;
    setCurrentWordsLeft(wordsAmount);
    if (currentPlayer.current == playersAmount) {
      setIsLastPlayer(true);
    }
  }

  const content = currentDisplayedWords.map((word) => {
    return <div>{word}</div>;
  });

  return (
    <Container backgroundImage={img} secondColor={"#8236d6"}>
      <h1>Add Words</h1>
      <WordArea>
        <h2> {currentPlayerObj.name}</h2>
        <p>please add {currentWordsLeft} more words</p>
        <CurrentWordInput
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder
          disabled={isLoading}
        />
        <LoadingContainer>
          {isLoading && <FontAwesomeIcon icon="spinner" spin />}
        </LoadingContainer>
      </WordArea>

      <ButtonContainer>
        <button onClick={handleAddWord} disabled={!canAddWords || isLoading}>
          Add Word
        </button>
        {/* <button name="words" onClick={handleNextPlayer}>
          {isLastPlayer ? "Next" : "Next Player"}
        </button> */}
        <button onClick={handleFetchRandomWord} disabled={isLoading}>
          Random Word
        </button>
      </ButtonContainer>
      <NextPrevButtons
        prev={ROUTES.PLAYERS}
        next={ROUTES.TEAMS}
        buttonOnClick={handleCreateGameSettings}
      />
      {!canAddWords && (
        <AddWordsModal
          currentWords={currentDisplayedWords}
          wordsEditOnChange={wordsEditOnChange}
          onClose={handleNextPlayer}
        />
      )}
    </Container>
  );
}
