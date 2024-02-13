import { useEffect, useState } from 'react';
import { auth, db } from 'firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'feed'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
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
  };

  // 회원가입
  const signUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user singUp', userCredential);

      // 초기 회원정보를 따로 cloude db에 저장합니다.
      const newProfile = { id: email, taste: [], img: '', nickName: '', intro: '' };
      await addDoc(collection(db, 'profile'), newProfile);
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
  const logOut = async (event) => {
    event.preventDefault();
    await signOut(auth);
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
        <button onClick={signUp}>회원가입</button>
        <button onClick={signIn}>로그인</button>
        <button onClick={logOut}>로그아웃</button>
      </form>
    </div>
  );
};

export default LoginForm;
