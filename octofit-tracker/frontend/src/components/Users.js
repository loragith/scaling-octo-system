import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../apiConfig';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/users/`;

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users response:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setUsers(payload);
      })
      .catch((fetchError) => {
        console.error('Users fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Users</h2>
          <p className="text-muted">User records from the Octofit REST API.</p>
          {loading && <p>Loading users...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && users.length === 0 && (
            <div className="alert alert-warning">No users found.</div>
          )}
          {!loading && !error && users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>{index + 1}</td>
                      <td>{user.username || 'N/A'}</td>
                      <td>{user.email || '—'}</td>
                      <td>{user.team?.name || user.team || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
