import React from 'react';
import './Header.css';
import Button from './Button';

// 아이콘 이미지 import
import signupIcon from './icons/signup.png';
import loginIcon from './icons/login.png';
import logoutIcon from './icons/logout.png';

const Header = ({ user, logout }) => {
  return (
    <header>
      {user ? (
        <Button
          text="Log Out"
          onClick={logout}
          icon={logoutIcon} // 로그아웃 아이콘 추가
        />
      ) : (
        <>
          <Button
            text="Sign Up"
            onClick={() => window.location.href = '/signup'}
            icon={signupIcon} // 회원가입 아이콘 추가
          />
          <Button
            text="Log In"
            onClick={() => window.location.href = '/login'}
            icon={loginIcon} // 로그인 아이콘 추가
          />
        </>
      )}
    </header>
  );
};

export default Header;
