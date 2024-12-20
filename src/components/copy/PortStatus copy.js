import React, { useState, useEffect } from 'react';
import './PortStatus.css';
import axios from 'axios';
import Loading from './Loading'; // 수정된 로딩 컴포넌트

function PortState({ ip }) {
  const [ports, setPorts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ip) {
      fetchPortStatus(ip);
    }
  }, [ip]);

  // Django로 IP를 보내고 포트 상태를 가져오는 함수
  const fetchPortStatus = async (ip) => {
    try {
      const response = await axios.post('http://182.162.109.228:23488/api/scan/', { ip });
      setPorts(response.data); // 포트 상태 업데이트
      setLoading(false); // 로딩 상태 종료
    } catch (err) {
      setError('Error fetching port status');
      console.error(err);
      setLoading(false); // 에러 발생 시 로딩 상태 종료
    }
  };

  return (
    <div className="port-status">
      <h3>포트 상태</h3>
      {error && <div className="error">오류: {error}</div>}

      {loading ? (
        <Loading /> // 로딩 중일 때 수정된 로딩 컴포넌트 사용
      ) : (
        !error && (
          <div className="port-cards">
            {Object.entries(ports).map(([port, status]) => (
              <div key={port} className={`port-card ${status === 'Open' ? 'open' : 'closed'}`}>
                <h4>포트 {port}</h4>
                <p className={status === 'Open' ? 'open-status' : 'closed-status'}>
                  {status === 'Open' ? '열림' : '닫힘'}
                </p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default PortState;
