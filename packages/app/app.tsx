import { createRoot } from 'react-dom/client';
import App from './index';
import './index.scss';
import '@prison-break-idle/design-system';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

function render() {
  root.render(
    <GoogleOAuthProvider clientId='392410655531-bivc0jk2ht627penukbit1ijp8an4jjm.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>
  );
}

render();
