import "./ShowScoreModal.css";
import React, { useState } from "react";
import {ShowScoreModalProps, GameWord} from "../../../types/index"



export default function ShowScoreModal({ onClose, showScoreModal, teams}: ShowScoreModalProps) {
  const sortedTeams = teams.sort((a, b) => (b.teamPoints ?? 0) - (a.teamPoints ?? 0));

  function scoreContent() {
    console.log("inShowScoreModalScoreContent");
    console.log("teamNames", teams);
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
                <td>{team.team}</td>
                <td>{team.teamPoints}</td>
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
