import styled from 'styled-components';
import googleLogin from 'assets/googleLoginImg.png';
import githubLogin from 'assets/githubLoginImg.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, db } from 'firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { socialProfile } from 'store/modules/loginProfileReducer';

export default function SocialLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const data = await signInWithPopup(auth, provider);
      const socialEmail = data.user.email;
      const socialNickname = data.user.displayName;
      const uid = data.user.uid;

      const newProfile = {
        uid,
        email: socialEmail,
        nickname: socialNickname,
        taste: [],
        intro: '',
        goodFeed: [],
        badFeed: []
      };

      await addDoc(collection(db, 'profile'), newProfile);
      dispatch(socialProfile({ socialEmail, socialNickname }));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();

    try {
      const data = await signInWithPopup(auth, provider);
      const socialEmail = data.user.email;
      const socialNickname = data.user.displayName;
      const uid = data.user.uid;

      const newProfile = {
        uid,
        email: socialEmail,
        nickname: socialNickname,
        taste: [],
        intro: '',
        goodFeed: [],
        badFeed: []
      };

      await addDoc(collection(db, 'profile'), newProfile);
      dispatch(socialProfile({ socialEmail, socialNickname }));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LoginBtn onClick={handleGoogleLogin}>
        <Image src={googleLogin} alt="googleLogin" />
      </LoginBtn>
      <LoginBtn onClick={handleGithubLogin}>
        <Image src={githubLogin} alt="githubLogin" />
      </LoginBtn>
    </div>
  );
}

const LoginBtn = styled.button`
  padding: 0 1rem;
  background: transparent;

  border: none;
  cursor: pointer;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
`;
