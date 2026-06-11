import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../api';

interface Activity {
  _id: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
  user: { name: string };
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      const response = await fetch(`${apiBaseUrl}/activities/`);
      const data = await response.json();
      setActivities(Array.isArray(data.activities) ? data.activities : data.activities?.items || []);
      setLoading(false);
    }

    loadActivities();
  }, []);

  return (
    <div className="container py-5">
      <h1>Activities</h1>
      {loading ? (
        <p>Loading activities...</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id} className="list-group-item">
              <h5>{activity.type}</h5>
              <p>
                {activity.durationMinutes} minutes · {activity.caloriesBurned} calories
              </p>
              <p>By: {activity.user?.name || 'Unknown'}</p>
              <small>{new Date(activity.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
