import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserEmail } from 'store/modules/userEmailReducer';
import { setNickname } from 'store/modules/userNicknameReducer';
import googleLogin from "assets/googleLoginImg.png"
import githubLogin from "assets/githubLoginImg.png"
import styled from 'styled-components';


const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userData, setUserData] = useState('');

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const data = await signInWithPopup(auth, provider);
      setUserData(data.user);
      dispatch(setUserEmail(data.user.email))
      dispatch(setNickname(data.user.displayName))
      console.log(data.user.email);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider()

    try {
      const data = await signInWithPopup(auth, provider)
      setUserData(data.user);
      dispatch(setUserEmail(data.user.email))
      dispatch(setNickname(data.user.displayName))
      console.log(data);
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <LoginBtn onClick={handleGoogleLogin}>
        <Image src={googleLogin} alt="googleLogin"/>
      </LoginBtn>
      <LoginBtn onClick={handleGithubLogin}>
        <Image src={githubLogin} alt='githubLogin'/>
      </LoginBtn>
    </div>
  );
};

export default SocialLogin;

const LoginBtn = styled.button`
  padding: 0 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
`
const Image = styled.img`
  width: 50px;
  height: 50px;
`