import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import './RiskLevel.css';
import Loading from './Loading';  // Loading 컴포넌트 불러오기

const RiskLevel = ({ ip, openPorts }) => {
  //const [services, setServices] = useState([]);  // 서비스 정보 저장
  const [activePort, setActivePort] = useState(null);
  const [riskScores, setServices] = useState([]);  // 리스크 점수 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 오류 상태 관리

  // API 호출하여 위험도 점수 가져오기
  useEffect(() => {
    if (ip && openPorts.length > 0) {
      fetchPortStatus();
    }
  }, [ip, openPorts]);

  const fetchPortStatus = async () => {
    try {
      setLoading(true); // 로딩 시작
      setError(null); // 오류 초기화

      // Django API 호출
      const response = await fetch('http://182.162.109.228:23488/api/scan-services/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip,
          ports: openPorts,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Django API 응답 데이터(Risk):", data);  // 응답 데이터 확인

      // 각 서비스의 CVE 데이터를 리스크 점수로 처리
      setServices(data.services || []);  
    } catch (err) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  // 각 리스크 항목을 gauge 차트로 처리
  const levelLabels = ['낮음(Low)', '보통(Medium)', '높음(High)', '심각(Critical)'];

  return (
    <div className="risk-level">
      <h3>위험도 분석</h3>

      {loading ? (
        <Loading /> // 로딩 중일 때 Loading 컴포넌트 표시
      ) : error ? (
        <p>{error}</p> // 오류 메시지 표시
      ) : (
        <div className="port-severity">
          <h4>CVSS3 점수</h4>
          {riskScores.map((risk, index) => {
            // 기본 점수를 0으로 설정 (데이터가 없을 경우)
            const base_score = risk.base_score || 0;
            const impact_score = risk.impact_score || 0;
            const exploitability_score = risk.exploitability_score || 0;

            // 각 항목에 대해 게이지 차트와 막대 그래프 표시
            const basePercent = base_score ? base_score / 10 : 0.01; // 기본값을 0으로 처리하면 차트가 보이지 않음, 최소 0.01로 설정
            const impactPercent = impact_score ? (impact_score / 10) * 100 : 0.01;
            const exploitabilityPercent = exploitability_score ? (exploitability_score / 10) * 100 : 0.01;

            return (
              <div key={index} className="gauge-section">
                <GaugeChart
                  id={`cvss3-gauge-${index}`}
                  nrOfLevels={4}
                  percent={basePercent}  // base_score 비율을 게이지 차트에 전달
                  textColor="#FFFFFF"
                  arcWidth={0.3}
                  cornerRadius={0.1}
                  arcPadding={0.01}
                  needleColor="#FFFFFF"
                  needleBaseColor="#FFFFFF"
                  colors={['#3498db', '#1abc9c', '#2ecc71', '#a2d729']}
                />
                <div className="gauge-labels">
                  {levelLabels.map((label, idx) => (
                    <span key={idx} className="gauge-label">
                      {label}
                    </span>
                  ))}
                </div>

                <div className="bar-container">
                  <div className="bar-label">기본 점수: {base_score}</div>
                  <div className="bar">
                    <div className="bar-inner" style={{ width: `${basePercent * 100}%` }}></div>
                  </div>
                  <div className="bar-label">영향 점수: {impact_score}</div>
                  <div className="bar">
                    <div className="bar-inner" style={{ width: `${impactPercent}%` }}></div>
                  </div>
                  <div className="bar-label">착취성 점수: {exploitability_score}</div>
                  <div className="bar">
                    <div className="bar-inner" style={{ width: `${exploitabilityPercent}%` }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RiskLevel;
