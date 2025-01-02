import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import IpInfo from './components/IpInfo';
import PortStatus from './components/PortStatus';
import PortInfo from './components/PortInfo';
import RiskLevel from './components/RiskLevel';
import axios from 'axios';
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute import
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState('');
  const [ports, setPorts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fetchPortStatus = async (ip) => {
    try {
      const response = await axios.post('http://182.162.109.228:23488/api/scan/', { ip });
      setPorts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching port status');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ip) {
      fetchPortStatus(ip);
    }
  }, [ip]);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} logout={logout} />
      <Routes>
        {/* Search 화면 */}
        <Route path="/" element={<Search setIp={setIp} />} />

        {/* Main 페이지 (로그인 상태에서만 접근 가능) */}
        <Route path="/main" element={<PrivateRoute element={<div className="main-layout"><Sidebar /><Main /></div>} />} />

        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* 기타 페이지 */}
        <Route path="/ipinfo" element={<IpInfo ip={ip} />} />
        <Route path="/portstatus" element={<PortStatus ports={ports} loading={loading} error={error} />} />
        <Route path="/portinfo" element={<PortInfo ports={ports} />} />
        <Route path="/risklevel" element={<RiskLevel />} />
        <Route path="/risklevel" element={<RiskLevel ip={ip} openPorts={Object.keys(ports)} />} />
      </Routes>
    </Router>
  );
};

export default App;
