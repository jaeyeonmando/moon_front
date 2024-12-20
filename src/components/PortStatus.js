import React, { useState, useEffect } from 'react';
import './PortStatus.css';
import axios from 'axios';
import Loading from './Loading';

function PortState({ ip }) {
  const [ports, setPorts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);

  useEffect(() => {
    if (ip) {
      fetchPortStatus(ip);
    }
  }, [ip]);

  const fetchPortStatus = async (ip) => {
    try {
      const response = await axios.post('http://182.162.109.228:23488/api/scan/', { ip });
      setPorts(response.data); 
      setLoading(false);
    } catch (err) {
      setError('Error fetching port status');
      console.error(err);
      setLoading(false); 
    }
  };

  const openPorts = Object.entries(ports).filter(([port, status]) => status === 'Open');
  const closedPorts = Object.entries(ports).filter(([port, status]) => status === 'Closed');
  const filteredPorts = Object.entries(ports).filter(([port, status]) => status === 'Filtered');

  useEffect(() => {
    if (openPorts.length > 0) {
      setSelectedPort(openPorts[0][0]);
    }
  }, [openPorts]);


  const handlePortClick = (port) => {
    setSelectedPort(port); 
  };

  return (
    <div className="port-status">
      <h3>포트 상태</h3>
      {error && <div className="error">오류: {error}</div>}

      {loading ? (
        <Loading /> 
      ) : (
        !error && (
          <div className="port-content">
            {/* 열린 포트 */}
            {openPorts.length > 0 && (
              <div className="port-cards open-ports">
                <h5>열린 포트</h5>
                {openPorts.map(([port, status]) => (
                  <div key={port} className="port-card open" onClick={() => handlePortClick(port)}>
                    <h4>포트 {port}</h4>
                    <p className="open-status">열림</p>
                  </div>
                ))}
              </div>
            )}

            {/* 닫힌 포트 */}
            {closedPorts.length > 0 && (
              <div className="port-cards closed-ports">
                <h5>닫힌 포트</h5>
                {closedPorts.map(([port, status]) => (
                  <div key={port} className="port-card closed" onClick={() => handlePortClick(port)}>
                    <h4>포트 {port}</h4>
                    <p className="closed-status">닫힘</p>
                  </div>
                ))}
              </div>
            )}

            {/* 필터링된 포트 */}
            {filteredPorts.length > 0 && (
              <div className="port-cards filtered-ports">
                <h5>차단된 포트</h5>
                {filteredPorts.map(([port, status]) => (
                  <div key={port} className="port-card filtered" onClick={() => handlePortClick(port)}>
                    <h4>포트 {port}</h4>
                    <p className="filtered-status">차단</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default PortState;
