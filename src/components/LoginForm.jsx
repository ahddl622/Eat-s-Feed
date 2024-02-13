import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import SocialLogin from './SocialLogin';
import { setUserEmail } from 'store/modules/userEmailReducer';
import { useDispatch } from 'react-redux';
import { setNickname } from 'store/modules/userNicknameReducer';

const LoginForm = () => {
  const auth = getAuth();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      // if (user) {
      //   // 로그인 된 상태일 경우
      //   setIsLoggedIn(true);
      // } else {
      //   // 로그아웃 된 상태일 경우
      //   setIsLoggedIn(false);
      // }
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value)
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // 로그인
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
      dispatch(setUserEmail(email))
      alert('로그인 되었습니다.');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singIn', errorCode, errorMessage);
    }
  };

  // 로그아웃
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
    alert('로그아웃 되었습니다.');
    // dispatch(setUserEmail(""))
    // dispatch(setNickname(""))
  };

  // 회원가입 페이지로 이동
  const goToRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="login-form">
      <h2>로그인 페이지</h2>
      <form>
        <div>
          <label>이메일 : </label>
          <input type="email" value={email} name="email" onChange={onChange} required></input>
        </div>
        <div>
          <label>비밀번호 : </label>
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>
        <button onClick={goToRegister}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
        <SocialLogin />
      </form>
    </div>
  );
};

export default LoginForm;
