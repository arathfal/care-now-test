import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import paths from './constants/paths';
import Treatment from './pages/Treatment';
import TreatmentCreate from './pages/TreatmentCreate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={() => <Navigate to={paths.TREATMENT} />} />
        <Route path={paths.TREATMENT} Component={Treatment} />
        <Route path={paths.TREATMENT_CREATE} Component={TreatmentCreate} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
