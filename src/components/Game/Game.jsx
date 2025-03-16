import Modal from "./Modal/Modal";
import StartRoundModal from "./StartRoundModal/StartRoundModal";
import { useState, useEffect, useRef } from "react";
import "./Game.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowScoreModal from "./ShowScoreModal/ShowScoreModal";

export default function Game({
  words,
  players,
  secondsRound,
  teamNames,
  teamNamesOnChange,
}) {
  const [seconds, setSeconds] = useState(secondsRound);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  //paused, inprogress, finished, shownext, notstarted
  const [roundInProgress, setRoundInProgress] = useState("shownext");
  //allwords, oneword, show
  const [roundType, setRoundType] = useState("oneword");
  const [randomWord, setRandomWord] = useState("");

  const [currentTeam, setCurrentTeam] = useState("as");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [playersInRounds, setPlayersInRounds] = useState(
    generatePlayersInRounds
  );
  const [showRandomWord, setShowRandomWord] = useState(true);
  const [showNextRoundModal, setShowNextRoundModal] = useState(false);
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const modalInfo = "yes";
  let currentTeamIndexRef = useRef(0);

  const guessedWords = useRef([]);

  function generatePlayersInRounds() {
    const playersInRoundsArr = [];
    for (let i = 0; i < teamNames.length; i++) {
      let filteredPlayers = players.filter(
        (player) => player["newTeam"] === teamNames[i]["newName"]
      );

      filteredPlayers = filteredPlayers.map((obj, index) => {
        return { ...obj, isNext: index === 0 };
      });

      teamNames[i].points = 0;

      filteredPlayers.forEach((obj) => {
        obj.points = 0;
      });

      playersInRoundsArr.push(filteredPlayers);
    }
    console.log(playersInRoundsArr);

    return playersInRoundsArr;
  }

  function setPlayerNextRound() {
    if (currentTeamIndexRef.current === teamNames.length) {
      currentTeamIndexRef.current = 1;
    } else {
      currentTeamIndexRef.current = currentTeamIndexRef.current + 1;
    }
    let foundNextPlayer = false;
    let i = 0;
    if (playersInRounds && playersInRounds[currentTeamIndexRef.current - 1]) {
      let lastPlayerIndex =
        playersInRounds[currentTeamIndexRef.current - 1].length - 1;
      while (!foundNextPlayer) {
        if (playersInRounds[currentTeamIndexRef.current - 1][i].isNext) {
          playersInRounds[currentTeamIndexRef.current - 1][i].isNext = false;
          setCurrentPlayer(
            playersInRounds[currentTeamIndexRef.current - 1][i].name
          );
          setCurrentTeam(
            playersInRounds[currentTeamIndexRef.current - 1][i].newTeam
          );
          if (i === lastPlayerIndex) {
            playersInRounds[currentTeamIndexRef.current - 1][0].isNext = true;
          } else {
            playersInRounds[currentTeamIndexRef.current - 1][
              i + 1
            ].isNext = true;
          }
          if (playersInRounds[currentTeamIndexRef.current - 1][i + 1]) {
            playersInRounds[currentTeamIndexRef.current - 1][
              i + 1
            ].isNext = true;
            foundNextPlayer = true;
          } else {
            i = 0;
            playersInRounds[currentTeamIndexRef.current - 1][i].isNext = true;
            foundNextPlayer = true;
          }
        } else {
          i++;
        }
      }
    } else {
      console.log("no players in round");
    }
    console.log("playersInRounds");

    console.log(playersInRounds);
    console.log("teamNames", teamNames);
    setShowNextRoundModal(true);
  }

  useEffect(() => {
    setPlayerNextRound();
  }, []);

  useEffect(() => {
    let intervalId;

    if (roundInProgress === "inprogress") {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) =>
          prevSeconds > 0 ? prevSeconds - 1 : prevSeconds
        );
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
    let interval;

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
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function startRound() {
    setRoundInProgress("inprogress");
    setRandomWord(getRandomWord);
  }

  function pauseRound() {
    setRoundInProgress("paused");
  }

  function finishRound() {
    const uniqueValues = {};

    const uniqueArray = currentWords.filter((item) => {
      if (!uniqueValues[item.word]) {
        uniqueValues[item.word] = true;
        return true;
      }
      return false; //
    });
    setCurrentWords(uniqueArray);
    setRoundInProgress("finished");
    console.log(roundInProgress);
  }

  function addToGessedWords() {
    const currentWordsNow = guessedWords.current;

    const updatedWords = [...currentWordsNow, ...currentWords];

    guessedWords.current = updatedWords;
  }

  function resetRound() {
    const guessedWordsCount = countGuessedWords();
    addPointsToPlayer(guessedWordsCount);
    setShowWordsModal(false);
    setPlayerNextRound();
    setRoundInProgress("shownext");
    setShowNextRoundModal(true);

    setSeconds(secondsRound);
    setElapsedTime(0);
    addToGessedWords();
    setCurrentWords([]);
    setRandomWord("");
  }

  function countGuessedWords() {
    let guessedWordsCount = 0;
    currentWords.forEach((word) => {
      if (word.guessed) {
        guessedWordsCount++;
      }
    });
    return guessedWordsCount;
  }

  function addPointsToPlayer(pointsToAdd) {
    const updatePlayersInRounds = [...playersInRounds];
    updatePlayersInRounds[currentTeamIndexRef.current - 1].forEach((obj) => {
      console.log("currentPlayer", currentPlayer);
      console.log("pointsToAdd", pointsToAdd);
      console.log("currentTeamIndexRef.current", currentTeamIndexRef.current);
      if (obj["name"] === currentPlayer) {
        console.log("if");
        console.log(obj["name"]);
        obj.points = obj.points + pointsToAdd;
        const updateTeamNames = [...teamNames];
        updateTeamNames.forEach((team) => {
          if (team["newName"] === obj["newTeam"]) {
            team.points = team.points + pointsToAdd;
            teamNamesOnChange(updateTeamNames);
          }
        });
      }
    });
    setPlayersInRounds(updatePlayersInRounds);
  }

  function onGuessed() {
    let newWordObj = {
      word: randomWord,
      guessed: true,
    };
    setCurrentWords([...currentWords, newWordObj]);
    setRandomWord(getRandomWord);
  }

  function onSkipped() {
    let newWordObj = {
      word: randomWord,
      guessed: false,
    };
    setCurrentWords([...currentWords, newWordObj]);
    setRandomWord(getRandomWord);
  }

  function currentWordOnChange(wordToChange) {
    setCurrentWords((prevWords) =>
      prevWords.map((word) =>
        word["word"] === wordToChange
          ? { ...word, guessed: !word.guessed }
          : word
      )
    );
  }

  function onCloseShowNextRoundModal() {
    setRoundInProgress("notstarted");
    setShowNextRoundModal(false);
  }

  return (
    <div className="game-container">
      <div className="game-top-icons-container">
        <FontAwesomeIcon
          icon="ranking-star"
          onClick={() => setShowScoreModal(true)}
        />
        <FontAwesomeIcon icon="gear" />
      </div>
      <div className="game-icon-container">
        {roundType === "allwords" && (
          <>
            <FontAwesomeIcon className="fa-icon" icon="comments" />
            <div className="icon-text">Show</div>
          </>
        )}
        {roundType === "oneword" && (
          <>
            <FontAwesomeIcon className="fa-icon" icon="comment" />
            <div className="icon-text">One Word</div>
          </>
        )}
        {roundType === "show" && (
          <>
            <FontAwesomeIcon className="fa-icon" icon="person-chalkboard" />
            <div className="icon-text">Many Words</div>
          </>
        )}
      </div>
      <div className="word-container">
        <span
          onClick={() => setShowRandomWord(!showRandomWord)}
          className={(showRandomWord ? "show" : "hide") + "-random-word"}
        >
          {randomWord}
        </span>
      </div>
      <div className="game-round-info-container">
        <div className="timer-circle-container">
          <div
            className="timer-circle"
            style={{ transform: `rotate(${calculatePercentage()}deg)` }}
          ></div>
          <div className="timer-text">{seconds}</div>
        </div>
      </div>
      <div className="button-container">
        {roundInProgress == "inprogress" && (
          <>
            <button onClick={onGuessed}>Guessed</button>
            <button onClick={onSkipped}>Skip</button>
            <button onClick={pauseRound}>
              <FontAwesomeIcon className="fa-icon" icon="pause" />
            </button>
          </>
        )}
        {roundInProgress == "paused" && (
          <>
            <button onClick={startRound}>
              <FontAwesomeIcon className="fa-icon" icon="play" />
            </button>
          </>
        )}
        {roundInProgress == "notstarted" && (
          <>
            <button onClick={startRound}>Start</button>
          </>
        )}
      </div>

      <StartRoundModal
        currentTeam={currentTeam}
        currentPlayer={currentPlayer}
        showNextRoundModal={showNextRoundModal}
        onClose={onCloseShowNextRoundModal}
      />

      <Modal
        onClose={resetRound}
        information={modalInfo}
        currentWords={currentWords}
        showWordsModal={showWordsModal}
        currentWordOnChange={currentWordOnChange}
      />

      <ShowScoreModal
        onClose={() => setShowScoreModal(false)}
        showScoreModal={showScoreModal}
        teamNames={teamNames}
      />
    </div>
  );
}
