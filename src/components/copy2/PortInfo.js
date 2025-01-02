import React, { useState, useEffect } from 'react';
import './PortInfo.css';

const PortInfo = ({ ip,openPorts }) => {
  console.log(ip)
  console.log(openPorts)
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ip && openPorts.length > 0) {
      fetchPortStatus();
    }
  }, [ip, openPorts]);

  const fetchPortStatus = async () => {
    try {
      setLoading(true);
      setError(null);

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
      console.log("Django API 응답 데이터:", data); // << 여기에서 데이터 확인
      setServices(data.services); // Django에서 반환된 서비스 정보 저장
    } catch (err) {
      setError(`데이터를 가져오는 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="port-info-status">
      <h3>포트 정보</h3>
      <div className="port-info-card">
        <h5>포트 번호: 22</h5>

        <p className="openssh-version">OpenSSH version: 7.1</p>
        <p>SSH(Secure Shell) 프로토콜에 사용</p>
        <p>취약점 세부정보 : CVE-CVE-2016-0777</p>
        <p>CNNVD-201601-249</p>

        <h6>취약성 유형</h6> {/* 표 제목 수정 */}
        <table className="port-info-table">
          <thead>
            <tr>
              <th>항목</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>공격 벡터</td>
              <td>네트워크</td>
            </tr>
            <tr>
              <td>공격 복잡성</td>
              <td>낮음</td>
            </tr>
            <tr>
              <td>필요한 권한</td>
              <td>없음</td>
            </tr>
            <tr>
              <td>사용자 상호작용</td>
              <td>없음</td>
            </tr>
            <tr>
              <td>범위 </td>
              <td>변경되지 않음</td>
            </tr>
            <tr>
              <td>기밀성</td>
              <td>높음</td>
            </tr>
            <tr>
              <td>무결성</td>
              <td>높음</td>
            </tr>
            <tr>
              <td>가용성</td>
              <td>높음</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortInfo;
