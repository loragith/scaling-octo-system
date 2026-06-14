import React from 'react';

function Welcome() {
  return (
    <div className="container py-5">
      <div className="jumbotron bg-light p-5 rounded shadow-sm">
        <h1 className="display-5">Welcome to Octofit Tracker</h1>
        <p className="lead">
          Browse the REST API-driven app using the navigation menu above.
          Select Activities, Leaderboard, Teams, Users, or Workouts to view backend data.
        </p>
        <hr className="my-4" />
        <p>
          This application connects to the Django REST API and displays results from your backend endpoints.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
