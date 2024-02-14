import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserEmail } from 'store/modules/userEmailReducer';
import { setLoginStatus } from 'store/modules/userLoginStatus';
import { setNickname } from 'store/modules/userNicknameReducer';
import styled from 'styled-components';

const StBtn = styled.button`
  padding-top: 10px;
  border: none;
  background-color: #fff;
  color: #756AB6;
  font-size: 20px;
`;

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    dispatch(setUserEmail(''));
    dispatch(setNickname(''));
    dispatch(setLoginStatus(false));
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return (
    <div>
      <StBtn type="button" onClick={logOut}>
        로그아웃
      </StBtn>
    </div>
  );
};

export default LogoutBtn;
