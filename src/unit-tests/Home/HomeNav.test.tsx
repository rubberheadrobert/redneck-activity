jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid='mock-icon' />,
}));

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../components/Home/Home'; // Adjust the path as needed
import CreateGame from '../../components/CreateGame/CreateGame'; // Adjust the path as needed

describe('Home navigation', () => {
  test('navigates to Settings page when Create Game button is clicked', async () => {
    const user = userEvent.setup();

    // Render Home with routing context
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/create-game' element={<CreateGame />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the "Create Game" button
    const createGameButton = screen.getByTestId('create-game-btn');
    await user.click(createGameButton);

    // Expect to be on Settings page
    const settingsHeader = await screen.getByText('Settings');
    expect(settingsHeader).toBeInTheDocument();

    const teamsHeader = await screen.getByText('Teams');
    expect(teamsHeader).toBeInTheDocument();

    const gameTypeHeader = await screen.getByText('Game Type');
    expect(gameTypeHeader).toBeInTheDocument();
  });
});
