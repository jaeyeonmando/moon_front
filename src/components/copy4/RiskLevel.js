import React from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';

const RiskLevel = ({ baseScore, impactScore, exploitabilityScore }) => {
  const basePercent = baseScore / 10; // 기본 점수를 백분율로 변환 (0 ~ 1)
  const impactPercent = impactScore / 10 * 100; // 영향 점수 백분율 (0 ~ 100%)
  const exploitabilityPercent = exploitabilityScore / 10 * 100; // 착취성 점수 백분율 (0 ~ 100%)

  return (
    <div className="risk-level">
      <h3>위험도 분석</h3>

      {/* CVSS3 점수 및 취약성 평가 */}
      <div className="port-severity">
        <h4>CVSS3 점수</h4>
        <div className="gauge-section">
          <GaugeChart
            id="cvss3-gauge"
            nrOfLevels={5} // 레벨 수
            percent={basePercent} // CVSS3 점수 비율 (0 ~ 1)
            textColor="#FFFFFF" // 텍스트 색상
            arcWidth={0.3} // 게이지 두께
            cornerRadius={0.1} // 게이지 코너 둥글기
            arcPadding={0.01} // 구간 사이 여백
            needleColor="#FFFFFF" // 바늘 색상
            needleBaseColor="#FFFFFF" // 바늘 기둥 색상
            colors={['#3498db', '#ecf0f1']} // 색상: 파란색, 회색
          />
        </div>

        {/* 점수 평가 막대 */}
        <div className="bar-container">
          <div className="bar-label">기본 점수: {baseScore}</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: `${basePercent * 100}%` }}></div>
          </div>
          <div className="bar-label">영향 점수: {impactScore}</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: `${impactPercent}%` }}></div>
          </div>
          <div className="bar-label">착취성 점수: {exploitabilityScore}</div>
          <div className="bar">
            <div className="bar-inner" style={{ width: `${exploitabilityPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* 취약점 점수 */}
      <div className="vulnerability-score">
        <h4>취약점 점수</h4>
        <div className="circle-chart">
          <div className="circle-background">
            <div
              className="circle-progress"
              style={{
                background: `conic-gradient(#e74c3c ${basePercent * 100}%, #ecf0f1 0)`
              }}
            ></div>
          </div>
          <div className="circle-text">{(basePercent * 100).toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
};

export default RiskLevel;
