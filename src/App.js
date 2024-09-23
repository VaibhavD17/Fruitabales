import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { useContext } from 'react';

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        
          <Routes>
            <Route path='/*' element={<UserRoutes />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path='/admin/*' element={<AdminRoutes />}></Route>
            </Route>
          </Routes>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
