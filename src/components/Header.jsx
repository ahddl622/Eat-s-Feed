import { Link } from 'react-router-dom';
import styled from 'styled-components';
import User from './common/User';
import { auth } from 'firebaseConfig';
import { useState, useEffect } from 'react';

const StHeader = styled.header`
  height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #ffe5e5;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StH1 = styled.h1`
  font-weight: 600;
  color: #503178;
`;

const StUl = styled.ul`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StLi = styled.li`
  font-size: 13px;
  color: #ac87c5;
`;

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  const menus = [
    { id: 'about', info: '사이트 소개' },
    { id: 'login', info: '로그인 / 회원 가입' },
    { id: 'mypage', info: '마이 페이지' }
  ];

  return (
    <StHeader>
      <StLink to="/">
        <StH1>Eat's Feed</StH1>
      </StLink>
      <nav>
        <StUl>
          {menus
            .filter((menu) => (loggedIn ? menu.id !== 'login' : menu.id !== 'mypage'))
            .map((menu) => (
              <StLink to={`/${menu.id}`} key={menu.id}>
                <StLi>{menu.info}</StLi>
              </StLink>
            ))}
        </StUl>
      </nav>
      <User />
    </StHeader>
  );
}

export default Header;
