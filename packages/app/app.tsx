import * as ReactDOM from 'react-dom';
import App from './index';
import './index.scss';
import '../design-system/src/components';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import '../design-system/index.scss';

function render() {
  ReactDOM.render(
    <GoogleOAuthProvider clientId='392410655531-bivc0jk2ht627penukbit1ijp8an4jjm.apps.googleusercontent.com'>
      <App />
    </GoogleOAuthProvider>,
    document.body
  );
}

render();
