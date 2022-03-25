import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Columns from './components/columns/Columns';
import Login from './components/login/Login';


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/:id' element={<Columns />} />
        <Route path='/' element={<Navigate replace to={`/login`} />}/>
      </Routes>
    </>
  )
}


export default App;