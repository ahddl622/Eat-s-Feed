import profile from 'assets/profile.png';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Stsection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  & p {
    color: #756ab6;
  }
`;

const UserFigure = styled.figure`
  width: 35x;
  height: 35px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
  }
`;

function User({ loggedIn }) {
  const loginUserNickname = useSelector((state) => state.userNicknameReducer);

  return (
    <Stsection>
      <p>{loginUserNickname ? loginUserNickname : 'hello'}</p>
      <UserFigure>
        <img src={profile} alt="프로필 이미지" />
      </UserFigure>
    </Stsection>
  );
}

export default User;
