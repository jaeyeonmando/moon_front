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
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [ip, setIp] = useState(''); // IP 상태 관리
  const [ports, setPorts] = useState({}); // 포트 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

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
      fetchPortStatus(ip); // IP가 변경될 때마다 포트 상태를 새로 불러옴
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
        {/* 메인 페이지 */}
        <Route path="/main" element={<Main />} />

        {/* 홈 및 로그인 관련 페이지 */}
        <Route path="/" element={<Search setIp={setIp} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        
        {/* IP 정보 및 포트 상태 페이지 */}
        <Route
          path="/ipinfo"
          element={<IpInfo ip={ip} />}
        />
        <Route
          path="/portstatus"
          element={<PortStatus ports={ports} loading={loading} error={error} />}
        />
        <Route
          path="/portinfo"
          element={<PortInfo ports={ports} />}
        />
        {/* 위험도 페이지 */}
        <Route path="/risklevel" element={<RiskLevel />} />
      </Routes>
    </Router>
  );
};

export default App;
