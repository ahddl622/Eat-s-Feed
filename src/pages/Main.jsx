import Show from 'components/Show';
import Banner from 'components/Banner';
import { kindOfMenu } from 'shared/data';
import CreateFeedBtn from 'common/CreateFeedBtn';
import Search from 'components/Search';
import Ranking from 'components/Ranking';
import { useState } from 'react';
import styled from 'styled-components';

const MainWrap = styled.main`
  display: flex;
  padding: 40px;
  justify-content: center;
  gap: 30px;
`;

const SideDiv = styled.div`
  width: 250px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: white;
  border-radius: 8px;
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
  background-color: #756AB6;
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
      <Banner />
      <MainWrap>
        <SideDiv>
          <div>
            <Ranking />
          </div>
          <div>
            <CreateFeedBtn />
          </div>
        </SideDiv>

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
