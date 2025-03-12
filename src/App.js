import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import { Provider } from 'react-redux';
import { store, storeData } from './redux/Store';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const { store, persistor } = storeData()
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path='/*' element={<UserRoutes />}></Route>
            <Route element={<PrivateRoutes />}>
              <Route path='/admin/*' element={<AdminRoutes />}></Route>
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
