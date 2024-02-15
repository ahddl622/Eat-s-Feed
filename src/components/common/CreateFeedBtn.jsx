import styled from 'styled-components';
import CreateFeed from 'components/CeateFeed';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from 'store/modules/userLoginStatus';

export default function CreateFeedBtn() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userLoginStatus);
  const newFeedArea = useRef(null);
  const [newFeed, setNewFeed] = useState(false);

  useEffect(() => {
    const currentUserString = sessionStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    if (currentUser) {
      dispatch(setLoginStatus(true));
    }
  }, [dispatch]);

  // Add: 모달창 끄기(x 버튼 or 새 글 등록하기 버튼 or 모달창 이외의 구역 클릭 시)
  const goBack = (e) => {
    console.log(e.target);
    return !newFeedArea.current.contains(e.target) ? setNewFeed(false) : null;
  };

  useEffect(() => {
    document.addEventListener('click', goBack);
    return () => {
      document.removeEventListener('click', goBack);
    };
  });

  return (
    <StBtnBox ref={newFeedArea}>
      <StBtn
        onClick={() => {
          if (!isLogin) {
            alert('로그인 후 이용해주세요');
            return;
          } else {
            setNewFeed(!newFeed);
          }
        }}
      >
        새 글 작성하기
      </StBtn>
      {newFeed ? <CreateFeed setNewFeed={setNewFeed} /> : null}
    </StBtnBox>
  );
}

const StBtn = styled.button`
  width: 230px;
  height: 50px;

  border: 1px solid #ac87c5;
  background-color: #fff;
  color: #ac87c5;
  border-radius: 18px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    border: none;
    background-color: #e0aed0;
    color: #fff;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
