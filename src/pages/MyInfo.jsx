import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from 'firebaseConfig';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import profile from 'assets/profile.png';

const StWrap = styled.div`
  text-align: center;
`;

const StArticle = styled.article`
  width: 35vw;
  height: 70vh;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 35px;
`;

const StH1 = styled.h1`
  height: 15vh;
  line-height: 15vh;

  font-size: 40px;
  color: #503178;
`;

const StH3 = styled.h3`
  font-weight: bold;
  color: #ac87c5;
`;

const StFigure = styled.figure`
  margin: 0 auto 10px auto;
  width: 150px;
  height: 150px;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const StP = styled.p`
  color: #ac87c5;
  font-size: 17px;
`;

const StForm = styled.form`
  flex-grow: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StInput = styled.input`
  width: 80%;
  height: 38px;
  margin: 0 auto;
  padding-left: 10px;

  border: 1px solid #e0aed0;
  border-radius: 15px;
`;

const StSelect = styled.select`
  width: 80%;
  height: 38px;
  margin: 0 auto;
  padding-left: 10px;

  border: 1px solid #e0aed0;
  border-radius: 15px;
`;

const StBtn = styled.button`
  width: 80%;
  height: 50px;
  margin: 0 auto;

  border: none;
  background-color: #e0aed0;
  border-radius: 18px;
`;

function MyInfo() {
  const [loginUser, setLoginUser] = useState('');
  const [userId, setUserId] = useState('');

  const [nickName, setNickName] = useState('');
  const [intro, setIntro] = useState('');
  const [taste, setTaste] = useState([]);

  console.log(taste);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoginUser(user.email);
    });
  }, []);

  // 로그인한 회원의 profile ID를 저장합니다.
  useEffect(() => {
    const fetchUserData = async () => {
      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id === loginUser) setUserId(doc.id);
      });
    };

    fetchUserData();
  }, [loginUser]);

  // 저장했던 profile ID와 일치하는 profile 정보를 수정합니다.
  const editProfile = async (e) => {
    e.preventDefault();

    const infoRef = doc(db, 'profile', userId);
    await updateDoc(infoRef, { nickName, intro, taste });
  };

  return (
    <StWrap>
      <StH1>프로필을 완성해 주세요!</StH1>
      <StArticle>
        <StH3>Profile</StH3>
        <StFigure>
          <img src="" alt="프로필 이미지" onError={(e) => (e.target.src = profile)} />
        </StFigure>
        <StP>{loginUser}</StP>
        <StForm onSubmit={editProfile}>
          <StInput
            valu={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
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
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="아시안">아시안</option>
            <option value="디저트">디저트</option>
          </StSelect>
          <StBtn type="submit">click</StBtn>
        </StForm>
      </StArticle>
    </StWrap>
  );
}

export default MyInfo;
