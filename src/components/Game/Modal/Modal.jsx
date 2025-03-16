import "./Modal.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Modal({
  onClose,
  resetRound,
  currentWords,
  showWordsModal,
  currentWordOnChange,
}) {
  function guessedContent() {
    return (
      <>
        {currentWords.length > 0 ? (
          <>
            <h2 className="list-title">Guessed</h2>
            <ul className="modal-list guessed-list">
              {currentWords.map((word) =>
                word.guessed ? (
                  <li className="modal-list-word-guessed" key={word.word}>
                    <span>{word.word}</span>
                    <span>
                      <FontAwesomeIcon
                        className="fa-icon"
                        icon="arrow-circle-down"
                        onClick={() => currentWordOnChange(word.word)}
                      />
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </>
        ) : (
          <p>No guessed words to display.</p>
        )}
      </>
    );
  }

  function skippedContent() {
    return (
      <>
        {currentWords.length > 0 ? (
          <>
            <h2 className="list-title">Skipped</h2>
            <ul className="modal-list skipped-list">
              {currentWords.map((word) =>
                !word.guessed ? (
                  <li className="modal-list-word-skipped" key={word.word}>
                    <span>{word.word}</span>
                    <span>
                      <FontAwesomeIcon
                        className="fa-icon"
                        icon="arrow-circle-up"
                        onClick={() => currentWordOnChange(word.word)}
                      />{" "}
                    </span>
                  </li>
                ) : null
              )}
            </ul>
          </>
        ) : (
          <p>No skipped words to display.</p>
        )}
      </>
    );
  }
  if (showWordsModal === false) {
    return null;
  } else {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {guessedContent()}
          {skippedContent()}
        </div>
      </div>
    );
  }
}
