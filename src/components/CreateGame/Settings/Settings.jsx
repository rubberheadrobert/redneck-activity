import { useState } from "react";

import { styled } from "styled-components";
import img from "../../../images/background-turquoise-new.png";
import NextPrevButtons from "../../UI/NextPrevButtons/NextPrevButtons";
import Container from "../../UI/Container/Container";
import ToggleContainer from "../../UI/ToggleContainer/ToggleContainer";
const darkGreen = "#00b386";
const lightGreen = "#00cc99"; // rgb(0, 204, 153)
const darkOrange = "#ff9900";
// lightOrange = rgb(255, 204, 102)

const Title = styled.h1`
  display: inline-block;
  margin: 0.5rem auto;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  background-color: ${darkGreen};
  color: whitesmoke;
`;

const TeamsToggleButton = styled.button`
  background-color: ${({ selected, name }) =>
    selected && name == "teams-random" && "#ffcc66"} !important;
  background-color: ${({ selected, name }) =>
    !selected && name == "teams-nonrandom" && "#ffcc66"} !important;
`;

const GamesToggleButton = styled.button`
  background-color: ${({ selected, name }) =>
    selected && name == "single-phone" && "#ffcc66"} !important;
  background-color: ${({ selected, name }) =>
    !selected && name == "multiple-phones" && "#ffcc66"} !important;
`;

const ToggleInformation = styled.p`
  font-size: 0.7rem;
  background-color: ${darkGreen};
  box-shadow: 0 0 10px rgb(255, 204, 102);
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

export default function Settings({
  teamsRandomized,
  teamsRandomizedOnChange,
  isSinglePhone,
  isSinglePhoneOnChange,
  handleCreateGameSettings,
}) {
  return (
    <Container backgroundImage={img}>
      <Title>Settings</Title>
      <ToggleContainer>
        <h2>Teams</h2>
        <section>
          <TeamsToggleButton
            selected={teamsRandomized}
            onClick={() => teamsRandomizedOnChange(true)}
            name="teams-random"
          >
            Random
          </TeamsToggleButton>
          <TeamsToggleButton
            selected={teamsRandomized}
            onClick={() => teamsRandomizedOnChange(false)}
            name="teams-nonrandom"
          >
            Non-random
          </TeamsToggleButton>
        </section>

        <ToggleInformation>
          {teamsRandomized
            ? "Teams will be selected randomly."
            : "Teams will be selected by players."}
        </ToggleInformation>
      </ToggleContainer>

      <ToggleContainer>
        <h2>Game Type</h2>
        <section>
          <GamesToggleButton
            selected={isSinglePhone}
            onClick={() => isSinglePhoneOnChange(true)}
            className={`${isSinglePhone ? "selected" : ""}`}
            name="single-phone"
          >
            Single Phone
          </GamesToggleButton>
          <GamesToggleButton
            selected={isSinglePhone}
            onClick={() => isSinglePhoneOnChange(false)}
            className={`${!isSinglePhone ? "selected" : ""}`}
            name="multiple-phones"
          >
            Multiple Phones
          </GamesToggleButton>
        </section>
        <ToggleInformation>
          {isSinglePhone
            ? "Game will be played with a single phone"
            : "Each player will play with their own phone"}
        </ToggleInformation>
      </ToggleContainer>

      <NextPrevButtons
        prev="home"
        next="settings-sliders"
        buttonOnClick={handleCreateGameSettings}
      />
    </Container>
  );
}
