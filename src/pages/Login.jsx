import styled from 'styled-components';
import SocialLogin from 'components/SocialLogin';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db, auth } from 'firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { setLoginStatus } from 'store/modules/userLoginStatus';
import { loginProfileMaker } from 'store/modules/loginProfileReducer';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userLoginStatusChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인 상태인 경우
        dispatch(setLoginStatus(true));
        console.log('로그인:', user);
      } else {
        // 사용자가 로그아웃 상태인 경우
        dispatch(setLoginStatus(false));
        console.log('로그아웃');
      }
    });
    return () => userLoginStatusChange();
  }, [dispatch]);

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
          dispatch(loginProfileMaker({ ...data, id: doc.id }));
          sessionStorage.setItem('currentUser', JSON.stringify(data));
        }
      });

      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singIn', errorCode, errorMessage);
      sessionStorage.setItem('currentUser', null);
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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled.h2`
  padding: 3rem;

  font-size: 35px;
  font-weight: bold;
  color: #503178;
`;

const LoginContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  font-size: 20px;
  color: #503178;
  border: 1px solid #ffe5e5;
  border-radius: 25px;
  box-shadow: 0 0 15px #ffe5e5;
`;

const EmailInputBox = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  & input {
    width: 22rem;
    height: 40px;
    padding-left: 15px;
    margin-top: 10px;

    font-size: 16px;
    border: 1px solid #e0aed0;
    border-radius: 15px;
  }
`;
const PasswordInputBox = styled.div`
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;

  & input {
    width: 22rem;
    height: 40px;
    padding-left: 15px;
    margin-top: 10px;

    font-size: 20px;
    border: 1px solid #e0aed0;
    border-radius: 15px;
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

  font-size: 22px;
  color: white;
  background-color: #e0aed0;
  border: 1px solid #e0aed0;
  border-radius: 15px;
  cursor: pointer;
`;
const RegisterBtn = styled.button`
  height: 50px;

  font-size: 22px;
  color: #756ab6;
  background-color: white;
  border: 1px solid #e0aed0;
  border-radius: 15px;
  cursor: pointer;
`;

const SocialLoginBox = styled.div`
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SocialLoginText = styled.span`
  font-size: 18px;
  padding: 0 1rem;

  font-weight: bold;
  color: #ac87c5;
`;

const LineContainer = styled.div`
  padding-bottom: 4rem;
  display: flex;
  align-items: center;
`;

const Line = styled.hr`
  width: 17rem;
  height: 1px;

  border: 0.5px solid #e0aed0;
`;
