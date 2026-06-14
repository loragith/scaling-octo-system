import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../apiConfig';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/teams/`;
  // Codespace endpoint example: https://<codespace>-8000.app.github.dev/api/teams/

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams response:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setTeams(payload);
      })
      .catch((fetchError) => {
        console.error('Teams fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Teams</h2>
          <p className="text-muted">Teams data fetched from the Django backend.</p>
          {loading && <p>Loading teams...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && teams.length === 0 && (
            <div className="alert alert-warning">No teams found.</div>
          )}
          {!loading && !error && teams.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Member Count</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id || index}>
                      <td>{index + 1}</td>
                      <td>{team.name || `Team ${index + 1}`}</td>
                      <td>{team.members?.length ?? team.member_count ?? '—'}</td>
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

export default Teams;
