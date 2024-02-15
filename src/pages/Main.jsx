import Show from 'components/Show';
// import Banner from 'components/Banner';
import { kindOfMenu } from 'shared/data';
import CreateFeedBtn from 'common/CreateFeedBtn';
import Search from 'components/Search';
import Ranking from 'components/Ranking';
import { useState } from 'react';
import styled from 'styled-components';
import MainBanner from 'components/MainBanner';

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
  border: 2px solid #ffe5e5;
  box-shadow: 0 0 15px #ffe5e5;
`;

const MainFeedDiv = styled.div`
  background-color: white;
  box-shadow: 0 0 20px #ffe5e5;
  border: 2px solid #ffe5e5;
  border-radius: 8px;
  width: 750px;
`;

const CategoryBtnWrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
`;

const CategoryBtn = styled.button`
  border: solid 1px #503178;
  border-radius: 10px;
  background-color: #756ab6;
  color: white;
  width: 120px;
  height: 35px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    background-color: #503178;
  }
`;

const ShowDiv = styled.div`
  margin: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 720px;
  border-radius: 15px;
`;

function Main() {
  const [menu, setMenu] = useState('');

  return (
    <div>
      {/* <Banner /> */}
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
                  {menu}
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
