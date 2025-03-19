import TeamInput from "./TeamInput";
import { styled } from "styled-components";
import { useRef, useState } from "react";
import Team from "./Team/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TeamsContent = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-between;
  gap: 0.1rem;
  position: relative;
  align-items: center;
`;

const ShuffleButton = styled.button`
  background-color: darkblue;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 5px solid #ff6600;
  font-size: 1rem;
  font-family: inherit;

  color: whitesmoke;
`;

const StyledPrevButton = styled.button`
  position: absolute;
  top: 10%;
  left: 15px;
  background-color: rgb(0, 0, 100, 0.8);
  border-radius: 1rem;
  padding: 0.4rem;
  border: none;
  font-size: 0.9rem;
  color: whitesmoke;
`;

const StyledNextButton = styled.button`
  position: absolute;
  top: 10%;
  right: 15px;
  background-color: rgb(0, 0, 100, 0.8);

  border-radius: 1rem;
  padding: 0.4rem;
  border: none;
  font-size: 1rem;
  color: whitesmoke;
`;

import NextPrevButtons from "../../UI/NextPrevButtons/NextPrevButtons";
import Container from "../../UI/Container/Container";
import img from "../../../images/paper-background-2.jpg";
export default function AddTeams({
  numOfTeams,
  playersArray,
  playersAllOnChange,
  teamNames,
  teamNameOnChange,
  shownOptionsOnChange,
  
  playersInTeamsOnChange,

  handleCreateGameSettings,
}) {
  const playersInTeams = generateTeams();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNext = () => {
    if (currentIndex < playersInTeams.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const showPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  function generatePlayersInTeams() {
    console.log("generating players in teams");
    console.log(playersArray);
    console.log(teamNames);
    const teams = [];
    let teamIndex = 0; // Start at 0 for array indexing

    for (let index = 0; index < playersArray.length; index++) {
      console.log(teamIndex);
      let player = {};

      if (index % numOfTeams == 0) {
        teamIndex = 0;
      } else {
        teamIndex++;
      }

      player["name"] = playersArray[index]["name"];
      player["teamIndex"] = teamIndex; // Store index instead of name

      teams.push(player);
    }

    console.log("teams:", teams);
    return teams;
  }
  

  function generateTeams() {
    console.log("generating teams");
    const playersInTeams = generatePlayersInTeams();
    console.log("playersInTeams", playersInTeams);
    console.log("teamNames", teamNames);
    const teams = [];

    for (let i = 0; i < numOfTeams; i++) {
      console.log("in first for loop");
      const team = { team: teamNames[i].name, players: [] }; // Use .name directly
      console.log("team: ", team);

      for (let j = 0; j < playersInTeams.length; j++) {
        if (playersInTeams[j]["teamIndex"] === i) {
          // Compare by index
          team.players.push(playersInTeams[j]);
        }
      }
        teams.push(team);
      }

    playersInTeamsOnChange(teams);
    console.log("teams", teams);
    return teams;
  }

  function shuffle() {
    const shuffledPlayers = [...playersArray];
    shuffledPlayers.sort((a, b) => 0.5 - Math.random());
    playersAllOnChange(shuffledPlayers);
  }

  const content = playersInTeams.map((team, index) => (
    <Team
      key={index}
      team={team.team}
      players={team.players}
      currentIndex={currentIndex}
      index={index}
      teamNameOnChange={teamNameOnChange}
    />
  ));

  return (
    <Container backgroundImage={img} secondColor={"#ff6600"}>
      <h1>Add Teams</h1>
      <ShuffleButton onClick={shuffle}>Shuffle</ShuffleButton>
      <TeamsContent>
        <StyledPrevButton buttonName="prev" onClick={showPrevious}>
          <FontAwesomeIcon icon="angles-left" />
        </StyledPrevButton>
        {content}
        <StyledNextButton buttonName="next" onClick={showNext}>
          <FontAwesomeIcon icon="angles-right" />
        </StyledNextButton>
      </TeamsContent>
      <NextPrevButtons
        prev="words"
        next="game"
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}