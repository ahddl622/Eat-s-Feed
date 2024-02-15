import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const RankDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const RankPDiv = styled.div`
  font-size: 27px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10px;
  color: #503178;
  padding-bottom: 20px;
`;

const RankListDiv = styled.div`
  border-bottom: 1px solid #e0aed0;
  margin: 10px 0;
  height: 60px;
  &:hover {
    transform: scale(1.02);
  }
`;

const RankMatJipTitle = styled.p`
  font-weight: 550;
  margin-bottom: 15px;
  color: #ac87c5;
`;

const RankMatJipContent = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #e0aed0;
`;
function Ranking() {
  const feedList = useSelector((state) => state.feedListReducer.feedList);

  const sortedFeedList = [...feedList].toSorted((a, b) => b.feedCount - a.feedCount);
  const rankingList = sortedFeedList.slice(0, 3);
  return (
    <RankDiv>
      <RankPDiv>
        <p>Top 3 맛집</p>
      </RankPDiv>
      {rankingList.map((notice) => (
        <RankListDiv key={notice.id}>
          <RankMatJipTitle>{notice.title}</RankMatJipTitle>
          <RankMatJipContent>{notice.content}</RankMatJipContent>
        </RankListDiv>
      ))}
    </RankDiv>
  );
}

export default Ranking;
