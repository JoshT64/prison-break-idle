import { AppHeader } from './app-header';
import { Avatar } from '../avatar';

export default {
  title: 'Components/AppHeader',
};

export const Default = () => {
  return (
    <div style={{ background: 'black' }}>
      <AppHeader>
        <Avatar
          size='medium'
          src='https://lh3.googleusercontent.com/a/ACg8ocKLwB4fMgrgJ2KUPyYAv1oRfbMZYKZI4oSqYITlH-fP=s96-c'
        ></Avatar>
      </AppHeader>
    </div>
  );
};
