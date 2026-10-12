import Papa from 'papaparse';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const loadDataFromFiles = async (matchesFile, deliveriesFile) => {
  const matches = await parseCSV(matchesFile);
  const deliveries = await parseCSV(deliveriesFile);
  return { matches, deliveries };
};

// Analysis functions
export const getMatchesByYear = (matches) => {
  const yearMap = {};
  matches.forEach(match => {
    const year = match.season || 'Unknown';
    yearMap[year] = (yearMap[year] || 0) + 1;
  });
  return Object.entries(yearMap).map(([season, count]) => ({
    season,
    matches: count
  }));
};

export const getTeamWinStats = (matches) => {
  const teamStats = {};
  matches.forEach(match => {
    if (match.winner && match.winner !== 'NA') {
      const team = match.winner;
      if (!teamStats[team]) {
        teamStats[team] = { wins: 0, losses: 0 };
      }
      teamStats[team].wins++;
    }
    
    // Count losses
    const team1 = match.team1;
    const team2 = match.team2;
    if (team1 && team1 !== match.winner) {
      if (!teamStats[team1]) {
        teamStats[team1] = { wins: 0, losses: 0 };
      }
      teamStats[team1].losses++;
    }
    if (team2 && team2 !== match.winner) {
      if (!teamStats[team2]) {
        teamStats[team2] = { wins: 0, losses: 0 };
      }
      teamStats[team2].losses++;
    }
  });

  return Object.entries(teamStats)
    .map(([team, stats]) => ({
      team,
      wins: stats.wins,
      losses: stats.losses,
      total: stats.wins + stats.losses
    }))
    .sort((a, b) => b.wins - a.wins);
};

export const getTopBatsmen = (deliveries) => {
  const batsmenStats = {};
  deliveries.forEach(delivery => {
    const batter = delivery.batter;
    if (batter && batter !== 'NA') {
      if (!batsmenStats[batter]) {
        batsmenStats[batter] = { runs: 0, balls: 0 };
      }
      batsmenStats[batter].runs += delivery.total_runs || 0;
      batsmenStats[batter].balls += 1;
    }
  });

  return Object.entries(batsmenStats)
    .map(([batter, stats]) => ({
      batter,
      runs: stats.runs,
      balls: stats.balls,
      strikeRate: ((stats.runs / stats.balls) * 100).toFixed(2),
      average: (stats.runs / stats.balls).toFixed(2)
    }))
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 15);
};

export const getTopBowlers = (deliveries) => {
  const bowlerStats = {};
  deliveries.forEach(delivery => {
    const bowler = delivery.bowler;
    if (bowler && bowler !== 'NA') {
      if (!bowlerStats[bowler]) {
        bowlerStats[bowler] = { wickets: 0, runs: 0, balls: 0 };
      }
      bowlerStats[bowler].runs += delivery.total_runs || 0;
      bowlerStats[bowler].balls += 1;
      if (delivery.is_wicket === 1 || delivery.is_wicket === '1') {
        bowlerStats[bowler].wickets++;
      }
    }
  });

  return Object.entries(bowlerStats)
    .map(([bowler, stats]) => ({
      bowler,
      wickets: stats.wickets,
      runs: stats.runs,
      balls: stats.balls,
      economy: ((stats.runs / (stats.balls / 6)) || 0).toFixed(2)
    }))
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 15);
};

export const getWinByVenue = (matches) => {
  const venueStats = {};
  matches.forEach(match => {
    const venue = match.venue || 'Unknown';
    if (!venueStats[venue]) {
      venueStats[venue] = { matches: 0, runsWins: 0, wicketsWins: 0 };
    }
    venueStats[venue].matches++;
    
    if (match.result === 'runs') {
      venueStats[venue].runsWins++;
    } else if (match.result === 'wickets') {
      venueStats[venue].wicketsWins++;
    }
  });

  return Object.entries(venueStats)
    .map(([venue, stats]) => ({
      venue,
      ...stats,
      runsPercentage: ((stats.runsWins / stats.matches) * 100).toFixed(1),
      wicketsPercentage: ((stats.wicketsWins / stats.matches) * 100).toFixed(1)
    }))
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 10);
};

export const getRunsPerOver = (deliveries) => {
  const oversData = {};
  deliveries.forEach(delivery => {
    const over = delivery.over || 0;
    if (!oversData[over]) {
      oversData[over] = { runs: 0, deliveries: 0 };
    }
    oversData[over].runs += delivery.total_runs || 0;
    oversData[over].deliveries += 1;
  });

  return Object.entries(oversData)
    .map(([over, stats]) => ({
      over: parseInt(over),
      avgRuns: (stats.runs / stats.deliveries).toFixed(2),
      totalRuns: stats.runs
    }))
    .sort((a, b) => a.over - b.over);
};

export const getTossDecisionImpact = (matches) => {
  const tossStats = { bat: { wins: 0, total: 0 }, field: { wins: 0, total: 0 } };
  
  matches.forEach(match => {
    const decision = (match.toss_decision || 'unknown').toLowerCase();
    if (decision === 'bat' || decision === 'field') {
      tossStats[decision].total++;
      if (match.winner === match.toss_winner) {
        tossStats[decision].wins++;
      }
    }
  });

  return [
    {
      decision: 'Bat',
      wins: tossStats.bat.wins,
      total: tossStats.bat.total,
      winPercentage: tossStats.bat.total > 0 ? ((tossStats.bat.wins / tossStats.bat.total) * 100).toFixed(1) : 0
    },
    {
      decision: 'Field',
      wins: tossStats.field.wins,
      total: tossStats.field.total,
      winPercentage: tossStats.field.total > 0 ? ((tossStats.field.wins / tossStats.field.total) * 100).toFixed(1) : 0
    }
  ];
};

export const getMatchResultTypes = (matches) => {
  const resultTypes = {};
  matches.forEach(match => {
    const result = match.result || 'Unknown';
    resultTypes[result] = (resultTypes[result] || 0) + 1;
  });

  return Object.entries(resultTypes).map(([type, count]) => ({
    type,
    count,
    percentage: ((count / matches.length) * 100).toFixed(1)
  }));
};
