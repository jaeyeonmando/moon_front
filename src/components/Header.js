import React from 'react';
import './Header.css';
import Button from './Button';

const Header = ({ user }) => {
  return (
    <header>
      {user ? (
        <Button 
          text="Log Out" 
          onClick={() => localStorage.removeItem('user')} 
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
