import { Link } from 'react-router-dom';
import styled from 'styled-components';
import User from './common/User';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { makeNewFeed } from 'store/modules/feedListReducer';
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';

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

  const dispatch = useDispatch();
  const fetchFeedData = async () => {
    try {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        const feed = { id: doc.id, ...doc.data() };
        newFeedArr.push(feed);
      });
      dispatch(makeNewFeed(newFeedArr));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  return (
    <StHeader>
      <StLink to="/" onClick={() => fetchFeedData()}>
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
