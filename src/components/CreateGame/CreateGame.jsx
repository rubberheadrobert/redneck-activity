import { useState } from "react";
import Settings from "./Settings/Settings";
import AddPlayers from "./AddPlayers/AddPlayers";
import AddTeams from "./AddTeams/AddTeams";
import "./CreateGame.css";
import WaitingForPlayers from "./WaitingForPlayers/WaitingForPlayers";
import Game from "../Game/Game";
import AddWords from "./AddWords/AddWords";
import Home from "../Home/Home";
import SettingsSliders from "./SettingsSliders/SettingsSliders";
import CreateGameModal from "./CreateGameModule";

import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";

const _HOME = "home";
const _TEAMS = "teams";
const _PLAYERS = "players";
const _SETTINGS = "settings";
const _SETTINGS_SLIDERS = "settings-sliders";
const _WAITING = "waiting";
const _GAME = "game";
const _WORDS = "words";

export default function CreateGame() {
  //players -- settings -- teams
  const [shownOptions, setShownOptions] = useState(_SETTINGS);
  const [game, setGame] = useState({});
  const [teamsRandomized, setTeamsRandomized] = useState(true);
  const [isSinglePhone, setIsSinglePhone] = useState(true);
  const [secondsRound, setSecondsRound] = useState(30);
  const [players, setPlayers] = useState([]);
  const [numOfTeams, setNumOfTeams] = useState(2);
  const [words, setWords] = useState([]);
  const [wordsAmount, setWordsAmount] = useState(5);
  const [teamNames, setTeamNames] = useState([]);
  const [showCreateGameModal, setShowCreateGameModal] = useState(
    hasLocalStorage()
  );

  const [playersInTeams, setPlayersInTeams] = useState([]);

  //states for Settings

  function hasLocalStorage() {
    const website = "https://codesandbox.io";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(website)) {
        console.log("return true");
        return true;
      }
    }
    console.log("return false");
    return false;
  }

  function handleCreateGameSettings(event) {
    console.log(event.target.name);
    if (event.target.name === _HOME) {
      setShownOptions(_HOME);
    } else if (event.target.name === _SETTINGS) {
      setShownOptions(_SETTINGS);
    } else if (event.target.name === _PLAYERS) {
      console.log("secondsRound", secondsRound);
      console.log("wordsAmount", wordsAmount);
      setShownOptions(_PLAYERS);
    } else if (event.target.name === _WORDS) {
      console.log("players", players);
      setShownOptions(_WORDS);
    } else if (event.target.name === _TEAMS) {
      console.log("numofteams", numOfTeams);
      setShownOptions(_TEAMS);
    } else if (event.target.name === _GAME) {
      setShownOptions(_GAME);
    } else if (event.target.name === _SETTINGS_SLIDERS) {
      setShownOptions(_SETTINGS_SLIDERS);
    }
  }

  function teamsRandomizedOnChange(bool) {
    setTeamsRandomized(bool);
  }

  function isSinglePhoneOnChange(bool) {
    setIsSinglePhone(bool);
  }

  function secondsRoundOnChange(newValue) {
    setSecondsRound(newValue);
  }

  function shownOptionsOnChange(newPage) {
    setShownOptions(newPage);

    console.log("in playersInTeamOnChange");
    console.log(playersInTeams);
  }

  function playersAllOnChange(newPlayers) {
    console.log("in playersAllOnChange");
    setPlayers(newPlayers);
    console.log(newPlayers);
  }

  function teamNameOnChange(index, name) {
    console.log("index: ", index);
    console.log("name: ", name);
    console.log("teamNames: ", teamNames);

    if (arguments.length === 2) {
      setTeamNames((prevArray) => {
        const newArray = [...prevArray];
        console.log("teamNameOnChange newArray", newArray);
        console.log("teamNameOnChange name" + name);
        newArray[index]["name"] = name;
        console.log(newArray);
        return newArray;
      });
    } else if (arguments.length === 1) {
    }
  
  }

  function numOfTeamsOnChange(num) {
    setNumOfTeams(num);
    const teamNames = [];
    for (let i = 0; i < num; i++) {
      const teamName = `Team ${i + 1}`;
      teamNames.push({ oldName: teamName, name: teamName });
    }
    console.log("numOfTeamsOnChange:", teamNames);
    setTeamNames(teamNames);
  }

  function playersOnChange(index, newName) {
    setPlayers((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = { ...newArray[index], name: newName };
      return newArray;
    });
  }

  function wordsEditOnChange(index, newWord) {
    setWords((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = newWord;

      return newArray;
    });
    console.log(words);
  }

  
  function playersLengthOnChange(newLength) {
    setPlayers(new Array(Number(newLength)).fill({ name: "" }));
  }

  function wordsOnChange(newWords) {
    setWords((prevWords) => prevWords.concat(newWords));
  }

  function wordsAmountOnChange(num) {
    setWordsAmount(num);
  }

  function showCreateGameModalOnChange(bool) {
    setShowCreateGameModal(bool);
  }

  function playersInTeamsOnChange(arr) {
    console.log("in playersInTeamsOnChange");

    playersInTeams.current = arr;
  }

  return (
    <div className="create-game-container">
      {shownOptions == _SETTINGS && (
        <Settings
          handleCreateGameSettings={handleCreateGameSettings}
          game={game}
          isSinglePhone={isSinglePhone}
          teamsRandomized={teamsRandomized}
          teamsRandomizedOnChange={teamsRandomizedOnChange}
          isSinglePhoneOnChange={isSinglePhoneOnChange}
        />
      )}
      {shownOptions == _SETTINGS_SLIDERS && (
        <SettingsSliders
          handleCreateGameSettings={handleCreateGameSettings}
          secondsRound={secondsRound}
          secondsRoundOnChange={secondsRoundOnChange}
          wordsAmount={wordsAmount}
          wordsAmountOnChange={wordsAmountOnChange}
        />
      )}
      {shownOptions == _WORDS && (
        <AddWords
          playersAmount={players.length}
          wordsAmount={wordsAmount}
          wordsAmountOnChange={wordsAmountOnChange}
          wordsOnChange={wordsOnChange}
          handleCreateGameSettings={handleCreateGameSettings}
          players={players}
          wordsEditOnChange={wordsEditOnChange}
          playersLengthOnChange={playersLengthOnChange}

        />
      )}
      {shownOptions == _PLAYERS && (
        <AddPlayers
          handleCreateGameSettings={handleCreateGameSettings}
          players={players}
          numOfTeams={numOfTeams}
          numOfTeamsOnChange={numOfTeamsOnChange}
          playersOnChange={playersOnChange}
          playersAllOnChange={playersAllOnChange}
          playersLengthOnChange={playersLengthOnChange}
        />
      )}
      {shownOptions == _TEAMS && (
        <AddTeams
          handleCreateGameSettings={handleCreateGameSettings}
          playersArray={players}
          numOfTeams={numOfTeams}
          teamNames={teamNames}
          teamNameOnChange={teamNameOnChange}
          playersAllOnChange={playersAllOnChange}
          shownOptionsOnChange={shownOptionsOnChange}
          playersInTeamsOnChange={playersInTeamsOnChange}
        />
      )}
      {shownOptions == _WAITING && <WaitingForPlayers />}

      {shownOptions == _GAME && (
        <Game
          players={players}
          secondsRound={secondsRound}
          words={words}
          teamNames={teamNames}
          shownOptionsOnChange={shownOptionsOnChange}
          teamNameOnChange={teamNameOnChange}
        />
      )}
      {shownOptions == _HOME && <Home />}
      {showCreateGameModal && (
        <CreateGameModal
          showCreateGameModal={showCreateGameModal}
          showCreateGameModalOnChange={showCreateGameModalOnChange}
        />
      )}
    </div>
  );
}
