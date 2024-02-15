import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from 'firebaseConfig';
import styled from 'styled-components';

const RegisterForm = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'nickname') {
      setNickname(value);
    }
  };

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();
    try {
      if (password.length < 6) {
        alert('비밀번호는 최소 6글자 이상이어야 합니다.');
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
        </EmailInputBox>
        <PasswordInputBox>
          <label>Password</label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </PasswordInputBox>
        <NickNameInputBox>
          <label>Nickname</label>
          <input type="text" value={nickname} name="nickname" onChange={onChange} required></input>
        </NickNameInputBox>
        <RegisterBtn onClick={signUp}>회원가입</RegisterBtn>
      </SignInContainer>
    </Container>
  );
};

export default RegisterForm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignInTitle = styled.h2`
  font-size: 35px;
  font-weight: bold;
  padding: 3rem;
  color: #ac87c5;
`;

const SignInContainer = styled.form`
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
    font-size: 16px;
  }
`;

const NickNameInputBox = styled.div`
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

const RegisterBtn = styled.button`
  height: 50px;
  border-radius: 15px;
  font-size: 22px;
  background-color: #ac87c5;
  border: 1px solid #ac87c5;
  color: white;
  cursor: pointer;
`;
