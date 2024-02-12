import { db } from '../firebaseConfig';
import { getformattedDate } from 'common/date';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { editContentHandeler } from '../redux/modules/editedContentReducer';
import { changeEditDone, makeNewFeed } from '../redux/modules/feedListReducer';

function Show() {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);

  const editFeed = async (feedId) => {
    const foundFeed = feedList.find((feed) => feed.id === feedId);
    const editDoneFeed = { ...foundFeed, content: editedContent, editDone: true };

    const feedRef = doc(db, 'feedList', foundFeed.id);
    await updateDoc(feedRef, editDoneFeed);

    const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
    dispatch(makeNewFeed([...restList, editDoneFeed]));
  };

  const deleteFeed = async (feedId) => {
    const foundFeed = feedList.find((feed) => feed.id === feedId);
    const feedRef = doc(db, 'feedList', foundFeed.id);
    await deleteDoc(feedRef);
    const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
    dispatch(makeNewFeed(restList));
  };

  return (
    <>
      {feedList.map((feed) => (
        <div key={feed.id}>
          <div style={{ border: '1px solid black' }}>
            <p style={{ fontSize: '20px', fontWeight: '600' }}>feed</p>
            <p>제목: {feed.title}</p> <br />
            <p>내용: {feed.content}</p>
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
            <p>최근 수정날짜: {getformattedDate(feed.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Show;
