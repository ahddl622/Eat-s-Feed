import Layout from 'components/Layout';
import LoginNout from 'pages/LoginNout';
import Main from 'pages/Main';
import MyInfo from 'pages/MyInfo';
import Mypage from 'pages/Mypage';
import OurTeam from 'pages/OurTeam';
import Register from 'pages/Register';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { loginProfileMaker } from 'store/modules/loginProfileReducer';
import { db } from 'firebaseConfig';

function Router() {
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
          <Route path="/about" element={<OurTeam />} />
          <Route path="/login" element={<LoginNout />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
