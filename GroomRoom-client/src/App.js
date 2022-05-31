import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/login/Login';
import ProfilePage from './components/profilePage/ProfilePage';
import Room from './components/room/Room';
import { checkAuth } from './components/store/AuthSlice';
import { setIsMobile } from './components/store/ColumnsSlice';


function App() {

  const dispatch = useDispatch();

  const checkIsMobile = useCallback(() => {
    if (window.innerWidth <= 960) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
  }, [dispatch])

  useEffect(() => checkIsMobile, [checkIsMobile]);

  window.addEventListener('resize', checkIsMobile);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  return (
    <>
      <div className='app'>
        {window.location.href !== `${process.env.REACT_APP_BASE_DOMEN}/login` && <Header />}
        <Routes>
          <Route path='/' element={<ProfilePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:id' element={<Room />} />
        </Routes>
      </div>

    </>
  )
}


export default App;