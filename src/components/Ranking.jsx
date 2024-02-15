import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function Ranking() {
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

const RankDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const RankPDiv = styled.div`
  padding-bottom: 20px;
  margin-bottom: 10px;

  font-size: 27px;
  font-weight: 600;
  text-align: center;
  color: #503178;
`;

const RankListDiv = styled.div`
  height: 60px;
  margin: 10px 0;

  border-bottom: 1px solid #e0aed0;

  &:hover {
    transform: scale(1.02);
  }
`;

const RankMatJipTitle = styled.p`
  margin-bottom: 15px;

  font-weight: 550;
  color: #ac87c5;
`;

const RankMatJipContent = styled.p`
  font-size: 14px;
  text-overflow: ellipsis;
  color: #e0aed0;
  white-space: nowrap;
  overflow: hidden;
`;
