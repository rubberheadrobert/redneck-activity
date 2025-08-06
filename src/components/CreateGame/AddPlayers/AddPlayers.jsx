import { useState, useEffect } from "react";
import { styled } from "styled-components";

import {addPlayersTexts} from "../../../utils/texts"
import {ROUTES} from "../../../utils/routes"
import PlayerInput from "./PlayerInput/PlayerInput";
import NextPrevButtons from "../../UI/NextPrevButtons/NextPrevButtons";
import img from "../../../images/purple-paper.avif";
import Container from "../../UI/Container/Container.tsx";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(130, 54, 214, 0.8);

  margin: 0.2rem 0.5rem;
  border-radius: 1rem;
  border: 5px solid whitesmoke;

  > div {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }

  h2 {
    font-size: 1rem;
    color: whitesmoke;
  }

  input {
    font-size: 1rem;
    width: 2rem;
    font: inherit;
    color: darkgray;
    align-self: center;
    border-radius: 0.5rem;
    text-align: center;
    margin: 0rem 0.5rem;
  }

  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
    h2 {
      font-size: 130%;
    }
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
`;

const PlayerInputContainer = styled.div`
  margin: 0.5rem 0rem;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  background-color: rgb(130, 54, 214, 0.8);
  border-radius: 1rem;
  border: 5px solid whitesmoke;
  max-height: 12rem;
  overflow-y: scroll;

  h2 {
    font-size: 1.2rem;
    color: whitesmoke;
  }

  &::-webkit-scrollbar {
    width: 12px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(200, 30, 240, 0.8);
    border-radius: 1rem;
  }

  /* Style scrollbar for Firefox */
  & :scrollbar {
    width: 12px;
  }

  &:scrollbar-thumb {
    background-color: rgba(100, 54, 214, 0.8);
    border-radius: 6px;
  }

  input {
    text-align: center;
    font-size: 1.1rem;
    width: 90%;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0rem;
    transition: padding 0.5s;
    border-radius: 1rem;
    font-style: italic;
    color: black;
  }

  input:focus {
    background-color: rgba(235, 181, 215);
  }

  input::placeholder {
    color: #a0a0a0;
    font-style: italic;
    font-size: 1rem;
  }

  @media (min-width: 576px) {
  }
  @media (min-width: 768px) {
    max-height: 30rem;
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
`;

export default function AddPlayers({
  handleCreateGameSettings,
  playersOnChange,
  players,
  playersAllOnChange,
  playersLengthOnChange,
  numOfTeams,
  numOfTeamsOnChange,
}) {
  const [numOfPlayers, setNumOfPlayers] = useState(6);

  const [playersSubmitted, setPlayersSubmitted] = useState(false);

  useEffect(() => {
    playersLengthOnChange(numOfPlayers);
  }, [numOfPlayers]);

  useEffect(() => {
    setNumOfPlayers(numOfPlayers)
    numOfTeamsOnChange(numOfTeams)
  }, [])

  // useEffect(() => {
  //   // load numOfPlayers from localStorage
  //   const savedNumOfPlayers = localStorage.getItem("numOfPlayers");
  //   if (savedNumOfPlayers) {
  //     setNumOfPlayers(savedNumOfPlayers);
  //   }
  //   // load numOfTeams from localStorage
  //   const savedNumOfTeams = localStorage.getItem("numOfTeams");
  //   if (savedNumOfTeams) {
  //     numOfTeamsOnChange(savedNumOfTeams);
  //   }
  //   // load players from localStorage
  //   const savedPlayers = localStorage.getItem("players");
  //   if (savedPlayers) {
  //     console.log("in loadplayers useEffect");
  //     console.log(JSON.parse(savedPlayers));
  //     playersAllOnChange(JSON.parse(savedPlayers));
  //   } else {
  //     const newArray = new Array(numOfPlayers).fill("");
  //     playersAllOnChange(newArray);
  //   }
  // }, []);

  // useEffect(() => {
  //   //save players to localStorage
  //   console.log("in saveplayers useEffect");
  //   console.log(players);
  //   localStorage.setItem("players", JSON.stringify(players));
  // }, [players]);

  // useEffect(() => {
  //   // save numOfPlayers to localStorage
  //   localStorage.setItem("numOfPlayers", numOfPlayers);
  // }, [numOfPlayers]);

  // useEffect(() => {
  //   // save numOfTeams to localStorage
  //   localStorage.setItem("numOfTeams", numOfTeams);
  // }, [numOfTeams]);

  // const inputs = Array.from({ length: numOfPlayers }, (_, index) => {
  //   return (
  //     <>
  //       <PlayerInput
  //         type="text"
  //         startValue={players[index] ? players[index]["name"] : ""}
  //         key={index}
  //         name={`player${index + 1}`}
  //         placeholder={`Player ${index + 1} Name...`}
  //         addToPlayers={playersOnChange}
  //         index={index}
  //       />
  //     </>
  //   );
  // });

  const inputs = players.map((player, index) => (
    <PlayerInput
      key={index}
      startValue={player.name}
      index={index}
      addToPlayers={playersOnChange}
      placeholder={`Player ${index + 1} Name...`}
      name={`player${index + 1}`}
    />
  ));

  return (
    <Container backgroundImage={img} secondColor={"#8236d6"}>
      <h1>Add Players</h1>

      <InputContainer>
        <div>
          <h2>Number of Players</h2>
          <input
            type="text"
            value={numOfPlayers}
            onChange={(e) => setNumOfPlayers(e.target.value)}
            placeholder={addPlayersTexts.numOfPlayers}
          />
        </div>

        <div>
          <h2>Number of Teams</h2>
          <input
            type="text"
            onChange={(e) => {
              numOfTeamsOnChange(e.target.value);
            }}
            value={numOfTeams}
            placeholder={addPlayersTexts.numOfTeams}
          />
        </div>
      </InputContainer>
      <PlayerInputContainer>
        <h2>Players</h2>
        {inputs}
      </PlayerInputContainer>
      <NextPrevButtons
        prev={ROUTES.SETTINGS_SLIDERS}
        next={ROUTES.WORDS}
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}
