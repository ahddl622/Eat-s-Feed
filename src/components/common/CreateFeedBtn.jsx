import styled from 'styled-components';
import CreateFeed from 'components/CreateFeed';
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from 'store/modules/userLoginStatus';

export default function CreateFeedBtn() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.userLoginStatus);
  const newFeedArea = useRef(null);
  const [newFeed, setNewFeed] = useState(false);

  useEffect(() => {
    document.addEventListener('click', goBack);
    return () => {
      document.removeEventListener('click', goBack);
    };
  });

  useEffect(() => {
    const currentUserString = sessionStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    if (currentUser) {
      dispatch(setLoginStatus(true));
    }
  }, [dispatch]);

  // Add: 모달창 끄기(x 버튼 or 새 글 등록하기 버튼 or 모달창 이외의 구역 클릭 시)
  const goBack = (e) => {
    return !newFeedArea.current.contains(e.target) ? setNewFeed(false) : null;
  };

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

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StBtn = styled.button`
  width: 230px;
  height: 50px;

  font-size: 20px;
  color: #ac87c5;
  background-color: #fff;
  border: 1px solid #ac87c5;
  border-radius: 18px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #e0aed0;
    border: none;
  }
`;
