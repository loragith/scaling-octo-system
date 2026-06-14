import React, { useEffect, useState } from 'react';
import getApiBaseUrl from '../apiConfig';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/activities/`;

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities response:', data);
        const payload = Array.isArray(data) ? data : data.results || [];
        setActivities(payload);
      })
      .catch((fetchError) => {
        console.error('Activities fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Activities</h2>
          <p className="text-muted">Displaying the latest activity data from the Octofit backend.</p>
          {loading && <p>Loading activities...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && activities.length === 0 && (
            <div className="alert alert-warning">No activities found.</div>
          )}
          {!loading && !error && activities.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <td>{index + 1}</td>
                      <td>{activity.name || activity.title || 'N/A'}</td>
                      <td>{activity.description || activity.detail || '—'}</td>
                      <td>
                        <code>{JSON.stringify(activity, null, 2)}</code>
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

export default Activities;
