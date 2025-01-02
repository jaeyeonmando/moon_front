import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';

const RiskLevel = () => {
  return (
    <div className="risk-level">
      <h3>위험도 분석</h3>

      {/* 취약성 평가 */}
      <div className="port-severity">
        <h4>취약성 평가</h4>
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
        <h4>Inbound</h4>
        <GaugeChart
          id="inbound-gauge"
          nrOfLevels={10}               // 레벨 수
          percent={0.78}                // 인바운드 위험도 퍼센트 값
          textColor="#FFFFFF"           // 텍스트 색상
          arcWidth={0.3}                // 게이지 두께
          cornerRadius={0.1}            // 게이지 코너 둥글기
          arcPadding={0.01}             // 구간 사이 여백
          needleColor="#FFFFFF"         // 바늘 색상
          needleBaseColor="#FFFFFF"     // 바늘 기둥 색상
        />
      </div>

      {/* 아웃바운드 위험도 게이지 차트 */}
      <div className="gauge-section">
        <h4>Outbound</h4>
        <GaugeChart
          id="outbound-gauge"
          nrOfLevels={10}               // 레벨 수
          percent={0.89}                // 아웃바운드 위험도 퍼센트 값
          textColor="#FFFFFF"           // 텍스트 색상
          arcWidth={0.3}                // 게이지 두께
          cornerRadius={0.1}            // 게이지 코너 둥글기
          arcPadding={0.01}             // 구간 사이 여백
          needleColor="#FFFFFF"         // 바늘 색상
          needleBaseColor="#FFFFFF"     // 바늘 기둥 색상
        />
      </div>
    </div>
  );
};

export default RiskLevel;
