import { ReactNode } from 'react';

export interface TeamName {
  name: string;
}

export interface Team {
  oldName: string;
  name: string;
}

export interface Player {
  id: number;
  name: string;
}

export interface PlayerInTeam {
  name: string;
  teamIndex: number;
}

export interface PlayersInTeam {
  team: string;
  players: PlayerInTeam[];
}

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
