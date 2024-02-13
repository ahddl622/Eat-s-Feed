import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserEmail } from 'store/modules/userEmailReducer';
import { setNickname } from 'store/modules/userNicknameReducer';

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
      <button onClick={handleGoogleLogin}>구글 로그인</button>
      <button onClick={handleGithubLogin}>Github 로그인</button>
    </div>
  );
};

export default SocialLogin;
