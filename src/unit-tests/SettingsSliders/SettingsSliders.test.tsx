jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='mock-icon' />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SettingsSliders from '../../components/CreateGame/SettingsSliders/SettingsSliders'; // Adjust the path as needed
import { useState } from 'react';
import { mockComponent } from 'react-dom/test-utils';
const mockSecondsRoundOnChange = jest.fn();
const mockWordsAmountOnChange = jest.fn();
const mockHandleCreateGameSettings = jest.fn();

type WrapperComponentProps = {
  secondsRoundProp: number;
  wordsAmountProp: number;
};

function WrapperComponent({
  secondsRoundProp,
  wordsAmountProp,
}: WrapperComponentProps) {
  const [secondsRound, setSecondsRound] = useState(secondsRoundProp);
  const [wordsAmount, setWordsAmount] = useState(wordsAmountProp);

  return (
    <MemoryRouter>
      <SettingsSliders
        handleCreateGameSettings={mockHandleCreateGameSettings}
        secondsRound={secondsRound}
        secondsRoundOnChange={mockSecondsRoundOnChange}
        wordsAmount={wordsAmount}
        wordsAmountOnChange={mockWordsAmountOnChange}
      />
    </MemoryRouter>
  );
}

describe('Settings Sliders Components', () => {
  const user = userEvent.setup();
  test('renders round length and words amount sliders with labels', async () => {
    render(<WrapperComponent secondsRoundProp={30} wordsAmountProp={5} />);

    expect(screen.getByText('Round Length')).toBeInTheDocument();
    const roundsSlider = screen.getByLabelText('Round Length');
    const wordsSlider = screen.getByLabelText('Words Amount');
    expect(roundsSlider).toBeInTheDocument();
    expect(wordsSlider).toBeInTheDocument();
  });

  test('displays correct slider values', async () => {
    render(<WrapperComponent secondsRoundProp={30} wordsAmountProp={5} />);

    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('calls secondsRoundOnChange when round length slider is changed', async () => {
    render(<WrapperComponent secondsRoundProp={30} wordsAmountProp={5} />);
    const roundsSlider = screen.getByLabelText('Round Length');
    await user.click(roundsSlider);

    await user.keyboard('{ArrowRight}');
    expect(mockSecondsRoundOnChange).toHaveBeenCalled();
  });

  test('calls wordsAmountOnChange when words amount slider is changed', async () => {
    render(<WrapperComponent secondsRoundProp={30} wordsAmountProp={5} />);
    const wordsSlider = screen.getByLabelText('Words Amount');
    await user.click(wordsSlider);

    await user.keyboard('{ArrowRight}');
    expect(mockWordsAmountOnChange).toHaveBeenCalled();
  });

  test('clicking next button calls handleCreateGameSettings', async () => {
    render(<WrapperComponent secondsRoundProp={30} wordsAmountProp={5} />);
    const nextButton = screen.getByLabelText('to-players');
    await user.click(nextButton);

    expect(mockHandleCreateGameSettings).toHaveBeenCalled();
  });
});
