import { GoogleLogin } from '@react-oauth/google';
import { Container } from '@prison-break-idle/design-system';
import { useStore } from '../main-menu/useStore';

export const Login = () => {
  const { login } = useStore();

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
