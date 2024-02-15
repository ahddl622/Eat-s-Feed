import Layout from 'components/Layout';
import Main from 'pages/Main';
import OurTeam from 'pages/OurTeam';
import LoginNout from 'pages/LoginNout';
import Register from 'pages/Register';
import Mypage from 'pages/Mypage';
import MyInfo from 'pages/MyInfo';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<OurTeam />} />
          <Route path="/login" element={<LoginNout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
