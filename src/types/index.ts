import { ReactNode } from 'react';
import {ADD_TEAMS_CONSTS} from "../utils/constants"


export interface Team {
  oldName: string;
  name: string;
}

export interface Player {
   [ADD_TEAMS_CONSTS.NAME]: string;
    [ADD_TEAMS_CONSTS.TEAM_INDEX]: number;
  points?: number; 
  isNext?: boolean
}

export interface PlayerInTeam {
  name: string;
  teamIndex: number;
  points?: number;
  isNext?: boolean
}

export interface PlayersInTeam {
  team: string;
  players: PlayerInTeam[];
  teamPoints?: number;
}

type TeamType = PlayersInTeam

export interface AddWordsProps {
  playersAmount: number;
  wordsAmount: any;
  wordsAmountOnChange: (num: any) => void;
  wordsOnChange: (newWords: any) => void;
  handleCreateGameSettings: (event: any) => void;
  players: Player[];
  wordsEditOnChange: (index: any, newWord: any) => void;
  playersLengthOnChange: (newLength: any) => void;
}

export interface ContainerCompProps {
  backgroundImage?: string;
  secondColor?: string;
}

export interface ContainerProps {
  children: ReactNode;
  backgroundImage: string;
  secondColor: string;
}

export interface ToggleContainerProps {
  children: ReactNode;
  id: string;
}

export interface CreateGameModalProps {
  showCreateGameModal: boolean;
  showCreateGameModalOnChange: (bool: boolean) => void;
}

export interface SettingsProps {
  teamsRandomized: boolean;
  teamsRandomizedOnChange: (value: boolean) => void;
  isSinglePhone: boolean;
  isSinglePhoneOnChange: (value: boolean) => void;
  handleCreateGameSettings: (event: React.FormEvent | React.MouseEvent) => void;
}

export interface SettingsSlidersProps {
  secondsRound: number;
  secondsRoundOnChange: (value: number) => void;
  wordsAmount: number;
  wordsAmountOnChange: (value: number) => void;
  handleCreateGameSettings: (event: React.FormEvent | React.MouseEvent) => void;
}

export interface AddPlayersProps {
  playersOnChange: (index: number, newName: string) => void;
  players: Player[];
  playersLengthOnChange: (value: number) => void;
  numOfTeams: number;
  numOfTeamsOnChange: (value: number) => void;
  handleCreateGameSettings: (event: React.FormEvent | React.MouseEvent) => void;
}

export interface PlayerInputProps {
  key: number;
  addToPlayers: (index: number, newName: string) => void;
  index: number;
  placeholder: string;
  startValue: string;
  name: string;
}

export interface AddTeamsProps {
  numOfTeams: number
  playersArray: Player[]
  playersAllOnChange: (value: Player[]) => void
  teamNames: string[]
  teamNameOnChange: (index: number, name: string) => void
  shownOptionsOnChange: (value: string) => void
  playersInTeamsOnChange: (teams: PlayersInTeam[]) => void;
  handleCreateGameSettings: (event: React.FormEvent | React.MouseEvent) => void;
}

export interface GameProps {
  words: string[]
  shownOptionsOnChange: (value: string) => void
  playersInTeams: PlayersInTeam[]
  secondsRound: number
}

export interface GameWord {
  word: string
  isGuessed: boolean
}

export interface ModalProp {
  onClose: () => void
  currentWords: GameWord[]
  showWordsModal: boolean
  currentWordOnChange: (wordToChange: string) => void
}

export interface ShowScoreModalProps {
  onClose: () => void
  showScoreModal: boolean
  teams: PlayersInTeam[] 
}

export interface FinishGameModalProps {
  onClose: () => void
  showFinishGameModal: boolean
  teams: PlayersInTeam[]
}
