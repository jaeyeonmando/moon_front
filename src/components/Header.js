import React from 'react';
import './Header.css';
import Button from './Button';

const Header = ({ user, logout }) => {
  return (
    <header>
      {user ? (
        <Button
          text="Log Out"
          onClick={logout}  // logout 함수 호출
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
