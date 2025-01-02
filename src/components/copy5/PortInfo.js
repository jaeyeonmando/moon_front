import React, { useState, useEffect } from 'react';
import './PortInfo.css';
import Loading from './Loading';  // Loading 컴포넌트 불러오기

const PortInfo = ({ ip, openPorts }) => {
  const [services, setServices] = useState([]);  // 서비스 정보 저장
  const [loading, setLoading] = useState(true);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 오류 상태 관리
  const [activePort, setActivePort] = useState(null);  // 클릭된 포트를 추적하는 상태

  useEffect(() => {
    if (ip && openPorts.length > 0) {
      setActivePort(openPorts[0]);  // 첫 번째 열린 포트를 기본적으로 활성화
      fetchPortStatus();  // IP와 오픈된 포트가 있으면 API 호출
    }
  }, [ip, openPorts]);

  const fetchPortStatus = async () => {
    try {
      setLoading(true);  // 로딩 시작
      setError(null);  // 오류 초기화

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
      console.log("Django API 응답 데이터:", data);  // 응답 데이터 확인

      // 서비스 정보 업데이트
      setServices(data.services || []);
      
    } catch (err) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);  // 로딩 끝
    }
  };

  const handlePortClick = (port) => {
    setActivePort(port === activePort ? null : port);  // 클릭된 포트가 이미 활성화된 상태라면 비활성화
  };

  return (
    <div className="port-info-status">
      <h3>포트 정보</h3>

      {loading ? (
        <Loading />  // 로딩 중일 때 Loading 컴포넌트 표시
      ) : error ? (
        <p>{error}</p>  // 오류 메시지 표시
      ) : (
        <div className="port-info-card">
          <h4>오픈된 포트 목록</h4>
          <h6>※ 포트를 클릭하면 상세 정보를 확인할 수 있습니다.</h6>  {/* 클릭 메시지 추가 */}
          <div className="port-tags">
            {/* openPorts 배열을 사용하여 포트 태그를 만들고 클릭 시 active 상태를 변경 */}
            {openPorts.map((port, index) => (
              <div
                key={index}
                className={`port-tag ${activePort === port ? 'active' : ''} ${port === 'filtered' ? 'filtered' : ''} ${port === 'open' ? 'open' : ''}`}
                onClick={() => handlePortClick(port)} // 클릭 시 activePort 상태 변경
              >
                {port}
              </div>
            ))}
          </div>

          {services.length > 0 && activePort !== null ? (
            services
              .filter(service => service.port === activePort) // 선택된 포트에 해당하는 서비스만 필터링
              .map((service, index) => (
                <div key={index}>
                  <h5>선택된 포트 번호: {service.port}</h5>

                  {/* 서비스 이름과 버전, 취약점 세부정보를 취약점 세부정보 위로 이동 */}
                  <h2>서비스: {service.service}</h2>
                  <h2>버전: {service.version}</h2>
                  <p>취약점 세부정보: {service.vulnerabilities && service.vulnerabilities[0]?.description}</p> {/* 취약점 설명 */}

                  <h3>취약성 유형</h3>
                  <table className="port-info-table">
                    <tbody>
                      <tr>
                        <td>공격 벡터</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.attack_vector}</td>
                      </tr>
                      <tr>
                        <td>공격 복잡성</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.attack_complexity}</td>
                      </tr>
                      <tr>
                        <td>필요한 권한</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.privileges_required}</td>
                      </tr>
                      <tr>
                        <td>사용자 상호작용</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.user_interaction}</td>
                      </tr>
                      <tr>
                        <td>범위</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.scope}</td>
                      </tr>
                      <tr>
                        <td>기밀성</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.confidentiality_impact}</td>
                      </tr>
                      <tr>
                        <td>무결성</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.integrity_impact}</td>
                      </tr>
                      <tr>
                        <td>가용성</td>
                        <td>{service.vulnerabilities && service.vulnerabilities[0]?.availability_impact}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
          ) : (
            <p>선택된 포트에 대한 서비스 정보를 찾을 수 없습니다.</p>  // 데이터가 없을 때 표시
          )}
        </div>
      )}
    </div>
  );
};

export default PortInfo;
