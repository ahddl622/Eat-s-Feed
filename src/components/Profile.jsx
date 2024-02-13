import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from 'firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import profile from 'assets/profile.png';

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

function Profile() {
  const [loginUser, setLoginUser] = useState('');
  const [profileInfo, setProfileInfo] = useState([]);

  const { nickname, email, taste, intro, img } = profileInfo;

  // 현재 로그인한 유저의 이메일을 가져옵니다.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoginUser(user.email);
    });
  });

  // 현재 로그인한 유저의 프로필을 가져옵니다.
  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === loginUser) setProfileInfo(data);
      });
    };

    fetchUserData();
  }, [loginUser]);

  console.log('profile', profileInfo);

  return (
    <StSection>
      <StInfoDiv>
        <StH3>"{nickname ? nickname : 'hello'}"</StH3>
        <StFigure>
          <img src={img} alt="프로필 이미지" onError={(e) => (e.target.src = profile)} />
        </StFigure>
        {nickname ? (
          <>
            <h3>{email}</h3>
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
        <button>수정하기</button>
      </Link>
    </StSection>
  );
}

export default Profile;
