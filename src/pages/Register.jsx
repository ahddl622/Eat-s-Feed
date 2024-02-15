import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from 'firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
      validateEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
      validatePassword(value);
    }
    if (name === 'nickname') {
      setNickname(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('');
    } else if (!emailRegex.test(email)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    if (password === '') {
      setPasswordError('');
    } else if (password.length < 6) {
      setPasswordError('비밀번호는 최소 6글자 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 6 || emailError) {
        alert('비밀번호 혹은 이메일 형식이 올바르지 않습니다.');
        return;
      }
      // 초기 회원정보를 따로 cloude db에 저장합니다.
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await sendEmailVerification(auth.currentUser);
      const uid = userCredential.user.uid;
      const newProfile = { uid, password, email, nickname, taste: [], intro: '' };
      await addDoc(collection(db, 'profile'), newProfile);

      // dispatch(setUserUid(uid));
      // dispatch(setNickname(nickname));
      alert('회원가입이 완료 되었습니다.');
      console.log('user singUp', userCredential);
      navigate('/login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singUp', errorCode, errorMessage);
    }
  };

  return (
    <Container>
      <SignInTitle>Sign in</SignInTitle>
      <SignInContainer>
        <EmailInputBox>
          <label>Email</label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </EmailInputBox>
        <PasswordInputBox>
          <label>Password</label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </PasswordInputBox>
        <NickNameInputBox>
          <label>Nickname</label>
          <input type="text" value={nickname} name="nickname" onChange={onChange} required></input>
        </NickNameInputBox>
        <RegisterBtn onClick={signUp}>회원가입</RegisterBtn>
      </SignInContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInTitle = styled.h2`
  padding: 3rem;

  font-size: 35px;
  font-weight: bold;
  color: #ac87c5;
`;

const SignInContainer = styled.form`
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
  height: 100px;
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
  height: 100px;
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

const NickNameInputBox = styled.div`
  height: 100px;
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

const RegisterBtn = styled.button`
  height: 50px;

  font-size: 22px;
  color: white;
  background-color: #ac87c5;
  border: 1px solid #ac87c5;
  border-radius: 15px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  margin-top: 5px;

  color: red;
  font-size: 14px;
`;