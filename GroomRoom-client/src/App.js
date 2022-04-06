import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/login/Login';
import ProfilePage from './components/profilePage/ProfilePage';
import Room from './components/room/Room';
import { authState, checkAuth } from './components/store/AuthSlice';
import { setIsMobile } from './components/store/ColumnsSlice';


function App() {

  const dispatch = useDispatch();
  const { isAuth } = useSelector(authState);

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

  if (!isAuth) {
    return (
      <Login />
    )
  }

  return (
    <>
      <Routes>
        <Route path='/:id' element={<Room />} />
        <Route path='/' element={<ProfilePage />} />
      </Routes>
    </>
  )
}


export default App;