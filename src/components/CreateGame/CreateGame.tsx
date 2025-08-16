import { useState } from 'react';
import Settings from './Settings/Settings';
import AddPlayers from './AddPlayers/AddPlayers';
import AddTeams from './AddTeams/AddTeams';
import './CreateGame.css';
import WaitingForPlayers from './WaitingForPlayers/WaitingForPlayers';
import Game from '../Game/Game';
import AddWords from './AddWords/AddWords';
import Home from '../Home/Home';
import SettingsSliders from './SettingsSliders/SettingsSliders';
import CreateGameModal from './CreateGameModal';
import {
  Player,
  TeamName,
  Team,
  PlayerInTeam,
  PlayersInTeam,
} from '../../types/index';

const _HOME = 'home';
const _TEAMS = 'teams';
const _PLAYERS = 'players';
const _SETTINGS = 'settings';
const _SETTINGS_SLIDERS = 'settings-sliders';
const _WAITING = 'waiting';
const _GAME = 'game';
const _WORDS = 'words';

export default function CreateGame() {
  //players -- settings -- teams
  const [shownOptions, setShownOptions] = useState<string>(_SETTINGS);
  const [game, setGame] = useState({});
  const [teamsRandomized, setTeamsRandomized] = useState<boolean>(true);
  const [isSinglePhone, setIsSinglePhone] = useState<boolean>(true);
  const [secondsRound, setSecondsRound] = useState<number>(30);
  const [players, setPlayers] = useState<Player[]>([]);
  const [numOfTeams, setNumOfTeams] = useState<number>(2);
  const [words, setWords] = useState<string[]>([]);
  const [wordsAmount, setWordsAmount] = useState<number>(5);
  const [teamNames, setTeamNames] = useState<TeamName[]>([]);
  const [showCreateGameModal, setShowCreateGameModal] = useState<boolean>(
    hasLocalStorage()
  );

  const [playersInTeams, setPlayersInTeams] = useState<PlayersInTeam[]>([]);

  //states for Settings

  function hasLocalStorage() {
    const website = 'https://codesandbox.io';
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(website)) {
        console.log('return true');
        return true;
      }
    }
    console.log('return false');
    return false;
  }

  function handleCreateGameSettings(event: any): void {
    console.log(event.target.name);
    if (event.target.name === _HOME) {
      setShownOptions(_HOME);
    } else if (event.target.name === _SETTINGS) {
      setShownOptions(_SETTINGS);
    } else if (event.target.name === _PLAYERS) {
      console.log('secondsRound', secondsRound);
      console.log('wordsAmount', wordsAmount);
      setShownOptions(_PLAYERS);
    } else if (event.target.name === _WORDS) {
      console.log('players', players);
      setShownOptions(_WORDS);
    } else if (event.target.name === _TEAMS) {
      console.log('numofteams', numOfTeams);
      setShownOptions(_TEAMS);
    } else if (event.target.name === _GAME) {
      setShownOptions(_GAME);
    } else if (event.target.name === _SETTINGS_SLIDERS) {
      setShownOptions(_SETTINGS_SLIDERS);
    }
  }

  function teamsRandomizedOnChange(bool: boolean) {
    setTeamsRandomized(bool);
  }

  function isSinglePhoneOnChange(bool: boolean) {
    setIsSinglePhone(bool);
  }

  function secondsRoundOnChange(newValue: number) {
    setSecondsRound(newValue);
  }

  function shownOptionsOnChange(newPage: string) {
    setShownOptions(newPage);

    console.log('in playersInTeamOnChange');
    console.log(playersInTeams);
  }

  function playersAllOnChange(newPlayers: Player[]) {
    console.log('in playersAllOnChange');
    setPlayers(newPlayers);
    console.log(newPlayers);
  }

  function teamNameOnChange(index: number, name: string) {
    console.log('index: ', index);
    console.log('name: ', name);
    console.log('teamNames: ', teamNames);

    if (arguments.length === 2) {
      setTeamNames((prevArray) => {
        const newArray = [...prevArray];
        console.log('teamNameOnChange newArray', newArray);
        console.log('teamNameOnChange name' + name);
        if (newArray[index]) {
          newArray[index] = { ...newArray[index], name };
        }
        // if(newArray[index]){
        //     newArray[index]["name"] = name;
        // }

        console.log(newArray);
        return newArray;
      });
    } else if (arguments.length === 1) {
    }
  }

  function numOfTeamsOnChange(num: number) {
    setNumOfTeams(num);
    const teamNames: Team[] = [];
    for (let i = 0; i < num; i++) {
      const teamName = `Team ${i + 1}`;
      teamNames.push({ oldName: teamName, name: teamName });
    }
    console.log('numOfTeamsOnChange:', teamNames);
    setTeamNames(teamNames);
  }

  // function playersOnChange(index, newName) {
  //   setPlayers((prevArray) => {
  //     const newArray = [...prevArray];
  //     newArray[index] = { ...newArray[index], name: newName };
  //     return newArray;
  //   });
  // }

  function playersOnChange(index: number, newName: string) {
    setPlayers((prevArray) => {
      if (index < 0 || index >= prevArray.length) return prevArray; // Prevent out-of-bounds
      const newArray: Player[] = [...prevArray];
      newArray[index] = { ...newArray[index], name: newName };
      console.log('Players:');
      console.log(players);
      return newArray;
    });
  }

  function wordsEditOnChange(index: number, newWord: string) {
    setWords((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = newWord;

      return newArray;
    });
    console.log(words);
  }

  function playersLengthOnChange(newLength: number) {
    setPlayers(new Array(Number(newLength)).fill({ name: '' }));
  }

  function wordsOnChange(newWords: string[]) {
    setWords((prevWords) => prevWords.concat(newWords));
  }

  function wordsAmountOnChange(num: number) {
    setWordsAmount(num);
  }

  function showCreateGameModalOnChange(bool: boolean) {
    setShowCreateGameModal(bool);
  }

  function playersInTeamsOnChange(arr: PlayersInTeam[]) {
    console.log('in playersInTeamsOnChange');

    setPlayersInTeams(arr);
  }

  return (
    <div className='create-game-container'>
      {shownOptions == _SETTINGS && (
        <Settings
          handleCreateGameSettings={handleCreateGameSettings}
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
          // playersAllOnChange={playersAllOnChange}
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

      {/* {shownOptions == _GAME && (
        <Game
          players={players}
          secondsRound={secondsRound}
          words={words}
          teamNames={teamNames}
          shownOptionsOnChange={shownOptionsOnChange}
          teamNameOnChange={teamNameOnChange}
        />
      )} */}
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
