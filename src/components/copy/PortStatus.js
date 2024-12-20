import React, { useState, useEffect } from 'react';
import './PortStatus.css';
import axios from 'axios';

// const PortStatus = () => {
//   const portNumbers = [
//     20, 21, 22, 23, 25, 53, 80, 110, 135, 143, 443, 445, 3389, 3306, 5432, 1521, 8080, 1433, 1434, 1900, 4444,
//   ];

//   const initialPortState = portNumbers.reduce((acc, port) => {
//     acc[port] = 'Error'; // 초기 상태를 'Error'로 설정
//     return acc;
//   }, {});

//   const [ports, setPorts] = useState(initialPortState);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// }

//   function PortState({ ip }) {
//     const [ports, setPorts] = useState(initialPortState);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       if (ip) {
//         fetchPortStatus(ip);
//       }
//     }, [ip]);

//     const fetchPortStatus = async (ip) => {
//       try {
//         const response = await axios.post('http://localhost:8000/api/scan/', { ip });
//         fetchPortStatus(response.data.data);
//       } catch (err) {
//         setError('Error fetching port status');
//         console.error(err);
//       }
//     };

//   return (
//     <div className="port-status">
//       <h3>포트 상태</h3>
//       {error && <div className="error">오류: {error}</div>}
//       {loading && <div className="loading">로딩 중...</div>}
//       {!loading && (
//         <table className="port-table">
//           <thead>
//             <tr>
//               <th>포트 번호</th>
//               <th>상태</th>
//             </tr>
//           </thead>
//           <tbody>
//             {portNumbers.map((port) => (
//               <tr key={port}>
//                 <td>{port}</td>
//                 <td
//                   className={
//                     ports[port] === 'Open'
//                       ? 'open'
//                       : ports[port] === 'Closed'
//                       ? 'closed'
//                       : 'error'
//                   }
//                 >
//                   {ports[port] === 'Open'
//                     ? '열림'
//                     : ports[port] === 'Closed'
//                     ? '닫힘'
//                     : '오류'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };


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
      {loading && <div className="loading">로딩 중...</div>}
      {!loading && !error && (
        <table className="port-table">
          <thead>
            <tr>
              <th>포트 번호</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ports).map(([port, status]) => (
              <tr key={port}>
                <td>{port}</td>
                <td className={status === 'Open' ? 'open' : 'closed'}>
                  {status === 'Open' ? '열림 ⭕' : '닫힘 ✅'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PortState;
