import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Columns from './components/columns/Columns';
import Login from './components/login/Login';
import ProfilePage from './components/profilePage/ProfilePage';
import { authState, checkAuth } from './components/store/AuthSlice';


function App() {

  const dispatch = useDispatch();
  const { isAuth } = useSelector(authState)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if(!isAuth) {
    return (
      <Login />
    )
  }

  return (
    <>
      <Routes>
        <Route path='/:id' element={<Columns />} />
        <Route path='/' element={<ProfilePage />} />
      </Routes>
    </>
  )
}


export default App;