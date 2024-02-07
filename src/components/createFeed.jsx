import React from 'react';

function createFeed() {
  return (
    <>
      <div>헤더</div>
      <div>
        <div>User사진</div>
        <div>
          새글작성
          <button>사진첨부하기</button>
        </div>
        <textare>내용</textare>
      </div>
    </>
  );
}

export default createFeed;
