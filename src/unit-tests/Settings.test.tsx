import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Settings from '../components/CreateGame/Settings/Settings'
import CreateGame from '../components/CreateGame/CreateGame'


describe('Settings Page', () => {
    const handleCreateGameSettings = jest.fn();
  const teamsRandomizedOnChange = jest.fn();
  const isSinglePhoneOnChange = jest.fn();

  const mockProps = {
    handleCreateGameSettings,
    game: { /* include only what's needed for the test */ },
    isSinglePhone: true,
    teamsRandomized: true,
    teamsRandomizedOnChange,
    isSinglePhoneOnChange,
  };

    describe('Initial Render', () => {
        test('should render with default team selection as Random', () => {
            render(
                
                    <Settings {...mockProps}/>
                
                
            )

            const randomBtn = screen.getByText('Random');
            const description = screen.getByText(/Teams will be selected randomly/i);
            expect(description).toBeInTheDocument();
        })
    })
})