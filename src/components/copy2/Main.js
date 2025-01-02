import React, { useState } from 'react';
import { useNavigate, useLocation,Route, Routes } from 'react-router-dom';
import IpInfo from './IpInfo';
import PortStatus from './PortStatus';
import PortInfo from './PortInfo';
import RiskLevel from './RiskLevel';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ip = location.state?.ip;

  const [openPorts, setOpenPorts] = useState([]); // openPorts 상태 관리

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <div className="main-page">
      <div className="logo-container" onClick={handleLogoClick}>
        <span className="logo">Port Forti</span>
      </div>
      <div className="content-container">
        {ip ? (
          <>
            <IpInfo ip={ip} /> {/* IP 정보를 렌더링 */}
            <PortStatus ip={ip} setOpenPorts={setOpenPorts} /> {/* openPorts 업데이트 */}
            <PortInfo ip={ip} openPorts={openPorts} /> {/* openPorts를 PortInfo에 전달 */}
            <RiskLevel />
          </>
        ) : (
          <p>IP 주소를 입력해주세요.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
