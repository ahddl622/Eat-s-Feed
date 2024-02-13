import Show from '../components/Show';
import { kindOfMenu } from 'shared/data';
import CreateFeedBtn from 'common/CreateFeedBtn';
import Notice from 'components/Notice';

function Main() {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p>새로운 맛집을 빠르게!</p>
          <p>숨은 맛집을 공유해주세요!</p>
        </div>
        <div>New Speed</div>
      </header>
      <main style={{ display: 'flex', padding: '40px' }}>
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
          <Notice />
          <CreateFeedBtn />
        </div>
        <div>
          <div>검색기능</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 5px',
              backgroundColor: '#E0AED0'
            }}
          >
            {kindOfMenu.map((menu, idx) => {
              return <button key={idx}>{menu}</button>;
            })}
          </div>
          <Show />
        </div>
      </main>
    </div>
  );
}

export default Main;
