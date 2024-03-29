import styled from 'styled-components';
import profile from 'assets/profile.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from 'firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { editedProfileMaker } from 'store/modules/loginProfileReducer';

export default function MyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginProfile = useSelector((state) => state.loginProfileReducer);
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [taste, setTaste] = useState([]);
  console.log(loginProfile);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'profile'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('data', doc.data());
          if (data.email === loginProfile.email) setUserId(doc.id);
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error with fetchUserData', errorCode, errorMessage);
      }
    };

    fetchUserData();
  }, [loginProfile.email]);

  // 저장했던 profile ID와 일치하는 profile 정보를 수정합니다.
  const editProfile = async (e) => {
    try {
      e.preventDefault();

      const infoRef = doc(db, 'profile', userId);
      await updateDoc(infoRef, { nickname, intro, taste });

      dispatch(editedProfileMaker({ nickname, intro, taste }));
      console.log(loginProfile);
      navigate('/mypage');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with editProfile', errorCode, errorMessage);
    }
  };

  return (
    <StWrap>
      <StH1>프로필을 완성해 주세요!</StH1>
      <StArticle>
        <StH3>Profile</StH3>
        <StFigure>
          <img src={profile} alt="프로필 이미지" />
        </StFigure>
        <StP>{loginProfile.email}</StP>
        <StForm onSubmit={editProfile}>
          <StInput
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요."
          />
          <StInput
            valu={intro}
            onChange={(e) => {
              setIntro(e.target.value);
            }}
            placeholder="한 줄 소개를 입력해 주세요."
          />
          <StSelect
            defaultValue="base"
            onChange={(e) =>
              setTaste((prev) => {
                // 중복 메뉴 추가를 방지합니다.
                if (!prev.includes(e.target.value)) {
                  return [...prev, e.target.value];
                } else {
                  return prev;
                }
              })
            }
          >
            <option value="base">choose your taste</option>
            <option value="일식">일식</option>
            <option value="중식">중식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="디저트">디저트</option>
          </StSelect>
          <StBtn type="submit">수정완료</StBtn>
        </StForm>
      </StArticle>
    </StWrap>
  );
}

const StWrap = styled.div`
  text-align: center;
`;

const StArticle = styled.article`
  width: 35vw;
  height: 70vh;
  padding: 20px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 2px solid #fff;
  border-radius: 35px;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
`;

const StH1 = styled.h1`
  height: 15vh;

  font-size: 40px;
  line-height: 15vh;
  color: #503178;
`;

const StH3 = styled.h3`
  font-weight: bold;
  color: #ac87c5;
`;

const StFigure = styled.figure`
  width: 150px;
  height: 150px;
  margin: 0 auto 10px auto;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const StP = styled.p`
  font-size: 17px;
  color: #ac87c5;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 0.4;
`;

const StInput = styled.input`
  width: 80%;
  height: 38px;
  padding-left: 10px;
  margin: 0 auto;

  border: 1px solid #e0aed0;
  border-radius: 15px;
`;

const StSelect = styled.select`
  width: 80%;
  height: 38px;
  padding-left: 10px;
  margin: 0 auto;

  border: 1px solid #e0aed0;
  border-radius: 15px;
`;

const StBtn = styled.button`
  width: 80%;
  height: 50px;
  margin: 0 auto;

  font-size: 20px;
  color: #fff;
  background-color: #e0aed0;
  border: none;
  border-radius: 18px;
  cursor: pointer;
`;
