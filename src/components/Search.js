import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Search.css';

const Search = ({ setIp }) => {
  const [inputIp, setInputIp] = useState(''); // 사용자가 입력한 IP
  const [clientIp, setClientIp] = useState(''); // 클라이언트의 실제 IP
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 클라이언트의 IP 주소를 가져오는 함수
  const fetchClientIp = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setClientIp(response.data.ip); // 실제 클라이언트 IP를 상태에 설정
    } catch (error) {
      console.error("IP 주소를 가져오는 데 실패했습니다:", error);
      setError("IP 주소를 가져오는 데 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchClientIp(); // 컴포넌트가 마운트될 때 클라이언트 IP를 가져옴
  }, []);

  const isValidIp = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleSearch = () => {
    if (!inputIp.trim()) {
      setError('IP 주소를 입력하세요.');
      return;
    }
    if (!isValidIp(inputIp)) {
      setError('유효하지 않은 IP 주소입니다.');
      return;
    }
    setError('');
    navigate('/main', { state: { ip: inputIp } }); // Main 페이지로 이동
  };

  return (
    <div className="Search">
      <div className="logo">Port Forti</div>
      <div className="input-container">
        <h6 className="input-example">IP 주소 및 포트 스캔, 취약점 분석 도구</h6>
        <p className="input-example">
          현재 접속한 아이피: {clientIp || 'IP를 불러오는 중...'} {/* 실제 접속한 IP */}
        </p>
        <input
          type="text"
          placeholder="Enter IP Address"
          value={inputIp}
          onChange={(e) => setInputIp(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
