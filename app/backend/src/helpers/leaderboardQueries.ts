export const homeTeamQuery = `
SELECT 
    t.team_name AS name,
    COUNT(t.team_name) AS totalGames,
    CAST(SUM(m.home_team_goals > m.away_team_goals) AS SIGNED) AS totalVictories,
    CAST(SUM(m.home_team_goals = m.away_team_goals) AS SIGNED) AS totalDraws,
    CAST(SUM(m.home_team_goals < m.away_team_goals) AS SIGNED) AS totalLosses,
    CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsFavor,
    CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsOwn,
    CAST(SUM(m.home_team_goals) - SUM(m.away_team_goals)AS SIGNED) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m 
    INNER JOIN 
    TRYBE_FUTEBOL_CLUBE.teams AS t
    ON t.id = m.home_team
WHERE
    m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC , goalsOwn DESC;`;

export const awayTeamQuery = `
SELECT 
    t.team_name AS name,
    COUNT(t.team_name) AS totalGames,
    CAST(SUM(m.home_team_goals < m.away_team_goals) AS SIGNED) AS totalVictories,
    CAST(SUM(m.home_team_goals = m.away_team_goals) AS SIGNED) AS totalDraws,
    CAST(SUM(m.home_team_goals > m.away_team_goals) AS SIGNED) AS totalLosses,
    CAST(SUM(m.away_team_goals) AS SIGNED) AS goalsFavor,
    CAST(SUM(m.home_team_goals) AS SIGNED) AS goalsOwn,
    CAST(SUM(m.away_team_goals) - SUM(m.home_team_goals)AS SIGNED) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.matches AS m 
    INNER JOIN 
    TRYBE_FUTEBOL_CLUBE.teams AS t
    ON t.id = m.away_team
WHERE
    m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC , goalsOwn DESC;`;
