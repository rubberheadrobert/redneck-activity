jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='mock-icon' />,
}));

import { render, screen } from '@testing-library/react';
import { mockComponent } from 'react-dom/test-utils';
import { useState } from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddWords from '../../components/CreateGame/AddWords/AddWords';
import { Player } from '../../types';
const mockWordsOnChange = jest.fn();
const mockWordsAmountOnChange = jest.fn();
const mockWordsEditOnChange = jest.fn();
const mockHandleCreateGameSettings = jest.fn();
const mockPlayersLengthOnChange = jest.fn();

const defaultPlayers = [
  {
    id: 1,
    name: '',
  },
  {
    id: 2,
    name: '',
  },
  {
    id: 3,
    name: '',
  },
  {
    id: 4,
    name: '',
  },
  {
    id: 5,
    name: '',
  },
  {
    id: 6,
    name: '',
  },
];

// playersAmount: number;
//   wordsAmount: any;
//   wordsAmountOnChange: (num: any) => void;
//   wordsOnChange: (newWords: any) => void;
//   handleCreateGameSettings: (event: any) => void;
//   players: Player[];
//   wordsEditOnChange: (index: any, newWord: any) => void;
//   playersLengthOnChange: (newLength: any) => void;

type WrapperComponentProps = {
  playersProp: Player[];
  wordsAmountProp: number;
  playersAmountProp: number;
};

function WrapperComponent({
  wordsAmountProp,
  playersProp,
  playersAmountProp,
}: WrapperComponentProps) {
  const [players, setPlayers] = useState(playersProp);
  const [wordsAmount, setWordsAmount] = useState(wordsAmountProp);
  const [playersAmount, setPlayersAmount] = useState(wordsAmountProp);

  return (
    <MemoryRouter>
      <AddWords
        playersAmount={playersAmount}
        wordsAmount={wordsAmount}
        wordsAmountOnChange={mockWordsAmountOnChange}
        wordsOnChange={mockWordsOnChange}
        handleCreateGameSettings={mockHandleCreateGameSettings}
        players={players}
        wordsEditOnChange={mockWordsEditOnChange}
        playersLengthOnChange={mockPlayersLengthOnChange}
      />
    </MemoryRouter>
  );
}

describe('Add Words Component', () => {
  const user = userEvent.setup();
  test('render', async () => {
    render(
      <WrapperComponent
        wordsAmountProp={3}
        playersProp={defaultPlayers}
        playersAmountProp={6}
      />
    );
    expect(screen.getByText('Add Words')).toBeInTheDocument();
  });
});
