import { PuffLoader, BarLoader } from 'react-spinners';

export const Loader = () => (
  <div
    style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}
  >
    <BarLoader color='#5956E3' speedMultiplier={2} />
    <div>Loading...</div>
  </div>
);
