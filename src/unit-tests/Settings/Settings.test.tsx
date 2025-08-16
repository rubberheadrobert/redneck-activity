jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='mock-icon' />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Settings from '../../components/CreateGame/Settings/Settings'; // Adjust the path as needed
import { useState } from 'react';
import { settingsTexts } from '../../utils/texts';

type WrapperComponentProps = {
  isSinglePhoneProp: boolean;
  teamsRandomizedProp: boolean;
};

function WrapperComponent({
  isSinglePhoneProp,
  teamsRandomizedProp,
}: WrapperComponentProps) {
  const [isSinglePhone, setIsSinglePhone] = useState(isSinglePhoneProp);
  const [teamsRandomized, setTeamsRandomized] = useState(teamsRandomizedProp);

  return (
    <MemoryRouter>
      <Settings
        isSinglePhone={isSinglePhone}
        isSinglePhoneOnChange={setIsSinglePhone}
        teamsRandomized={teamsRandomized}
        teamsRandomizedOnChange={setTeamsRandomized}
        handleCreateGameSettings={() => {}}
      />
    </MemoryRouter>
  );
}
describe('Settings components', () => {
  test('toggles correctly between Random Teams and Non Random Teams', async () => {
    const user = userEvent.setup();
    render(
      <WrapperComponent isSinglePhoneProp={true} teamsRandomizedProp={true} />
    );
    expect(screen.getByText(settingsTexts.teamsRandomized)).toBeInTheDocument();
    const teamsRandomBtn = screen.getByTestId('teams-random-btn');
    const teamsNonRandomBtn = screen.getByTestId('teams-nonrandom-btn');
    expect(teamsRandomBtn).toHaveAttribute('data-selected', 'true');
    await user.click(teamsNonRandomBtn);
    expect(teamsNonRandomBtn).toHaveAttribute('data-selected', 'true');
    expect(teamsRandomBtn).toHaveAttribute('data-selected', 'false');

    await user.click(teamsRandomBtn);
    expect(teamsRandomBtn).toHaveAttribute('data-selected', 'true');
    expect(teamsNonRandomBtn).toHaveAttribute('data-selected', 'false');
  });

  test('toggles correctly between Single Phone and Multiple Phones', async () => {
    const user = userEvent.setup();
    render(
      <WrapperComponent isSinglePhoneProp={true} teamsRandomizedProp={true} />
    );
    expect(screen.getByText(settingsTexts.singlePhone)).toBeInTheDocument();
    const singlePhoneBtn = screen.getByTestId('single-phone-btn');
    const multiplePhonesBtn = screen.getByTestId('multiple-phones-btn');

    expect(singlePhoneBtn).toHaveAttribute('data-selected', 'true');
    await user.click(multiplePhonesBtn);
    expect(multiplePhonesBtn).toHaveAttribute('data-selected', 'true');
    expect(singlePhoneBtn).toHaveAttribute('data-selected', 'false');

    await user.click(singlePhoneBtn);
    expect(singlePhoneBtn).toHaveAttribute('data-selected', 'true');
    expect(multiplePhonesBtn).toHaveAttribute('data-selected', 'false');
  });
});
