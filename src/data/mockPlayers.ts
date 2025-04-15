export interface PlayerGame {
  _id?: string;
  playerName: string;
  playerPhoto?: string;
  position: string;
  opponent: string;
  gameType: 'regular' | 'conference' | 'non-conference' | 'playoff' | 'bowl';
  location: 'Home' | 'Away' | 'Neutral';
  date: string;
  season: string;
  result?: string;
  passingYards?: number;
  passingTDs?: number;
  passingInt?: number;
  rushingYards?: number;
  rushingTDs?: number;
  receptions?: number;
  receivingYards?: number;
  receivingTDs?: number;
  tackles?: number;
  sacks?: number;
  interceptions?: number;
}
