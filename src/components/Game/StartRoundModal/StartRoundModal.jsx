import "./StartRoundModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export default function StartRoundModal({
  onClose,
  currentTeam,
  currentPlayer,
  showNextRoundModal,
}) {
  if (showNextRoundModal === false) {
    return null;
  } else {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Next Round</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <table>
            <tr>
              <td>
                <FontAwesomeIcon className="fa-icon" icon="user" />
              </td>
              <td>Player:</td>
              <td>{currentPlayer}</td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon className="fa-icon" icon="users" />
              </td>
              <td>Team:</td>
              <td> {currentTeam}</td>
            </tr>
          </table>
          <div> </div>
          <div> </div>
        </div>
      </div>
    );
  }
}
