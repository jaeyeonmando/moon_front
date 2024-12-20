import React from 'react';
import './Header.css';
import Button from './Button';

const Header = ({ user }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogout = () => {
    localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 제거
    navigate('/'); // 로그아웃 후 홈 화면으로 이동
  };

const Header = ({ user }) => {
  return (
    <header>
      {user ? (
        <Button
          text="Log Out"
          onClick={handleLogout}
        />
      ) : (
        <>
          <Button
            text="Sign Up"
            onClick={() => window.location.href = '/signup'}
          />
          <Button
            text="Log In"
            onClick={() => window.location.href = '/login'}
          />
        </>
      )}
    </header>
  );
};

export default Header;
