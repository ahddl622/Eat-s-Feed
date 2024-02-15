import profile from 'assets/profile.png';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { setLoginStatus } from 'store/modules/userLoginStatus';
import { loginProfileMaker } from 'store/modules/loginProfileReducer';
import { getDocs, collection, addDoc } from '@firebase/firestore';
import { auth, db } from 'firebaseConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

function User() {
  const dispatch = useDispatch();
  const loginProfile = useSelector((state) => state.loginProfileReducer);

  // 새로고침을 하더라도 해당유저의 데이터가 store에 저장될 수 있게
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'currentUser'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email !== '0') {
            dispatch(loginProfileMaker(data));
          }
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error with singIn', errorCode, errorMessage);
      }
    };
    fetchProfile();
  }, [dispatch]);

  return (
    <Stsection>
      <p>{loginProfile ? loginProfile.nickname : 'hello'}</p>
      <UserFigure>
        <img src={profile} alt="프로필 이미지" />
      </UserFigure>
    </Stsection>
  );
}

export default User;
