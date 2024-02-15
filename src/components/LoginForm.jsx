import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import SocialLogin from './SocialLogin';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from 'store/modules/userLoginStatus';
import styled from 'styled-components';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { loginProfileMaker } from 'store/modules/loginProfileReducer';

const LoginForm = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginprofile = useSelector((state) => state.loginProfile);

  useEffect(() => {
    const userLoginStatusChange = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // 사용자가 로그인 상태인 경우
          dispatch(setLoginStatus(true));
          // console.log('로그인:', user);
        } else {
          // 사용자가 로그아웃 상태인 경우
          dispatch(setLoginStatus(false));
          // console.log('로그아웃');
        }
      },
      []
    );
    return () => userLoginStatusChange();
  }, [auth, dispatch]);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setLoginEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // 로그인
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, password);
      console.log('user with signIn', userCredential.user);

      dispatch(setLoginStatus(true));

      const querySnapshot = await getDocs(collection(db, 'profile'));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.email === loginEmail) {
          dispatch(loginProfileMaker(data));
          addDoc(collection(db, 'currentUser'), data);
        }
      });
      navigate('/');
      await addDoc(collection(db, 'currentUser'), loginprofile);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singIn', errorCode, errorMessage);
    }
  };

  // 회원가입 페이지로 이동
  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <Container>
      <LoginTitle>Login</LoginTitle>
      <LoginContainer>
        <EmailInputBox>
          <label>Email </label>
          <input type="email" value={loginEmail} name="email" onChange={onChange} required></input>
        </EmailInputBox>
        <PasswordInputBox>
          <label>Password </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </PasswordInputBox>
        <LoginNRegisterBox>
          <LoginBtn
            onClick={(event) => {
              signIn(event);
            }}
          >
            로그인
          </LoginBtn>
          <RegisterBtn onClick={goToRegister}>회원가입</RegisterBtn>
        </LoginNRegisterBox>
      </LoginContainer>
      <SocialLoginBox>
        <LineContainer>
          <Line />
          <SocialLoginText>간편 로그인</SocialLoginText>
          <Line />
        </LineContainer>
        <SocialLogin />
      </SocialLoginBox>
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.h2`
  font-size: 35px;
  font-weight: bold;
  padding: 3rem;
  color: #503178;
`;

const LoginContainer = styled.form`
  padding: 2rem;
  border: 1px solid #ffe5e5;
  box-shadow: 0 0 15px #ffe5e5;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  border-radius: 25px;
  color: #503178;
`;

const EmailInputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
  & input {
    width: 22rem;
    height: 40px;
    border-radius: 15px;
    margin-top: 10px;
    border: 1px solid #e0aed0;
    padding-left: 15px;
    font-size: 16px;
  }
`;
const PasswordInputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
  & input {
    width: 22rem;
    height: 40px;
    border-radius: 15px;
    margin-top: 10px;
    border: 1px solid #e0aed0;
    padding-left: 15px;
    font-size: 20px;
  }
`;

const LoginNRegisterBox = styled.div`
  height: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const LoginBtn = styled.button`
  height: 50px;
  border-radius: 15px;
  font-size: 22px;
  background-color: #e0aed0;
  border: 1px solid #e0aed0;
  color: white;
  cursor: pointer;
`;
const RegisterBtn = styled.button`
  height: 50px;
  border-radius: 15px;
  font-size: 22px;
  background-color: white;
  border: 1px solid #e0aed0;
  color: #756ab6;
  cursor: pointer;
`;

const SocialLoginBox = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SocialLoginText = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ac87c5;
  padding: 0 1rem;
`;

const LineContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4rem;
`;
const Line = styled.hr`
  width: 17rem;
  height: 1px;
  background-color: #e0aed0;
  border: 0;
`;
