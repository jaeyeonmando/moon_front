import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import './Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 서버 호출 없이 로컬에서만 처리 (기본적으로 아이디와 비밀번호가 일치한다고 가정)
    const user = {
      username,
      password, // 실제 환경에서는 비밀번호를 직접 다루지 않아야 합니다.
    };

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify(user));

    // 로그인 성공 시
    setUser(user); // setUser를 사용하여 사용자 정보 설정
    navigate('/'); // 로그인 후 메인 페이지로 이동
  };

  const handleLogoClick = () => {
    navigate('/'); // 로고 클릭 시 홈 화면으로 이동
  };

  return (
    <div className="login-page">
      <div className="logo-container" onClick={handleLogoClick}>
        <span className="logo">Port Forti</span>
      </div>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 오류 메시지 표시 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
