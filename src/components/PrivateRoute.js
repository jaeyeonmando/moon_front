// src/components/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// 로그인 상태에 따라 접근을 제어하는 컴포넌트
const PrivateRoute = ({ element, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
