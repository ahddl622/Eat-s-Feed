import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserUid } from 'store/modules/userUidReducer';
import { setNickname } from 'store/modules/userNicknameReducer';
import { useNavigate } from 'react-router-dom';
import { db } from 'firebaseConfig';

const RegisterForm = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const nickname = useSelector((state) => state.userNicknameReducer);
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
      dispatch(setNickname(value));
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

      navigate("/login")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error with singUp', errorCode, errorMessage);
    }
  };

  return (
    <div className="login-form">
      <h2>회원가입 페이지</h2>
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
      </form>
    </div>
  );
};

export default RegisterForm;
