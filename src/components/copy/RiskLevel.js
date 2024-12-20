import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';

const RiskLevel = () => {
  const portNumbers = [
    20, 21, 22, 23, 25, 53, 80, 110, 135, 143, 443, 445, 3389, 3306, 5432, 1521, 8080, 1433, 1434, 1900, 4444,
  ];

  const getPortInfo = (port) => {
    const portDetails = {
      20: { description: 'FTP Data Transfer', risk: '높음' },
      21: { description: 'FTP Control', risk: '높음' },
      22: { description: 'SSH', risk: '중간' },
      23: { description: 'Telnet', risk: '매우 높음' },
      25: { description: 'SMTP', risk: '중간' },
      53: { description: 'DNS', risk: '중간' },
      80: { description: 'HTTP', risk: '중간' },
      110: { description: 'POP3', risk: '중간' },
      135: { description: 'MS RPC', risk: '매우 높음' },
      143: { description: 'IMAP', risk: '중간' },
      443: { description: 'HTTPS', risk: '중간' },
      445: { description: 'Microsoft-DS', risk: '매우 높음' },
      3389: { description: 'RDP', risk: '높음' },
      3306: { description: 'MySQL', risk: '중간' },
      5432: { description: 'PostgreSQL', risk: '중간' },
      1521: { description: 'Oracle DB', risk: '중간' },
      8080: { description: 'HTTP Alternative', risk: '중간' },
      1433: { description: 'MS SQL Server', risk: '높음' },
      1434: { description: 'MS SQL Server Monitor', risk: '높음' },
      1900: { description: 'UPnP', risk: '높음' },
      4444: { description: 'Oracle DB', risk: '매우 높음' },
    };
    return portDetails[port] || { description: 'Unknown Port', risk: '알 수 없음' };
  };

  return (
    <div className="risk-level">
      <h3>위험도</h3>
      {/* 위험도 게이지 차트 */}
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={10}                // 레벨 수
        percent={0.80}                 // 퍼센트 값 (위험도)
        textColor="#FFFFFF"            // 텍스트 색상 (하얀색)
        arcWidth={0.3}                 // 게이지 두께
        cornerRadius={0.1}             // 게이지 코너 둥글기
        arcPadding={0.00}              // 구간 사이 여백
        fontSize={26} 
        needleColor="#FFFFFF" 
        needleBaseColor="#FFFFFF"  
      />
      
      {/* 포트 정보 표 */}
      <div className="port-info">
        <h3>위험도 설명</h3>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>포트 번호</th>
              <th>포트 설명</th>
              <th>위험도</th>
            </tr>
          </thead>
          <tbody>
            {portNumbers.map((port) => {
              const { description, risk } = getPortInfo(port);
              return (
                <tr key={port}>
                  <td>{port}</td>
                  <td>{description}</td>
                  <td>{risk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskLevel;
