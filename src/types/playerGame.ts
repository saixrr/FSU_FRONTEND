// types/playerGame.ts

export interface PlayerGame {
    playerName: string;
    playerPhoto?: string;
    position: 'QB' | 'RB' | 'WR' | 'TE' | 'OL' | 'DL' | 'LB' | 'CB' | 'S' | 'K' | 'P';
    opponent: string;
    gameType: 'regular' | 'conference' | 'non-conference' | 'playoff' | 'bowl';
    location: 'Home' | 'Away';
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
    fieldGoalsMade?: number;
    fieldGoalsAttempted?: number;
    extraPointsMade?: number;
    extraPointsAttempted?: number;
  }
  