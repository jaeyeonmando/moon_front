import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';

const RiskLevel = () => {
  const riskPercent = 0.78; // 78%

  return (
    <div className="risk-level">
      <h3>위험도 분석</h3>

      {/* 취약성 평가 */}
      <div className="port-severity">
        <h4>CVSS3 점수</h4>
        <div className="bar-container">
          <div className="bar-label">기본 점수 : 6.5</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: '65%' }}></div>
          </div>
          <div className="bar-label">영향 점수: 3.6</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: '36%' }}></div>
          </div>
          <div className="bar-label">착취성 점수: 28</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: '28%' }}></div>
          </div>
        </div>
      </div>

      {/* 인바운드 위험도 게이지 차트 */}
      <div className="gauge-section">
        <h4>위험도 점수</h4>
        <GaugeChart
          id="inbound-gauge"
          nrOfLevels={10}               // 레벨 수
          percent={riskPercent}          // 인바운드 위험도 퍼센트 값
          textColor="#252c31"          // 텍스트 색상
          arcWidth={0.3}                // 게이지 두께
          cornerRadius={0.1}            // 게이지 코너 둥글기
          arcPadding={0.01}             // 구간 사이 여백
          needleColor="#FFFFFF"         // 바늘 색상
          needleBaseColor="#FFFFFF"     // 바늘 기둥 색상
          colors={['#3498db', '#ecf0f1']} // 첫 78%는 파란색, 나머지 22%는 회색
        />
      </div>
    </div>
  );
};

export default RiskLevel;
