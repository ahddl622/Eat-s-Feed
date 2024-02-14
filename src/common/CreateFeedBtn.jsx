import React, { useRef, useState, useEffect } from 'react';
import CreateFeed from 'components/CeateFeed';
import { auth } from 'firebaseConfig';
import styled from 'styled-components';

const NewFeedBtnDiv = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const NewFeedBtn = styled.button`
  width: 230px;
  height: 60px;
  border: solid 4px #e0aed0;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 550;
  color: #503178;
  background-color: #e0aed0;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

function CreateFeedBtn() {
  const newFeedArea = useRef(null);
  const [newFeed, setNewFeed] = useState(false);
  // Add: 모달창 끄기(x 버튼 or 새 글 등록하기 버튼 or 모달창 이외의 구역 클릭 시)
  const goBack = (e) => {
    return !newFeedArea.current.contains(e.target) ? setNewFeed(false) : null;
  };
  useEffect(() => {
    document.addEventListener('click', goBack);
    return () => {
      document.removeEventListener('click', goBack);
    };
  });

  return (
    <NewFeedBtnDiv ref={newFeedArea}>
      <NewFeedBtn
        onClick={() => {
          if (auth.currentUser === null) {
            alert('로그인 후 이용해주세요');
            return;
          } else {
            setNewFeed(!newFeed);
          }
        }}
      >
        새 글 작성하기
      </NewFeedBtn>
      {newFeed ? <CreateFeed setNewFeed={setNewFeed} /> : null}
    </NewFeedBtnDiv>
  );
}

export default CreateFeedBtn;
