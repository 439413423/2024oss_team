import React from 'react';
import MainPage from './components/pages/MainPage';
import DetailPage from './components/pages/DetailPage';
import CartPage from './components/pages/CartPage';
import RentalPage from './components/pages/RentalPage';

const App = () => {
  const path = window.location.pathname; // 현재 경로 확인

  // 경로에 따른 페이지 선택
  const renderPage = () => {
    if (path === '/home') {
      return <MainPage />;
    }
    if (path === '/book') {
      return <DetailPage />;
    }
    if (path === '/cart') {
      return <CartPage />;
    }
    if (path === '/rental') {
      return <RentalPage />;
    }
    return <MainPage />; // 기본 경로
  };

  return (
    <div>
      <h1>리드링크 서비스</h1>
      {renderPage()}
    </div>
  );
};

export default App;
