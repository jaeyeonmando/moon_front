import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
  import IpInfo from './components/IpInfo';
  import PortStatus from './components/PortStatus';
  import PortInfo from './components/PortInfo';
  import RiskLevel from './components/RiskLevel';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null); // 데이터 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} logout={logout} />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} />
        
        {/* 홈 및 로그인 관련 페이지 */}
        <Route path="/" element={<Search />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

      </Routes>
    </Router>
  );
};

export default App;
