import Show from 'components/Show';
import { useRef, useState, useEffect } from 'react';
import CreateFeed from 'components/CreateFeed';
import { kindOfMenu } from 'shared/data';

function Main() {
  const [newFeed, setnewFeed] = useState(false);
  const newFeedArea = useRef(null);

  // Add: 모달창 끄기(x 버튼 or 새 글 등록하기 버튼 or 모달창 이외의 구역 클릭 시)
  const goBack = (e) => {
    return !newFeedArea.current.contains(e.target) ? setnewFeed(false) : null;
  };
  useEffect(() => {
    document.addEventListener('click', goBack);
    return () => {
      document.removeEventListener('click', goBack);
    };
  });

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p>새로운 소식을 빠르게!</p>
          <p>여러분의 이야기를 들려주세요!</p>
        </div>
        <div>New Speed</div>
      </header>
      <main style={{ display: 'flex', padding: '40px' }}>
        <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>
          <div>
            공지글
            {/* <Notice /> 들어갈 예정 - fakeData 생기면 */}
          </div>
          <div ref={newFeedArea}>
            <button onClick={() => setnewFeed(!newFeed)}>새 글 작성하기</button>
            {newFeed ? <CreateFeed setnewFeed={setnewFeed} /> : null}
          </div>
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
