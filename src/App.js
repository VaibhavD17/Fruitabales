import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/Store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/admin/*' element={<AdminRoutes />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
