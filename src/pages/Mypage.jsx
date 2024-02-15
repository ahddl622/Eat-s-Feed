import styled from 'styled-components';
import MyFeed from 'components/MyFeed';
import Profile from 'components/Profile';

export default function Mypage() {
  return (
    <StWrap>
      <Profile />
      <MyFeed />
    </StWrap>
  );
}

const StWrap = styled.div`
  height: 80vh;
  width: 70%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 30px;

  text-align: center;
`;
