import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';

const Body = () => {
  const [ip, setIp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!ip.trim()) {
      setError('IP 주소를 입력하세요.');
      return;
    }
    setError('');
    navigate(`/ip-info/${ip}`);
  };

  return (
    <div className="body">
      <div className="logo">Port Forti</div>
      <div className="input-container">
        <p className="input-example">예시: 192.168.1.1 또는 8.8.8.8</p> {/* 예시 추가 */}
        <input 
          type="text" 
          placeholder="Enter IP Address" 
          value={ip}
          onChange={(e) => setIp(e.target.value)} 
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>} {/* 에러 메시지 표시 */}
    </div>
  );
};

export default Body;
