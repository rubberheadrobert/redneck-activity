import Modal from "./Modal/Modal";
import StartRoundModal from "./StartRoundModal/StartRoundModal";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowScoreModal from "./ShowScoreModal/ShowScoreModal";
import {GameProps, GameWord} from "../../types/index"
import styled from "styled-components";
import FinishGameModal from "./FinishGameModal/FinishGameModal";


export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* center everything vertically */
  width: 100%;
  height: 100%;
   min-height: 100vh; 
  margin: 0;
  padding: 0;
  background: rgb(66, 113, 136);
  color: whitesmoke;
  gap: 1rem; /* adds consistent spacing between items */
`;

export const GameTopIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding: 0rem;
  margin-top: 0.5rem;
  font-size: 1.5rem;
`;

export const GameIconContainer = styled.div`
  background-color: rgb(131, 173, 194);
  padding: 2.5rem;
  border-radius: 5rem;
  box-sizing: border-box;
  height: 150px;
  width: 150px;
  text-align: center;
`;

export const IconText = styled.div`
  font-size: 1rem;
  padding: 0;
  margin: 0;
  font-weight: 700;
  white-space: nowrap;
`;

export const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: rgb(78, 132, 159);
`;

export const WordContainer = styled.div`
  font-size: 20px;
  background-color: rgb(204, 192, 59);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: whitesmoke;
  z-index: 0;
`;

export const RandomWord = styled.span<{ show: boolean }>`
  font-weight: ${({ show }) => (show ? "bold" : "normal")};
  user-select: ${({ show }) => (show ? "auto" : "none")};
  color: ${({ show }) => (show ? "whitesmoke" : "silver")};
`;

export const GameRoundInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimerCircleContainer = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  margin: 0px;
`;

export const TimerCircle = styled.div<{ rotation: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-top-color: #3498db;
  transform-origin: 50% 50%;
  transition: transform 1s linear;
  transform: rotate(${(props) => props.rotation}deg);
`;

export const TimerText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  color: #3498db;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 0;
  padding: 0;

  button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    font-size: 1.6rem;
  }
`;
export default function Game({
  words,
  secondsRound,
  shownOptionsOnChange,
  playersInTeams
}: GameProps) {
  useEffect(() => {
    console.log("Component mounted with props:");
    console.log("words:", words);
    console.log("secondsRound:", secondsRound);
    console.log("playersInTeams:", playersInTeams);
  }, []);
  const [gameWords, setGameWords] = useState(words.map(w => ({word: w, isGuessed: false})))
  const [seconds, setSeconds] = useState(secondsRound);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentWords, setCurrentWords]= useState<GameWord[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  //paused, inprogress, finished, shownext, notstrted
  const [roundInProgress, setRoundInProgress] = useState("shownext");
  //allwords, oneword, show
  const [roundType, setRoundType] = useState("allwords");
  const [randomWord, setRandomWord] = useState("");

  const [currentTeam, setCurrentTeam] = useState("as");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [playersInRounds, setPlayersInRounds] = useState(
    playersInTeams
  );
  const [showRandomWord, setShowRandomWord] = useState(true);
  const [showNextRoundModal, setShowNextRoundModal] = useState(false);
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showFinishGameModal, setShowFinishGameModal] = useState(false);

  const modalInfo = "yes";
  let currentTeamIndexRef = useRef(-1);

  const guessedWords = useRef<GameWord[]>([]);

  function setPlayerNextRound() {
  if (!playersInRounds || playersInRounds.length === 0) return;

  // move to next team cyclically
  currentTeamIndexRef.current =
    (currentTeamIndexRef.current + 1) % playersInRounds.length;

  moveNextPlayerInTeam(currentTeamIndexRef.current);

  console.log("playersInRounds", playersInRounds);
  setShowNextRoundModal(true);
}

function moveNextPlayerInTeam(teamIndex: number) {
  const teamPlayers = playersInRounds[teamIndex].players;

  if (!teamPlayers || teamPlayers.length === 0) return;

  // find current player with isNext
  const currentIndex = teamPlayers.findIndex(p => p.isNext);

  let nextIndex: number;

  if (currentIndex === -1) {
    nextIndex = 0;
  } else {
    teamPlayers[currentIndex].isNext = false;

    nextIndex = (currentIndex + 1) % teamPlayers.length;
  }

  teamPlayers[nextIndex].isNext = true;
  setCurrentPlayer(teamPlayers[nextIndex].name);
  setCurrentTeam(playersInRounds[teamIndex].team);
}

  useEffect(() => {
    setPlayerNextRound();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number;

    if (roundInProgress === "inprogress") {
    intervalId = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [roundInProgress]);

  //for modals
  useEffect(() => {
    if (roundInProgress === "shownext") {
      setShowNextRoundModal(true);
    } else if (roundInProgress === "finished") {
      setShowWordsModal(true);
    }
  }, [roundInProgress]);

  useEffect(() => {
    let interval: NodeJS.Timeout | number;;

    // Update the timer every second
    if (roundInProgress === "inprogress") {
      interval = setInterval(() => {
        setElapsedTime(
          (prevElapsedTime) => (prevElapsedTime + 1) % secondsRound
        );
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [roundInProgress]);

  useEffect(() => {
    if (seconds === 0) {
      console.log("round finished");
      finishRound();
    }
  }, [seconds]);

  const calculatePercentage = () => (elapsedTime / secondsRound) * 360;

  function displayTime() {
    const remainingSeconds = seconds % 60;
    return remainingSeconds;
  }

  function getRandomWord() {
  const availableWords = gameWords.filter(word => !word.isGuessed);
  console.log("in getRandom word, and available words length = ", availableWords.length)
  if (availableWords.length === 0) {
    console.log("in availablewords.length 0 ")
    setSeconds(0)
    finishRound()
    return "";
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].word;
}

  function startRound() {
    setRoundInProgress("inprogress");
    setRandomWord(getRandomWord);
  }

  function pauseRound() {
    setRoundInProgress("paused");
  }

  function finishRound() {
    const uniqueValues: Record<string, boolean> = {};

    const uniqueArray: GameWord[] = currentWords.filter((item) => {
      if (!uniqueValues[item.word]) {
        uniqueValues[item.word] = true;
        return true;
      }
      return false;
    });

    setCurrentWords(uniqueArray);
    setRoundInProgress("finished");
    console.log(roundInProgress);
  }

  function addToGuessedWords() {
    const currentWordsNow = guessedWords.current;

    const updatedWords = [...currentWordsNow, ...currentWords];

    guessedWords.current = updatedWords;
  }

 function resetRound() {
  const guessedWordsCount = countGuessedWords();
  addPointsToPlayer(guessedWordsCount);
  setShowWordsModal(false);
  setPlayerNextRound();

  // Update guessed state
  setGameWords(prev =>
    prev.map(gw => {
      const match = currentWords.find(cw => cw.word === gw.word);
      return match ? { ...gw, isGuessed: match.isGuessed } : gw;
    })
  );

  setSeconds(secondsRound);
  setElapsedTime(0);
  addToGuessedWords();
  setGuessedGameWords();

  // 🔹 Single logic block for advancing round or finishing
  setGameWords(prev => {
    const allGuessed = prev.every(word => word.isGuessed);

    if (allGuessed) {
      // all words guessed → next round or finish
      if (roundType === "allwords") {
        setRoundType("oneword");
        setRoundInProgress("shownext");
        setShowNextRoundModal(true);
      } else if (roundType === "oneword") {
        setRoundType("show");
        setRoundInProgress("shownext");
        setShowNextRoundModal(true);
      } else if (roundType === "show") {
        setShowFinishGameModal(true);
        setRoundInProgress("finished");
        setShowNextRoundModal(false); // ✅ explicitly hide next round modal
      }

      // reset game words for next phase (optional)
      return words.map(w => ({ word: w, isGuessed: false }));
    }

    // Not all guessed → continue normally
    setRoundInProgress("shownext");
    setShowNextRoundModal(true);
    return prev;
  });

  // 🔹 Remove the unconditional modal logic here
  setCurrentWords([]);
  setRandomWord("");
} 



  function setGuessedGameWords() {
    setGameWords(prevGameWords =>
      prevGameWords.map(gw => {
        const matched = currentWords.find(
          cw => cw.word === gw.word && cw.isGuessed
        );
        return matched ? { ...gw, isGuessed: true } : gw;
      })
    );
  }

  // function removeGuessedFromGameWords(){
  //   setGameWords((prevGameWords) =>
  //   prevGameWords.filter((word) => !word.isGuessed)
  // );
  // }

  function countGuessedWords() {
    let guessedWordsCount = 0;
    currentWords.forEach((word) => {
      if (word.isGuessed) {
        guessedWordsCount++;
      }
    });
    return guessedWordsCount;
  }

  function addPointsToPlayer(pointsToAdd: number) {
  // Clone playersInRounds immutably
  const updatedPlayersInRounds = playersInRounds.map((team) => {
    const updatedPlayers = team.players.map((player) =>
      player.name === currentPlayer
        ? { ...player, points: (player.points || 0) + pointsToAdd }
        : player
    );
    // Update team points if any player matches currentPlayer
    const teamPointsToAdd = team.players.some(p => p.name === currentPlayer) ? pointsToAdd : 0;
    return {
      ...team,
      players: updatedPlayers,
      teamPoints: (team.teamPoints || 0) + teamPointsToAdd,
    };
  });

  setPlayersInRounds(updatedPlayersInRounds);
}

function onGuessed() {
  // 1️⃣ Mark this word as guessed in gameWords
  setGameWords(prev =>
    prev.map(w =>
      w.word === randomWord ? { ...w, isGuessed: true } : w
    )
  );

  // 2️⃣ Add to currentWords for round summary
  setCurrentWords(prev => [
    ...prev,
    { word: randomWord, isGuessed: true },
  ]);

  // 3️⃣ Get the next random unguessed word
  setNextRandomWord()
}

const setNextRandomWord = () => {
  const available = gameWords.filter(
    w => !w.isGuessed && w.word !== randomWord
  );

  if (available.length > 0) {
    const nextWord =
      available[Math.floor(Math.random() * available.length)].word;
    setRandomWord(nextWord);
  } else {
    setRandomWord("");
    setSeconds(0); // reset timer when no words left
  }
};

function onSkipped() {
  // 1️⃣ Add skipped word to currentWords
  setCurrentWords(prev => [
    ...prev,
    { word: randomWord, isGuessed: false },
  ]);

  // 2️⃣ Get a new random word from *unguessed* words
  setNextRandomWord()
}

  function currentWordOnChange(wordToChange: string) {
    setCurrentWords((prevWords) =>
      prevWords.map((word) =>
        word["word"] === wordToChange
          ? { ...word, isGuessed: !word.isGuessed }
          : word
      )
    );
  }

  function onCloseShowNextRoundModal() {
    setRoundInProgress("notstarted");
    setShowNextRoundModal(false);
  }

  return (<div>
    <GameContainer>
    <GameTopIconsContainer>
      <StyledFontAwesomeIcon
        icon="ranking-star"
        onClick={() => setShowScoreModal(true)}
      />
      <StyledFontAwesomeIcon icon="gear" />
    </GameTopIconsContainer>

    <GameIconContainer data-testid="roundtype">
      {roundType === "allwords" && (
        <>
          <StyledFontAwesomeIcon icon="comments" />
          <IconText>Describe</IconText>
        </>
      )}
      {roundType === "oneword" && (
        <>
          <StyledFontAwesomeIcon icon="comment" />
          <IconText>One Word</IconText>
        </>
      )}
      {roundType === "show" && (
        <>
          <StyledFontAwesomeIcon icon="person-chalkboard" />
          <IconText>Show</IconText>
        </>
      )}
      
    </GameIconContainer>

    <WordContainer>
      <RandomWord id="current-word"
        show={showRandomWord}
        onClick={() => setShowRandomWord(!showRandomWord)}
      >
        {randomWord}
      </RandomWord>
    </WordContainer>

    <GameRoundInfoContainer>
      <TimerCircleContainer>
        <TimerCircle rotation={calculatePercentage()} />
        <TimerText>{seconds}</TimerText>
      </TimerCircleContainer>
    </GameRoundInfoContainer>

    <ButtonContainer>
      {roundInProgress === "inprogress" && (
        <>
          <button onClick={onGuessed}>Guessed</button>
          <button onClick={onSkipped}>Skip</button>
          <button onClick={pauseRound}>
            <StyledFontAwesomeIcon icon="pause" />
          </button>
        </>
      )}
      {roundInProgress === "paused" && (
        <button onClick={startRound}>
          <StyledFontAwesomeIcon icon="play" />
        </button>
      )}
      {roundInProgress === "notstarted" && <button onClick={startRound}>Start</button>}
    </ButtonContainer>
  </GameContainer>
      

        <StartRoundModal
          currentTeam={currentTeam}
          currentPlayer={currentPlayer}
          showNextRoundModal={showNextRoundModal}
          onClose={onCloseShowNextRoundModal}
        />

        <Modal
          onClose={resetRound}
          currentWords={currentWords}
          showWordsModal={showWordsModal}
          currentWordOnChange={currentWordOnChange}
        />

        <ShowScoreModal
          onClose={() => setShowScoreModal(false)}
          showScoreModal={showScoreModal}
          teams={playersInRounds}
        />

        <FinishGameModal 
          onClose={()=>shownOptionsOnChange("home")}
          showFinishGameModal={showFinishGameModal}
          teams={playersInRounds}    
        />
    </div>
  );
}
