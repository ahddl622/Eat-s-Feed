import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginStatus } from 'store/modules/userLoginStatus';
import { removeProfile } from 'store/modules/loginProfileReducer';

const StBtn = styled.button`
  padding-top: 10px;
  border: none;

  background-color: #fff;
  color: #756ab6;
  font-size: 20px;
  cursor: pointer;
`;

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await signOut(auth);
    dispatch(removeProfile());
    dispatch(setLoginStatus(false));
    sessionStorage.removeItem('currentUser');
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
