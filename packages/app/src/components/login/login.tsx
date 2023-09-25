import { GoogleLogin } from '@react-oauth/google';
import { GameStore, useGameStore } from '../../../store/store';
import { Container } from '@prison-break-idle/design-system';

export const Login = () => {
  const login = useGameStore((state: GameStore) => state.login);
  return (
    <Container>
      Login
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          login(credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        type='icon'
        shape='square'
      />
    </Container>
  );
};
