
import HomePage from './components/home';
import LoginPage from './components/login';
import SignupPage from './components/register'
import env from 'react-dotenv'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<LoginPage />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
