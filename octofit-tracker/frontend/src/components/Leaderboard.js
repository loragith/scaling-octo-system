import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../apiConfig';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard response:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setItems(payload);
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Leaderboard</h2>
          <p className="text-muted">Current leaderboard standings from the REST API.</p>
          {loading && <p>Loading leaderboard...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && items.length === 0 && (
            <div className="alert alert-warning">No leaderboard entries found.</div>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((entry, index) => (
                    <tr key={entry.id || index}>
                      <td>{index + 1}</td>
                      <td>{entry.team?.name || entry.team || 'N/A'}</td>
                      <td>{entry.points != null ? entry.points : '—'}</td>
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

export default Leaderboard;
