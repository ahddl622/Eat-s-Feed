import MyFeed from 'components/MyFeed';
import Profile from 'components/Profile';
import styled from 'styled-components';
import CreateFeedBtn from 'common/CreateFeedBtn';

const StWrap = styled.div`
  height: 80vh;
  width: 70%;
  margin: 50px auto;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 30px;

  text-align: center;
`;

const StArticle = styled.article`
  display: grid;
  grid-template-rows: 60% 10%;
  gap: 30px;
`;

const StText = styled.div`
  padding: 10px;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

function Mypage() {
  return (
    <StWrap>
      <StArticle>
        <Profile />
        <StText>
          <CreateFeedBtn />
        </StText>
      </StArticle>
      <MyFeed />
    </StWrap>
  );
}

export default Mypage;
