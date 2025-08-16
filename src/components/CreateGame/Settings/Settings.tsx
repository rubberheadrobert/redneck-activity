import { useState } from 'react';
import { settingsTexts } from '../../../utils/texts';
import { ROUTES } from '../../../utils/routes';
import { styled } from 'styled-components';
import img from '../../../images/background-turquoise-new.png';
import NextPrevButtons from '../../UI/NextPrevButtons/NextPrevButtons';
import Container from '../../UI/Container/Container';
import ToggleContainer from '../../UI/ToggleContainer/ToggleContainer';
import { SettingsProps } from '../../../types/index';
const darkGreen = '#00b386';
const lightGreen = '#00cc99'; // rgb(0, 204, 153)
const darkOrange = '#ff9900';
// lightOrange = rgb(255, 204, 102)

interface ContainerCompProps {
  selected?: boolean;
}
const Title = styled.h1`
  display: inline-block;
  margin: 0.5rem auto;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  background-color: ${darkGreen};
  color: whitesmoke;
`;

const TeamsToggleButton = styled.button<ContainerCompProps>`
  background-color: ${({ selected, name }) =>
    selected && name == 'teams-random' && '#ffcc66'} !important;
  background-color: ${({ selected, name }) =>
    !selected && name == 'teams-nonrandom' && '#ffcc66'} !important;
`;

const GamesToggleButton = styled.button<ContainerCompProps>`
  background-color: ${({ selected, name }) =>
    selected && name == 'single-phone' && '#ffcc66'} !important;
  background-color: ${({ selected, name }) =>
    !selected && name == 'multiple-phones' && '#ffcc66'} !important;
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
}: SettingsProps) {
  return (
    <Container secondColor='' backgroundImage={img}>
      <Title>Settings</Title>
      <ToggleContainer id='teams-random-container'>
        <h2>Teams</h2>
        <section>
          <TeamsToggleButton
            selected={teamsRandomized}
            onClick={() => teamsRandomizedOnChange(true)}
            name='teams-random'
            data-testid={`teams-random-btn`}
            data-selected={`${teamsRandomized ? true : false}`}
          >
            Random
          </TeamsToggleButton>
          <TeamsToggleButton
            selected={teamsRandomized}
            onClick={() => teamsRandomizedOnChange(false)}
            name='teams-nonrandom'
            data-testid={`teams-nonrandom-btn`}
            data-selected={`${teamsRandomized ? false : true}`}
          >
            Non-random
          </TeamsToggleButton>
        </section>

        <ToggleInformation>
          {teamsRandomized
            ? settingsTexts.teamsRandomized
            : settingsTexts.teamsNotRandomized}
        </ToggleInformation>
      </ToggleContainer>

      <ToggleContainer id='game-type-container'>
        <h2>Game Type</h2>
        <section>
          <GamesToggleButton
            selected={isSinglePhone}
            onClick={() => isSinglePhoneOnChange(true)}
            className={`${isSinglePhone ? 'selected' : ''}`}
            name='single-phone'
            data-testid={`single-phone-btn`}
            data-selected={`${isSinglePhone ? true : false}`}
          >
            Single Phone
          </GamesToggleButton>
          <GamesToggleButton
            selected={isSinglePhone}
            onClick={() => isSinglePhoneOnChange(false)}
            className={`${!isSinglePhone ? true : false}`}
            name='multiple-phones'
            data-testid={`multiple-phones-btn`}
            data-selected={`${!isSinglePhone ? true : false}`}
          >
            Multiple Phones
          </GamesToggleButton>
        </section>
        {/* use this when multiphone logic has been implemented */}
        {/* <ToggleInformation>
          {isSinglePhone
            ? "Game will be played with a single phone"
            : "Each player will play with their own phone"}
        </ToggleInformation> */}
        {/* use this when multiphone logic has NOT been implemented yet */}
        <ToggleInformation>
          {isSinglePhone
            ? settingsTexts.singlePhone
            : settingsTexts.featureNotImplemented}
        </ToggleInformation>
      </ToggleContainer>

      <NextPrevButtons
        prev={ROUTES.HOME}
        next={ROUTES.SETTINGS_SLIDERS}
        buttonOnClick={handleCreateGameSettings}
        isClickable={isSinglePhone}
      />
    </Container>
  );
}
