import React from 'react';
import { useSelector } from 'react-redux';

function Mypage() {
const feedList = useSelector((state) => state.feedListReducer.feedList)
const myFeedList = feedList.filter((feed) => feed.id === )

  return (
    <>
    {feedList.map}
    </>
  );
}

export default Mypage;
