import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import ProfilePage from "./components/profilePage/ProfilePage";
import Room from "./components/room/Room";
import { checkAuth } from "./components/store/AuthSlice";
import { setIsMobile } from "./components/store/ColumnsSlice";
import { isMobile } from "react-device-detect";
import { Helmet } from 'react-helmet';
import icon from '../src/components/images/icon.png';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return (
    <>
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>GroomRoom</title>
          <link rel="shortcut icon" href={icon} />
        </Helmet>
        {window.location.href !==
          `${process.env.REACT_APP_BASE_DOMEN}/login` && <Header />}
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:id" element={<Room />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
