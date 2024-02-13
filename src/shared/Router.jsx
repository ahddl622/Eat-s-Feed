import Layout from 'components/Layout';
import LoginNout from 'pages/LoginNout';
import Main from 'pages/Main';
import MyInfo from 'pages/MyInfo';
import Mypage from 'pages/Mypage';
import OurTeam from 'pages/OurTeam';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function Router() {
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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
