import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../api';

interface Workout {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  durationMinutes: number;
  category: string;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      const response = await fetch(`${apiBaseUrl}/workouts/`);
      const data = await response.json();
      setWorkouts(Array.isArray(data.workouts) ? data.workouts : data.workouts?.items || []);
      setLoading(false);
    }

    loadWorkouts();
  }, []);

  return (
    <div className="container py-5">
      <h1>Workouts</h1>
      {loading ? (
        <p>Loading workouts...</p>
      ) : (
        <div className="list-group">
          {workouts.map((workout) => (
            <div key={workout._id} className="list-group-item">
              <h5>{workout.title}</h5>
              <p>{workout.description}</p>
              <p>
                {workout.durationMinutes} minutes · {workout.difficulty} · {workout.category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
