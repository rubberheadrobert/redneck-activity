import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import {CreateGameModalProps} from "../../types/index"

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalComp = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: rgb(130, 54, 214);
  padding: 20px;
  border-radius: 8px;
  width: 70%;
  border: 0.4rem solid whitesmoke;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: whitesmoke;
  h2 {
    margin: 0 0 1rem 0;
  }
  button {
    style: none;
    height: 3rem;
    width: 50%;
    align-self: center;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 1.1rem;
  }
`;



export default function CreateGameModal({
  showCreateGameModal,
  showCreateGameModalOnChange
}: CreateGameModalProps) {
  function clearLocalStorageForWebsite() {
    const website = "https://5tw9fw.csb.app/";
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(website)) {
        localStorage.removeItem(key);
      }
    }
    showCreateGameModalOnChange(false);
  }

  if (showCreateGameModal === false) {
    return null;
  } else {
    return (
      <ModalOverlay>
        <ModalComp>
          <h2>
            Would you like to create a new game, or continue your current one?
          </h2>
          <button onClick={clearLocalStorageForWebsite} type="button">
            New
          </button>
          <button
            onClick={() => showCreateGameModalOnChange(false)}
            type="button"
          >
            Previous
          </button>
        </ModalComp>
      </ModalOverlay>
    );
  }
}
