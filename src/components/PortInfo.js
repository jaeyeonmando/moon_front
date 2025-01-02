import React, { useState, useEffect } from 'react';
import './PortInfo.css';
import Loading from './Loading';
import RiskLevel from './RiskLevel';

const PortInfo = ({ ip, openPorts }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePort, setActivePort] = useState(null);
  const [combinedScore, setCombinedScore] = useState(0);

  useEffect(() => {
    if (ip && openPorts.length > 0) {
      setActivePort(openPorts[0]);
      fetchPortStatus();
    }
  }, [ip, openPorts]);

  const severityScores = {
    'None': 0,
    'Low': 1,
    'Medium': 2,
    'High': 3,
    'Critical': 5
  };

  const calculateCombinedScore = (severityCounts) => {
    return Object.keys(severityCounts).reduce((acc, severity) => {
      return acc + severityScores[severity] * severityCounts[severity];
    }, 0);
  };

  const countSeverityLevels = (services) => {
    const severityCounts = {
      None: 0,
      Low: 0,
      Medium: 0,
      High: 0,
      Critical: 0,
    };

    // 각 서비스의 severity 값을 확인하고 카운트 추가
    services.forEach(service => {
      const severity = service.vulnerabilities?.[0]?.severity;
      if (severity && severityCounts[severity] !== undefined) {
        severityCounts[severity]++;
      }
    });

    // 총 개수를 20으로 고정
    const totalCount = openPorts.length;
    const countedSeverity = Object.values(severityCounts).reduce((acc, count) => acc + count, 0);

    // 나머지 개수를 None으로
    severityCounts.None = totalCount - countedSeverity;

    return severityCounts;
  };

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
      const servicesData = data.services || [];

      const severityCounts = countSeverityLevels(servicesData);
      const score = calculateCombinedScore(severityCounts);
      setCombinedScore(score);

      setServices(servicesData);
    } catch (err) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePortClick = (port) => {
    setActivePort(port === activePort ? null : port);
  };

  const selectedService = services.find((service) => service.port === activePort);
  const grayColor = '#d3d3d3';

  const severityCounts = countSeverityLevels(services);

  return (
    <div className="port-info-status">
      <div className="port-info-left">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h3>포트 정보</h3>
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

              {selectedService ? (
                <div>
                  <h5>선택된 포트 번호: {selectedService.port}</h5>
                  <h2>서비스: {selectedService.service} <br />
                      버전: {selectedService.version} <br />
                      CVE ID: {selectedService.vulnerabilities?.[0]?.cve_id}</h2>
                  <p>취약점 세부정보: {selectedService.vulnerabilities?.[0]?.description}</p>

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
          </>
        )}
      </div>

      <div className="port-info-right">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h3>
              {selectedService?.vulnerabilities?.[0]?.cve_id ? (
                <>
                  <span style={{ fontSize: '15px' }}>
                    {selectedService.vulnerabilities[0].cve_id}
                  </span>{' '}
                  <span style={{ fontSize: '15px' }}>CVSS3 점수</span>
                </>
              ) : (
                <span style={{ fontSize: '15px' }}>CVSS3 점수</span>
              )}
            </h3>

            {selectedService && (
              <RiskLevel
                baseScore={selectedService.vulnerabilities?.[0]?.base_score || 0}
                impactScore={selectedService.vulnerabilities?.[0]?.impact_score || 0}
                exploitabilityScore={selectedService.vulnerabilities?.[0]?.exploitability_score || 0}
                severity={selectedService.vulnerabilities?.[0]?.severity || '정보 없음'}
              />
            )}

            <div className="vulnerability-score">
              <h3>취약점 종합 점수</h3>
              <div className="circle-chart">
                <div className="circle-background2">
                  <div
                    className="circle-progress2"
                    style={{
                      background: `conic-gradient(${combinedScore === 0 ? grayColor : '#3498db'} ${combinedScore}%, #ecf0f1 0)`,
                    }}
                  ></div>
                </div>
                <div className="circle-text">{combinedScore}%</div>
              </div>
              <h5
                style={{
                  padding: '10px',
                  marginTop: '20px',

                }}
              >
                평균 종합 점수: {combinedScore}점
              </h5>
            </div>

            <div className="vulnerability-levels">
              <table className="score-table">
                <thead>
                  <tr>
                    <th>수준</th>
                    <th>점수</th>
                    <th>갯수</th>
                  </tr>
                </thead>
                <tbody>
                  {['None', 'Low', 'Medium', 'High', 'Critical'].map((severity, index) => (
                    <tr key={index}>
                      <td>{severity}</td>
                      <td>{severityScores[severity]}</td>
                      <td>{severityCounts[severity]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortInfo;
