import Show from 'components/Show';
import Banner from 'components/Banner';
import { kindOfMenu } from 'shared/data';
import CreateFeedBtn from 'common/CreateFeedBtn';
import Search from 'components/Search';
import Ranking from 'components/Ranking';
import { useState } from 'react';

function Main() {
  const [menu, setMenu] = useState('');
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Banner />
        <div>
          <p>새로운 맛집을 빠르게!</p>
          <p>숨은 맛집을 공유해주세요!</p>
        </div>
        <div>New Speed</div>
      </header>
      <main style={{ display: 'flex', padding: '40px' }}>
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
          <Ranking />
          <CreateFeedBtn />
        </div>
        <div>
          <Search />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 5px',
              backgroundColor: '#E0AED0'
            }}
          >
            {kindOfMenu.map((menu, idx) => {
              return (
                <button key={idx} value={kindOfMenu[idx]} onClick={(e) => setMenu(e.target.value)}>
                  {menu}
                </button>
              );
            })}
          </div>
          <Show menu={menu} />
        </div>
      </main>
    </div>
  );
}

export default Main;
