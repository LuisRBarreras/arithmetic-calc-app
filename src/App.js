import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login';
import Records from './components/records';
import TopSection from './components/topSection';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <TopSection></TopSection>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/records" element={<Records />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
      
  );
}

export default App;
