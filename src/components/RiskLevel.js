import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';

const RiskLevel = ({ baseScore, impactScore, exploitabilityScore, severity }) => {
  // 점수가 없는 경우 기본값을 0으로 설정
  const validBaseScore = baseScore || 0;
  const validImpactScore = impactScore || 0;
  const validExploitabilityScore = exploitabilityScore || 0;

  // 취약점 종합 점수 계산 (평균값이나 다른 방법으로 조정 가능)
  const combinedScore = (validBaseScore + validImpactScore + validExploitabilityScore) / 3;
  
  // 점수를 백분율로 변환 (0 ~ 1)
  const basePercent = validBaseScore / 10;
  const impactPercent = validImpactScore / 10 * 100;
  const exploitabilityPercent = validExploitabilityScore / 10 * 100;

  // Severity 수준에 따른 설정
  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];
  const severityColors = ['#5DADE2', '#3498db', '#2980b9', '#1f618d']; // 푸른색 계열
  const severityIndex = severityLevels.indexOf(severity);
  const severityPercent = severityIndex === 0 ? 12.5 / 100 : severityIndex === 1 ? 37.5 / 100 : severityIndex === 2 ? 62.5 / 100 : 87.5 / 100;

  const grayColor = '#7f8c8d';
  const backgroundColor = severityIndex === -1 ? grayColor : severityColors[severityIndex];
  const severityText = severityIndex === -1 ? '정보 없음' : severity;

  return (
    <div className="risk-level">
      <div className="port-severity">
        <div className="severity-info">
          <h5>현재 심각도: <span style={{ color: '#FFFFFF', backgroundColor: backgroundColor }}>{severityText}</span></h5>
        </div>
        <div className="gauge-section">
          <GaugeChart
            id="cvss3-severity-score"
            nrOfLevels={4}
            percent={severityIndex === -1 ? 0 : severityPercent}
            textColor="none"
            arcWidth={0.3}
            cornerRadius={0.1}
            arcPadding={0.01}
            needleColor="#FFFFFF"
            needleBaseColor="#FFFFFF"
            colors={severityColors}
          />
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-label">기본 점수: {validBaseScore}</div>
        <div className="bar">
          <div className="bar-inner" style={{ width: `${basePercent * 100}%`, backgroundColor: validBaseScore === 0 ? grayColor : '#2980b9' }}></div>
        </div>
        <div className="bar-label">영향 점수: {validImpactScore}</div>
        <div className="bar">
          <div className="bar-inner" style={{ width: `${impactPercent}%`, backgroundColor: validImpactScore === 0 ? grayColor : '#3498db' }}></div>
        </div>
        <div className="bar-label">착취성 점수: {validExploitabilityScore}</div>
        <div className="bar">
          <div className="bar-inner" style={{ width: `${exploitabilityPercent}%`, backgroundColor: validExploitabilityScore === 0 ? grayColor : '#5DADE2' }}></div>
        </div>
      </div>
    </div>
  );
};

export default RiskLevel;
