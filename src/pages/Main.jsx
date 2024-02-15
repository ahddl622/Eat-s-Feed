import Show from 'components/Show';
import { kindOfMenu } from 'shared/data';
import CreateFeedBtn from 'common/CreateFeedBtn';
import Search from 'components/Search';
import Ranking from 'components/Ranking';
import { useState } from 'react';
import styled from 'styled-components';
import MainBanner from 'components/MainBanner';
import { auth } from 'firebaseConfig';

const MainWrap = styled.main`
  display: flex;
  padding: 40px;
  justify-content: center;
  gap: 20px;
`;

const SideSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const RankBox = styled.div`
  width: 230px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px 10px;
  margin-bottom: 15px;

  background-color: white;
  border-radius: 40px;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
`;

const MainFeedDiv = styled.div`
  background-color: white;
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CategoryBtnWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 5px;
  margin-top: 10px;

  background-color: #e0aed0;
  border-radius: 20px;
`;

const CategoryBtn = styled.button`
  width: 120px;
  height: 35px;

  background-color: #e0aed0;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    color: #503178;
  }
`;

const ShowDiv = styled.div`
  margin-top: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  box-shadow: 3px 5px 12px 3px #ffe5e5;
  border-radius: 40px;
`;

function Main() {
  const [menu, setMenu] = useState('');
  console.log(auth.currentUser);
  return (
    <div>
      <MainBanner />
      <MainWrap>
        <SideSection>
          <RankBox>
            <Ranking />
          </RankBox>
          <CreateFeedBtn />
        </SideSection>
        <MainFeedDiv>
          <Search />
          <CategoryBtnWrapperDiv>
            {kindOfMenu.map((menu, idx) => {
              return (
                <CategoryBtn key={idx} value={kindOfMenu[idx]} onClick={(e) => setMenu(e.target.value)}>
                  #{menu}
                </CategoryBtn>
              );
            })}
          </CategoryBtnWrapperDiv>
          <ShowDiv>
            <Show menu={menu} />
          </ShowDiv>
        </MainFeedDiv>
      </MainWrap>
    </div>
  );
}

export default Main;
