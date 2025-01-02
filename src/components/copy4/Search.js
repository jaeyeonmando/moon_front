import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

const Search = ({ setIp }) => {
  const [ip, setInputIp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidIp = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleSearch = () => {
    if (!ip.trim()) {
      setError('IP 주소를 입력하세요.');
      return;
    }
    if (!isValidIp(ip)) {
      setError('유효하지 않은 IP 주소입니다.');
      return;
    }
    setError('');
    //setIp(ip); // IP 상태 설정
    navigate('/main' ,{state:{ip}}); // Main 페이지로 이동
  };

  return (
    <div className="Search">
      <div className="logo">Port Forti</div>
      <div className="input-container">
        <p className="input-example">예시: 192.168.1.1 또는 8.8.8.8</p>
        <input
          type="text"
          placeholder="Enter IP Address"
          value={ip}
          onChange={(e) => setInputIp(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
