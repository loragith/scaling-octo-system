Let's update the octofit-tracker frontend React components.

- Update the following components to include the React framework to point to the backend REST API:
  - src/App.js
  - src/index.js
  - src/components/Activities.js
  - src/components/Leaderboard.js
  - src/components/Teams.js
  - src/components/Users.js
  - src/components/Workouts.js
- In each component replace the fetch url with the codespace url
  https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/[component]/
  for the Django rest framework backend.
  make sure all components are pulling data from the REST api endpoint
  for display in the REACT frontend
- Make sure to use the correct port and protocol http or https.
- Update src/App.js to include the main navigation for all components.
- Make sure react-router-dom is used for the navigation menu.
- The react app should show the navigation menu and the components.
- Update all components to log the fetched data and make them compatible with both paginated (.results) and plain array responses.
- Add console.log statements to each component to log the fetched data and the REST API endpoints.
