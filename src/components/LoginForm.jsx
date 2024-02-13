// App.js
import { useEffect, useState } from 'react';
import { db } from 'firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { setNickname } from 'store/modules/userNicknameReducer';
import { setUserUid } from 'store/modules/userUidReducer';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.userNicknameReducer)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
      if (user) {
        // 로그인 된 상태일 경우
        setIsLoggedIn(true);
      } else {
        // 로그아웃 된 상태일 경우
        setIsLoggedIn(false);
      }
    });
  }, []);


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
    if (name === "nickname") {
      dispatch(setNickname(value))
    }
  };

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await addDoc(collection(db, 'profile'), {
        uid,
        email,
        nickname
      });

      dispatch(setUserUid(uid));
      alert('회원가입이 완료 되었습니다.');
      console.log('user singUp', userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singUp', errorCode, errorMessage);
    }
  };

  // 로그인
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user with signIn', userCredential.user);
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
        <div>
          <label>닉네임 : </label>
          <input type="text" value={nickname} name="nickname" onChange={onChange} required></input>
        </div>
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </div>
  );
};

export default LoginForm;
