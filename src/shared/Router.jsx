import Layout from 'components/Layout';
import Main from 'pages/Main';
import About from 'pages/About';
import Map from 'pages/Map';
import Login from 'pages/Login';
import CreateAccount from 'pages/CreateAccount';
import Mypage from 'pages/Mypage';
import MyInfo from 'pages/MyInfo';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from 'firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { loginProfileMaker } from 'store/modules/loginProfileReducer';

export default function Router() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      const currentUserString = sessionStorage.getItem('currentUser');
      const currentUser = JSON.parse(currentUserString);
      try {
        const querySnapshot = await getDocs(collection(db, 'profile'));
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email === currentUser.email) {
            dispatch(loginProfileMaker({ ...data, id: doc.id }));
          }
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('error with singIn', errorCode, errorMessage);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
