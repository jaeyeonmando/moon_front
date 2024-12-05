import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [user, setUser] = useState(null);

  // 로컬 스토리지에서 사용자 정보 가져오기
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그아웃 처리
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const PrivateRoute = ({ children }) => {
    if (user === null) {
      return <Navigate to="/login" />;  // 로그인 안한 경우 로그인 페이지로 리디렉션
    }
    return children;  // 로그인한 경우 children을 그대로 렌더링
  };

  return (
    <Router>
      <Header user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/private" element={<PrivateRoute><div>Private Page</div></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
