export type Cell = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn:number,
  goalsBalance:number,
  efficiency:number,
};

export type Leaderboard = Cell[];

export type dataBoard = {
  name: string,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn:number,
};
