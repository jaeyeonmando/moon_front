import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import axios from 'axios'; // 
import './Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 오류 메시지 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      console.log({ username, password }); // 보낼 데이터 확인
      // Django 로그인 API 호출
      const response = await axios.post('http://182.162.109.228:23488/api/login/', {
        username,
        password,
      });

  // 서버에서 받은 사용자 정보
  const user = response.data.user;

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('user', JSON.stringify(user));

      // 로그인 성공 시
      setUser(user);
      navigate('/'); // 로그인 후 메인 페이지로 이동
    } catch (err) {
      // 오류 메시지 표시
      if (err.response && err.response.data) {
        setError(err.response.data.error || '로그인에 실패했습니다.');
      } else {
        setError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
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
