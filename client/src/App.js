import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp';
import AccountVerify from './pages/AccountVerify';
import WelcomePage from './pages/WelcomePage';


function App() {
  return (
    <div className='App' >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/account-verify/:id' element={<AccountVerify />} />
          <Route path='/welcome-page/:id' element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
