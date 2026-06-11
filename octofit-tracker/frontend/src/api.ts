const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Use VITE_CODESPACE_NAME to build a Codespaces-specific API URL.
// Define VITE_CODESPACE_NAME in .env.local when running in GitHub Codespaces.
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const apiBaseUrl = `${apiHost}/api`;
export const codespaceApiHost = apiHost;
