import { Leaderboard, Cell } from '../types/Leaderboard';

const mergeTeamInfo = (home: Cell, away: Cell): Cell => {
  const totalGames = home.totalGames + away.totalGames;
  const totalPoints = home.totalPoints + away.totalPoints;
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  const mergedTeam = {
    name: home.name,
    totalPoints,
    totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency,
  };
  return mergedTeam;
};

export const mergeLeaderboards = (home: Leaderboard, away: Leaderboard): Leaderboard =>
  home.map((homeTeam) => {
    const awayTeam = away.find((team) => team.name === homeTeam.name);
    if (awayTeam) {
      const mergedTeam = mergeTeamInfo(homeTeam, awayTeam);
      return mergedTeam;
    }
    return homeTeam;
  });

export const sortLeaderboard = (leaderboard: Leaderboard): Leaderboard => {
  leaderboard.sort((a, b) =>
    b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsOwn);
  return leaderboard;
};
