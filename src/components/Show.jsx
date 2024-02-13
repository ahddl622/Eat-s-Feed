import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getformattedDate } from 'common/util';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { editContentHandeler } from 'store/modules/editedContentReducer';
import { changeEditDone, makeNewFeed, minusFeedCount, plusFeedCount } from 'store/modules/feedListReducer';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

function Show() {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);

  // 페이지가 mount 되자마자 db에 저장되어 있는 feedList 가져와서 자동생성된 id 부여하여 store에 저장
  // -> 그래야 store에 저장된 feedList대로 화면에 뿌릴 수 있음
  useEffect(() => {
    const fetchFeedData = async () => {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        const feed = { id: doc.id, ...doc.data() };
        newFeedArr.push(feed);
      });
      dispatch(makeNewFeed(newFeedArr));
    };
    fetchFeedData();
  }, [dispatch]);

  // myPage에서 수정 및 삭제 가능하지만 MainPage에서도 나열되어있는 피드 각각을 수정 및 삭제 가능하도록 함
  // 로그인 데이터 공유되면 내 id의 feed만 수정 및 삭제 가능하도록 할 예정
  const editFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const editDoneFeed = { ...foundFeed, content: editedContent, editDone: true };

      const feedRef = doc(db, 'feedList', foundFeed.id);
      await updateDoc(feedRef, editDoneFeed);

      const editDoneList = feedList.map((feed) => (feed.id === foundFeed.id ? editDoneFeed : feed));
      dispatch(makeNewFeed(editDoneList));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const deleteFeed = async (feedId) => {
    if (window.confirm("Eat's feed를 삭제하시겠습니까?")) {
      try {
        const foundFeed = feedList.find((feed) => feed.id === feedId);
        const feedRef = doc(db, 'feedList', foundFeed.id);
        await deleteDoc(feedRef);
        const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
        dispatch(makeNewFeed(restList));
      } catch (error) {
        alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
      }
    }
  };

  const plusCountFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const plusCountFeed = { ...foundFeed, feedCount: foundFeed.feedCount + 1 };

      const feedRef = doc(db, 'feedList', feedId);
      await updateDoc(feedRef, plusCountFeed);
      dispatch(plusFeedCount(feedId));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const minusCountFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const minusCountFeed = { ...foundFeed, feedCount: foundFeed.feedCount - 1 };

      const feedRef = doc(db, 'feedList', feedId);
      await updateDoc(feedRef, minusCountFeed);
      dispatch(minusFeedCount(feedId));
    } catch (error) {}
  };

  return (
    <>
      {feedList.map((feed) => (
        <div key={feed.id} style={{ width: '620px' }}>
          <div style={{ border: '1px solid black', margin: '10px' }}>
            <p style={{ fontSize: '20px', fontWeight: '600' }}>feed</p>
            <p>제목: {feed.title}</p> <br />
            <p>내용: {feed.content}</p>
            <div>
              <img src={feed.imgURL} alt="맛집소개사진" style={{ width: '500px', height: '500px' }}></img>
            </div>
            {feed.editDone ? (
              <>
                <button
                  onClick={() => {
                    dispatch(editContentHandeler(feed.content));
                    dispatch(changeEditDone(feed.id));
                  }}
                >
                  수정하기
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    editFeed(feed.id);
                  }}
                >
                  수정완료
                </button>
                <textarea
                  value={editedContent}
                  onChange={(e) => {
                    dispatch(editContentHandeler(e.target.value));
                  }}
                ></textarea>
              </>
            )}
            <button onClick={() => deleteFeed(feed.id)}>삭제하기</button>
            <div>
              <button onClick={() => plusCountFeed(feed.id)}>추천</button>
              <button onClick={() => minusCountFeed(feed.id)}>비추천</button>
              {feed.feedCount}
            </div>
            <p>최근 수정날짜: {getformattedDate(feed.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Show;
