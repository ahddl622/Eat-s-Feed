import React from 'react';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { makeNewFeed } from '../redux/modules/feedListReducer';
import { myTitle } from '../redux/modules/titleReducer';
import { myContent } from '../redux/modules/contentReducer';
import { useDispatch, useSelector } from 'react-redux';

function CreateFeed() {
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const dispatch = useDispatch();

  const fetchFeedId = async () => {
    const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const newFeedArr = [];
    querySnapshot.forEach((doc) => {
      const feed = { id: doc.id, ...doc.data() };
      newFeedArr.push(feed);
      dispatch(makeNewFeed(newFeedArr));
    });
  };

  const addFeed = async (event) => {
    event.preventDefault();
    if (title && content) {
      const newFeed = { title, content, createdAt: String(new Date()), editDone: true };
      const collectionRef = collection(db, 'feedList');
      await addDoc(collectionRef, newFeed);
      // **
      await fetchFeedId();
      dispatch(myTitle(''));
      dispatch(myContent(''));
    }
    if (!title) {
      alert('제목을 입력해주세요');
    }
    if (!content) {
      alert('내용을 입력해주세요');
    }
  };

  return (
    <>
      <div>헤더</div>
      <div>
        <div>User사진</div>
        <div>
          여러분의 이야기를 들려주세요!
          <button>사진첨부하기</button>
        </div>
        제목: <input value={title} onChange={(e) => dispatch(myTitle(e.target.value))}></input>
        내용: <textarea value={content} onChange={(e) => dispatch(myContent(e.target.value))}></textarea>
        <button
          onClick={(event) => {
            addFeed(event);
          }}
        >
          저장하기
        </button>
      </div>
    </>
  );
}

export default CreateFeed;
