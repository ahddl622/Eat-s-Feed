import React, { useRef, useState, useEffect } from 'react';
import CreateFeed from 'components/CeateFeed';
import { auth } from 'firebaseConfig';
import styled from 'styled-components';

const StBtn = styled.button`
  width: 250px;
  height: 50px;

  border: 1px solid #e0aed0;
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
    <div ref={newFeedArea}>
      <StBtn
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
      </StBtn>
      {newFeed ? <CreateFeed setNewFeed={setNewFeed} /> : null}
    </div>
  );
}

export default CreateFeedBtn;
