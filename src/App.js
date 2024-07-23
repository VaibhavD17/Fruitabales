
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<UserRoutes />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/admin/*' element={<AdminRoutes />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
