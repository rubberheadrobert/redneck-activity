import "./WaitingForPlayers.css";
import PlayerBubble from "../../UI/PlayerBubble/PlayerBubble";
import NextButton from "../../UI/NextButton/NextButton";
export default function WaitingForPlayers() {
  return (
    <div className="waiting-for-players-container">
      <h1>Waiting For Players</h1>
      <div className="joined-players">
        <PlayerBubble name="John" />
        <PlayerBubble name="Robert" />
        <PlayerBubble name="Jackie" />
        <PlayerBubble name="Kayle" />
        <PlayerBubble name="Walter" />
      </div>
      <NextButton to="/waiting-page">Next</NextButton>
    </div>
  );
}
