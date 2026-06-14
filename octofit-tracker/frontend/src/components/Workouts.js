import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../apiConfig';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/workouts/`;

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts response:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setWorkouts(payload);
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Workouts</h2>
          <p className="text-muted">Workout details pulled from the backend API.</p>
          {loading && <p>Loading workouts...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && workouts.length === 0 && (
            <div className="alert alert-warning">No workouts found.</div>
          )}
          {!loading && !error && workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Duration</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id || index}>
                      <td>{index + 1}</td>
                      <td>{workout.name || workout.title || 'N/A'}</td>
                      <td>{workout.duration || workout.length || '—'}</td>
                      <td>
                        <code>{JSON.stringify(workout, null, 2)}</code>
                      </td>
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

export default Workouts;
