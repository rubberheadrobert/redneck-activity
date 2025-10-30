import TeamInput from "./TeamInput";
import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import Team from "./Team/Team";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {addTeamsTexts} from "../../../utils/texts"
import {ROUTES} from "../../../utils/routes"
import {ADD_TEAMS_CONSTS} from "../../../utils/constants"
import {AddTeamsProps, PlayersInTeam, Player} from "../../../types/index"
const TeamsContent = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-between;
  gap: 0.1rem;
  position: relative;
  align-items: center;
`;

export const ShuffleButton = styled.button<ButtonProps>`
  background-color: darkblue;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 5px solid #ff6600;
  font-size: 1rem;
  font-family: inherit;
  color: whitesmoke;
  width: 50%;
`;

export const StyledPrevButton = styled.button<ButtonProps>`
  position: absolute;
  top: 10%;
  left: 15px;
  background-color: rgba(0, 0, 100, 0.8);
  border-radius: 1rem;
  padding: 0.4rem;
  border: none;
  font-size: 0.9rem;
  color: whitesmoke;

  ${(props) =>
    props.buttonName === "prev" &&
    `
      border: 2px solid yellow;
    `}
`;

export const StyledNextButton = styled.button<ButtonProps>`
  position: absolute;
  top: 10%;
  right: 15px;
  background-color: rgba(0, 0, 100, 0.8);
  border-radius: 1rem;
  padding: 0.4rem;
  border: none;
  font-size: 1rem;
  color: whitesmoke;

  ${(props) =>
    props.buttonName === "next" &&
    `
      border: 2px solid yellow;
    `}
`;

interface ButtonProps {
  buttonName?: "prev" | "next"; // restrict to allowed values if you want
}

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
}: AddTeamsProps) {
  const [playersInTeams, setPlayersInTeams] = useState<PlayersInTeam[]>([]);
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

  useEffect(() => {
    function generatePlayersInTeams(): Player[] {
      const teams: Player[] = [];
      let teamIndex = 0;

      for (let index = 0; index < playersArray.length; index++) {
        const player: Player = {
          [ADD_TEAMS_CONSTS.NAME]: playersArray[index][ADD_TEAMS_CONSTS.NAME],
          [ADD_TEAMS_CONSTS.TEAM_INDEX]: teamIndex,
          points: 0,
          isNext: false
        };

        if ((index + 1) % numOfTeams === 0) {
          teamIndex = 0;
        } else {
          teamIndex++;
        }

        teams.push(player);
      }

      return teams;
    }

    function generateTeams(): PlayersInTeam[] {
      const playersInTeams = generatePlayersInTeams();
      const teams: PlayersInTeam[] = [];

      for (let i = 0; i < numOfTeams; i++) {
        console.log("******" + teamNames[i])
        const team: PlayersInTeam = { team: teamNames[i], players: [] };

        for (let j = 0; j < playersInTeams.length; j++) {
          if (playersInTeams[j][ADD_TEAMS_CONSTS.TEAM_INDEX] === i) {
            team.players.push(playersInTeams[j]);
          }
        }
        teams.push(team);
      }

      return teams;
    }

    const teams: PlayersInTeam[] = generateTeams();
    setPlayersInTeams(teams);
    playersInTeamsOnChange(teams)
  }, [playersArray, numOfTeams, teamNames]);

  function shuffle() {
    const shuffledPlayers = [...playersArray];
    shuffledPlayers.sort(() => 0.5 - Math.random());
    playersAllOnChange(shuffledPlayers);
  }

  return (
    <Container backgroundImage={img} secondColor={"#ff6600"}>
      <h1>Add Teams</h1>
      <ShuffleButton onClick={shuffle}>Shuffle</ShuffleButton>
      <TeamsContent>
        <StyledPrevButton buttonName="prev" onClick={showPrevious}>
          <FontAwesomeIcon icon="angles-left" />
        </StyledPrevButton>
        {playersInTeams.map((team, index) => (
        <Team
          key={index}
          team={team.team}
          players={team.players}
          currentIndex={currentIndex}
          index={index}
          teamNameOnChange={teamNameOnChange}
        />
      ))}
        <StyledNextButton buttonName="next" onClick={showNext}>
          <FontAwesomeIcon icon="angles-right" />
        </StyledNextButton>
      </TeamsContent>
      <NextPrevButtons
        prev={ROUTES.WORDS}
        next={ROUTES.GAME}
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}