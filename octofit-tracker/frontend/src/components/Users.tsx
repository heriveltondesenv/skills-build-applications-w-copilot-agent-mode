import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(`${apiBaseUrl}/users/`);
      const data = await response.json();
      setUsers(Array.isArray(data.users) ? data.users : data.users?.items || []);
      setLoading(false);
    }

    loadUsers();
  }, []);

  return (
    <div className="container py-5">
      <h1>Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div key={user._id} className="list-group-item">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
