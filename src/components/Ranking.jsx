import React from 'react';
import { useSelector } from 'react-redux';

function Ranking() {
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const sortedFeedList = feedList.toSorted((a, b) => b.feedCount - a.feedCount);
  const noticeList = sortedFeedList.slice(0, 3);
  return (
    <>
      <p>Top 3 맛집</p>
      {noticeList.map((notice) => (
        <div key={notice.id} style={{ border: '1px solid black', margin: '5px 0' }}>
          <p>{notice.title}</p>
          <p>{notice.content}</p>
        </div>
      ))}
    </>
  );
}

export default Ranking;
