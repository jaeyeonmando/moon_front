import React, { useState, useEffect } from 'react';
import './PortInfo.css';
import Loading from './Loading'; // Loading 컴포넌트 불러오기
import RiskLevel from './RiskLevel'; // RiskLevel 컴포넌트 불러오기

const PortInfo = ({ ip, openPorts }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePort, setActivePort] = useState(null);

  useEffect(() => {
    if (ip && openPorts.length > 0) {
      setActivePort(openPorts[0]);
      fetchPortStatus();
    }
  }, [ip, openPorts]);

  const fetchPortStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://182.162.109.228:23488/api/scan-services/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, ports: openPorts }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setServices(data.services || []);
    } catch (err) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePortClick = (port) => {
    setActivePort(port === activePort ? null : port);
  };

  const selectedService = services.find(service => service.port === activePort); // 선택된 서비스 정보

  return (
    <div className="port-info-status">
      <div className="port-info-left">
        <h3>포트 정보</h3>

        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="port-info-card">
            <h4>오픈된 포트 목록</h4>
            <h6>※ 포트를 클릭하면 상세 정보를 확인할 수 있습니다.</h6>
            <div className="port-tags">
              {openPorts.map((port, index) => (
                <div
                  key={index}
                  className={`port-tag ${activePort === port ? 'active' : ''}`}
                  onClick={() => handlePortClick(port)}
                >
                  {port}
                </div>
              ))}
            </div>

            {/* 선택된 서비스에 대한 정보 추가 */}
            {selectedService ? (
              <div>
                <h5>선택된 포트 번호: {selectedService.port}</h5>
                <h2>서비스: {selectedService.service}</h2>
                <h2>버전: {selectedService.version}</h2>
                <p>취약점 세부정보: {selectedService.vulnerabilities?.[0]?.description}</p>

                {/* 취약성 유형 테이블 추가 */}
                <h3>취약성 유형</h3>
                <table className="port-info-table">
                  <tbody>
                    <tr>
                      <td>공격 벡터</td>
                      <td>{selectedService.vulnerabilities?.[0]?.attack_vector}</td>
                    </tr>
                    <tr>
                      <td>공격 복잡성</td>
                      <td>{selectedService.vulnerabilities?.[0]?.attack_complexity}</td>
                    </tr>
                    <tr>
                      <td>필요한 권한</td>
                      <td>{selectedService.vulnerabilities?.[0]?.privileges_required}</td>
                    </tr>
                    <tr>
                      <td>사용자 상호작용</td>
                      <td>{selectedService.vulnerabilities?.[0]?.user_interaction}</td>
                    </tr>
                    <tr>
                      <td>범위</td>
                      <td>{selectedService.vulnerabilities?.[0]?.scope}</td>
                    </tr>
                    <tr>
                      <td>기밀성</td>
                      <td>{selectedService.vulnerabilities?.[0]?.confidentiality_impact}</td>
                    </tr>
                    <tr>
                      <td>무결성</td>
                      <td>{selectedService.vulnerabilities?.[0]?.integrity_impact}</td>
                    </tr>
                    <tr>
                      <td>가용성</td>
                      <td>{selectedService.vulnerabilities?.[0]?.availability_impact}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>선택된 포트에 대한 서비스 정보를 찾을 수 없습니다.</p>
            )}
          </div>
        )}
      </div>

      <div className="port-info-right">
        {/* 취약점 점수 추가 */}
        {selectedService && (
          <RiskLevel
            baseScore={selectedService.vulnerabilities?.[0]?.base_score || 0}
            impactScore={selectedService.vulnerabilities?.[0]?.impact_score || 0}
            exploitabilityScore={selectedService.vulnerabilities?.[0]?.exploitability_score || 0}
            severity={selectedService.vulnerabilities?.[0]?.severity || '정보 없음'}
          />
        )}
      </div>
    </div>
  );
};

export default PortInfo;
