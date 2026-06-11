import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../api';

interface Team {
  _id: string;
  name: string;
  description: string;
  owner: { name: string };
  members: { name: string }[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      const response = await fetch(`${apiBaseUrl}/teams/`);
      const data = await response.json();
      setTeams(Array.isArray(data.teams) ? data.teams : data.teams?.items || []);
      setLoading(false);
    }

    loadTeams();
  }, []);

  return (
    <div className="container py-5">
      <h1>Teams</h1>
      {loading ? (
        <p>Loading teams...</p>
      ) : (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id} className="list-group-item">
              <h5>{team.name}</h5>
              <p>{team.description}</p>
              <p>Owner: {team.owner?.name || 'Unknown'}</p>
              <p>Members: {team.members?.map((member) => member.name).join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
