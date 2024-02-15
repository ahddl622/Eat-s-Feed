import styled from 'styled-components';
import { Link } from 'react-router-dom';
import profile from 'assets/profile.png';
import { useSelector } from 'react-redux';
import LogoutBtn from 'common/LogoutBtn';
import CreateFeedBtn from 'common/CreateFeedBtn';

const StArticle = styled.article`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: 2px solid #fff;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 40px;
`;

const StFigure = styled.figure`
  width: 130px;
  height: 130px;
  margin: 10px auto 20px auto;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const StSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const StInfoDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    color: #ac87c5;
  }

  & h3 {
    padding: 0 20px;
    flex-grow: 0.6;

    color: #503178;
  }
  & ul {
    display: flex;
    justify-content: center;
    margin: 10px 0;

    color: #e0aed0;
  }
`;

const StH3 = styled.h3`
  padding: 10px 0;

  font-size: 40px;
  color: #503178;
`;

const StBtn = styled.button`
  width: 230px;
  height: 50px;
  margin: 10px;

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
  // const [profileInfo, setProfileInfo] = useState([]);
  // const loginEmail = useSelector((state) => state.userEmailReducer);
  // const loginUserNickname = useSelector((state) => state.userNicknameReducer);
  // const dispatch = useDispatch();
  const loginProfile = useSelector((state) => state.loginProfileReducer);

  const { nickname, email, taste, intro } = loginProfile;
  console.log(loginProfile);

  // console.log(nickname, taste, intro);

  // 현재 로그인한 유저의 프로필을 가져옵니다.
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'profile'));
  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       if (data.email === loginEmail) {
  //         setProfileInfo(data);
  //         dispatch(setNickname(data.nickname));

  //         // console.log(data);
  //       }
  //     });
  //   };
  //   fetchUserData();
  // }, [loginEmail, dispatch]);

  // console.log('profile', profileInfo);
  // console.log('email', loginEmail);
  // console.log('nickname', loginUserNickname);

  return (
    <StArticle>
      <StSection>
        <StH3>"{nickname ? nickname : 'hello'}"</StH3>
        <StFigure>
          <img src={profile} alt="프로필 이미지" />
        </StFigure>
        <StInfoDiv>
          <h3>{email}</h3>
          {intro ? (
            <>
              <h3>{intro}</h3>
              <ul>
                {taste.map((item) => (
                  <li key={item}>#{item}</li>
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
        <CreateFeedBtn />
      </StSection>
      <LogoutBtn />
    </StArticle>
  );
}

export default Profile;
