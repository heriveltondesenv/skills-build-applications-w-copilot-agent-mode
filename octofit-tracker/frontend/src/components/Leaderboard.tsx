import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../api';

interface LeaderboardEntry {
  _id: string;
  rank: number;
  score: number;
  weeklyPoints: number;
  user: { name: string };
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      const response = await fetch(`${apiBaseUrl}/leaderboard/`);
      const data = await response.json();
      setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : data.leaderboard?.items || []);
      setLoading(false);
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="container py-5">
      <h1>Leaderboard</h1>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : (
        <div className="list-group">
          {leaderboard.map((entry) => (
            <div key={entry._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{entry.rank}. {entry.user?.name || 'Unknown'}</h5>
                <p>Score: {entry.score}</p>
                <small>{entry.weeklyPoints} weekly points</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
