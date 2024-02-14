import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from 'firebaseConfig';
import { Link } from 'react-router-dom';
import profile from 'assets/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from 'store/modules/userNicknameReducer';
import LogoutBtn from 'common/LogoutBtn';

const StSection = styled.section`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

const StFigure = styled.figure`
  margin: 0 auto 10px auto;
  width: 100px;
  height: 100px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const StInfoDiv = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StH3 = styled.h3`
  font-size: 40px;
  color: #503178;
`;

const StBtn = styled.button`
  width: 250px;
  height: 50px;

  border: 1px solid #e0aed0;
  background-color: #fff;
  color: #ac87c5;
  border-radius: 18px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    border: none;
    background-color: #e0aed0;
    color: #fff;
  }
`;

function Profile() {
  const [profileInfo, setProfileInfo] = useState([]);
  const loginEmail = useSelector((state) => state.userEmailReducer);
  const loginUserNickname = useSelector((state) => state.userNicknameReducer);
  const dispatch = useDispatch();

  const { taste, intro, img } = profileInfo;

  // 현재 로그인한 유저의 프로필을 가져옵니다.
  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === loginEmail) {
          setProfileInfo(data);
          dispatch(setNickname(data.nickname));
        }
      });
    };

    fetchUserData();
  }, [loginEmail, dispatch]);

  console.log('profile', profileInfo);
  console.log('email', loginEmail);

  return (
    <StSection>
      <StInfoDiv>
        <StH3>"{loginUserNickname ? loginUserNickname : 'hello'}"</StH3>
        <StFigure>
          <img src={img} alt="프로필 이미지" onError={(e) => (e.target.src = profile)} />
        </StFigure>
        <h3>{loginEmail}</h3>
        {intro ? (
          <>
            <h3>{intro}</h3>
            <ul>
              {taste.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          '프로필을 완성해 주세요!'
        )}
      </StInfoDiv>
      <Link to={`/myinfo`}>
        <StBtn>수정하기</StBtn>
      </Link>
      <LogoutBtn />
    </StSection>
  );
}

export default Profile;
