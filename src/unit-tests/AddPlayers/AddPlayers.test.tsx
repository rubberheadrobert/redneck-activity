// jest.mock('@fortawesome/react-fontawesome', () => ({
//   FontAwesomeIcon: () => <span data-testid='mock-icon' />,
// }));
export {}
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import AddPlayers from '../../components/CreateGame/AddPlayers/AddPlayers'; // Adjust the path as needed
// import { useState } from 'react';
// import { mockComponent } from 'react-dom/test-utils';
// import { Player } from '../../types';
// const mockPlayersLengthOnChange = jest.fn();
// const mockNumOfTeamsOnChange = jest.fn();
// const mockHandleCreateGameSettings = jest.fn();
// const mockPlayersOnChange = jest.fn();

// type WrapperComponentProps = {
//   playersProp: Player[];
//   numOfTeamsProp: number;
// };

// const defaultPlayers = [
//   {
//     id: 1,
//     name: '',
//   },
//   {
//     id: 2,
//     name: '',
//   },
//   {
//     id: 3,
//     name: '',
//   },
//   {
//     id: 4,
//     name: '',
//   },
//   {
//     id: 5,
//     name: '',
//   },
//   {
//     id: 6,
//     name: '',
//   },
// ];

// // playersOnChange: (index: number, newName: string) => void;
// //   players: Player[];
// //   playersLengthOnChange: (value: number) => void;
// //   numOfTeams: number;
// //   numOfTeamsOnChange: (value: number) => void;
// //   handleCreateGameSettings: (event: React.FormEvent | React.MouseEvent) => void;

// function WrapperComponent({
//   playersProp,
//   numOfTeamsProp,
// }: WrapperComponentProps) {
//   const [players, setPlayers] = useState(playersProp);
//   const [numOfTeams, setNumOfTeams] = useState(numOfTeamsProp);

//   return (
//     <MemoryRouter>
//       <AddPlayers
//         players={players}
//         playersOnChange={mockPlayersOnChange}
//         playersLengthOnChange={mockPlayersLengthOnChange}
//         numOfTeams={numOfTeams}
//         numOfTeamsOnChange={mockNumOfTeamsOnChange}
//         handleCreateGameSettings={mockHandleCreateGameSettings}
//       />
//     </MemoryRouter>
//   );
// }

// describe('Add Players Components', () => {
//   const user = userEvent.setup();
//   test('renders heading and sections correctly', async () => {
//     render(
//       <WrapperComponent playersProp={defaultPlayers} numOfTeamsProp={2} />
//     );
//     expect(screen.getByText('Add Players')).toBeInTheDocument();
//     expect(screen.getByText('Number of Players')).toBeInTheDocument();
//     expect(screen.getByText('Number of Teams')).toBeInTheDocument();
//     expect(screen.getAllByPlaceholderText('Player 1 Name...'));
//   });
// });
