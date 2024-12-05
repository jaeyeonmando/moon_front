import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 간단한 유효성 검사
    if (!username || !password || !email) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // 실제 회원가입 API 호출
      const response = await axios.post('http://localhost:8000/api/signup/', {
        username,
        email,
        password,
      });

      // 서버에서 받은 사용자 정보
      const user = response.data.user;

      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem('user', JSON.stringify(user));

      // 회원가입 성공 후 메인 페이지로 이동
      navigate('/'); // 원하는 페이지로 이동

    } catch (err) {
      // API 호출 실패 시 오류 메시지
      setError('회원가입 실패. 다시 시도해주세요.');
    }
  };

  const handleLogoClick = () => {
    navigate('/'); // 로고 클릭 시 홈 화면으로 이동
  };

  return (
    <div className="signup-page">
      <div className="logo-container" onClick={handleLogoClick}>
        <span className="logo">Port Forti</span>
      </div>
      <h2>회원가입</h2>
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
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
