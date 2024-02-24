import { lazy } from 'react';
const Home = lazy(() => import('./pages/Home'));

function App() {
  return <Home />;
}

export default App;
