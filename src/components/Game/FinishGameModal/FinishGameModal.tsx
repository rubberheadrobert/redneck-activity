import {FinishGameModalProps} from "../../../types/index"
import styled from "styled-components";
// Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; 
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal container
const ModalContainer = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background: rgb(95, 153, 183);
  color: whitesmoke;
  padding: 20px;
  border-radius: 8px;
  border: 0.4rem solid rgb(255, 248, 172);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
`;

// Close button
const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

// Score list
const ScoreList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const ScoreContentContainer = styled.div`
  > ${ScoreList} {
    background: rgba(187, 62, 62, 0.5)
  }
`;

const ScoreContainer = styled.div`
  padding: 20px;
  border-radius: 12px;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Styled table
const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// Table header
const TableHeader = styled.th`
  text-align: left;
  padding: 10px;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

// Table row
const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

// Table data
const TableData = styled.td`
  padding: 10px;
  text-align: left;

  &.team-place {
    font-weight: bold;
  }

  &.team-points {
    text-align: left; /* Ensures score is towards the left */
  }
`;

export default function FinishGameModal({onClose, showFinishGameModal, teams}:FinishGameModalProps){
    const sortedTeams = teams.sort((a, b) => (b.teamPoints ?? 0) - (a.teamPoints ?? 0));
     function scoreContent() {
        return (
        <>
             <ScoreContainer>
      <ScoreTable>
        <thead>
          <TableRow>
            <TableHeader>Place</TableHeader>
            <TableHeader>Team</TableHeader>
            <TableHeader>Points</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <TableRow key={index}>
              <TableData className="team-place">{index + 1}.</TableData>
              <TableData>{team.team}</TableData>
              <TableData className="team-points">{team.teamPoints}</TableData>
            </TableRow>
          ))}
        </tbody>
      </ScoreTable>
    </ScoreContainer>
        </>
        )
    }
    if(showFinishGameModal === false){
      return null;
    } else{
        return (
          <ModalOverlay>
            <ModalContainer data-testid="game-finished-modal">
              <CloseButton onClick={onClose}>&times;</CloseButton>
              <h1>Game Finished!</h1>
              <ScoreContentContainer>
                {scoreContent()}
              </ScoreContentContainer>
            </ModalContainer>
          </ModalOverlay>
        );
  } 
}