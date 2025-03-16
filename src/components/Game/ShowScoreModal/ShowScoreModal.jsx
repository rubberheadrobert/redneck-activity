import "./ShowScoreModal.css";
import React, { useState } from "react";
export default function ShowScoreModal({ onClose, showScoreModal, teamNames }) {
  const sortedTeams = teamNames.sort((a, b) => b.points - a.points);

  function scoreContent() {
    console.log("inShowScoreModalScoreContent");
    console.log("teamNames", teamNames);
    console.log("sortedTeams", sortedTeams);
    return (
      <>
        <div className="score-content-container">
          <table className="score-table">
            <tr>
              <th>Place</th>
              <th>Team</th>
              <th>Points</th>
            </tr>

            {sortedTeams.map((team, index) => (
              <tr key={index}>
                <td className="team-place">{index + 1}.</td>
                <td>{team.newName}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </table>
        </div>
      </>
    );
  }

  if (showScoreModal === false) {
    return null;
  } else {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {scoreContent()}
        </div>
      </div>
    );
  }
}
