const getApiBaseUrl = () => {
  const { REACT_APP_CODESPACE_NAME } = process.env;
  const host = window.location.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';

  if (REACT_APP_CODESPACE_NAME) {
    return `https://${REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
  }

  if (!isLocalhost && host.endsWith('.app.github.dev')) {
    const codespaceName = host.replace(/-3000\.app\.github\.dev$/, '');
    if (codespaceName !== host) {
      return `https://${codespaceName}-8000.app.github.dev/api`;
    }
  }

  return 'http://localhost:8000/api';
};

export default getApiBaseUrl;
