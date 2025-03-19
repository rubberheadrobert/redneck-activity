import { styled } from "styled-components";
import TeamInput from "../TeamInput";

const TeamComp = styled.div`
  border: 5px solid #ff6600;
  border-radius: 1rem;
  height: 13rem !important;
  background-color: darkblue;
  padding: 0.5rem;
  margin: h2 {
    color: whitesmoke;
  }
  & > p {
    background-color: rgb(0, 0, 180, 0.5);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin: 0.5rem;
  }
`;
export default function Team({
  team,
  players,
  currentIndex,
  index,
  teamNameOnChange,
}) {
  if (!players || players.length === 0) {
    return (
      <TeamComp>
        <TeamInput teamNum={index + 1} teamNameOnChange={teamNameOnChange} />
        <p>No players in this team.</p>
      </TeamComp>
    );
  }
  const playerContent = players.map((player) => (
    <p key={player.name}>{player.name}</p>
  ));

  return (
    <TeamComp
      style={{
        display: currentIndex === index ? "block" : "none",
        margin: "0px",
      }}
    >
      <TeamInput
        teamNameOnChange={teamNameOnChange}
        teamNum={index + 1}
        name={team}
      />
      {playerContent}
    </TeamComp>
  );
}
