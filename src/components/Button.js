import React from 'react';
import './Button.css';

const Button = ({ text, onClick, icon }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {icon && <img src={icon} alt={`${text} icon`} className="button-icon" />}
      {text}
    </button>
  );
};

export default Button;
