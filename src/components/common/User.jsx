import profile from 'assets/profile.png';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function User() {
  const loginProfile = useSelector((state) => state.loginProfileReducer);

  return (
    <Stsection>
      <p>{loginProfile.nickname ? loginProfile.nickname : 'hello'}</p>
      <UserFigure>
        <img src={profile} alt="프로필 이미지" />
      </UserFigure>
    </Stsection>
  );
}

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
