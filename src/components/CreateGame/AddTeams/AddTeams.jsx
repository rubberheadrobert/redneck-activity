import TeamInput from "./TeamInput";
import "./AddTeams.css";
import { useRef, useState } from "react";
export default function AddTeams({
  numOfTeams,
  playersArray,
  playersAllOnChange,
  teamNames,
  teamNamesOnChange,
  shownOptionsOnChange,
}) {
  console.log("numOfTeams", numOfTeams);
  console.log("playersArray", playersArray);
  console.log("numOfTeams", numOfTeams);
  console.log("numOfTeams", numOfTeams);

  const [playersInTeams, setPlayersInTeams] = useState(generateTeams());

  function generateTeams() {
    const teams = [];
    let teamIndex = 0;
    for (let index = 0; index < playersArray.length; index++) {
      let player = {};
      if (index % numOfTeams == 0) {
        teamIndex = teamIndex + 1;
      }
      player["name"] = playersArray[index]["name"];
      player["team"] = teamIndex;
      console.log(player);
      teams.push(player);
    }
    return teams;
  }
  console.log(playersInTeams);

  function shuffle() {
    const shuffledPlayers = [...playersArray];
    shuffledPlayers.sort((a, b) => 0.5 - Math.random());
    playersAllOnChange(shuffledPlayers);
  }
  return (
    <div>
      {playersInTeams &&
        playersInTeams.map((player, index) => (
          <div key={index}>
            {player.name} {player.team}
          </div>
        ))}
    </div>
  );
}
