import MyFeed from 'components/MyFeed';
import Profile from 'components/Profile';
import styled from 'styled-components';

const StWrap = styled.div`
  height: 80vh;
  width: 70%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 30px;

  text-align: center;
`;

function Mypage() {
  return (
    <StWrap>
      <Profile />
      <MyFeed />
    </StWrap>
  );
}

export default Mypage;
