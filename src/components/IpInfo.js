import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './IpInfo.css'; 

const IpInfo = () => {
  const { ip } = useParams(); // URL에서 전달받은 IP
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://ip-api.com/json/${ip}`)
      .then((response) => response.json())
      .then((data) => setInfo(data))
      .catch((error) => console.error("IP 정보 로드 실패:", error));
  }, [ip]);

  const handleLogoClick = () => {
    navigate('/'); // 로고 클릭 시 홈 화면으로 이동
  };

  return (
    <div className="ip-info-container ipinfo-page">
      <div className="logo-container" onClick={handleLogoClick}>
        <span className="logo">Port Forti</span>
      </div>
      <h2>IP 정보</h2>
      {/* 입력한 IP 먼저 표시 */}
      <p>입력한 IP: {ip}</p>
      {/* API 응답 데이터 표시 */}
      {info ? (
        <>
          <p>API에서 확인된 IP: {info.query}</p>
          <p>국가: {info.country}</p>
          <p>도시: {info.city}</p>
          {/* 필요한 경우 추가 정보 표시 */}
        </>
      ) : (
        <p>IP 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default IpInfo;
