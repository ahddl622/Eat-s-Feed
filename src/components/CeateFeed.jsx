import { db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { myTitle } from 'store/modules/titleReducer';
import { myContent } from 'store/modules/contentReducer';
import { makeNewFeed } from 'store/modules/feedListReducer';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import FileUpload from '../components/FileUpload';

function CreateFeed({ setnewFeed }) {
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const newFeedArr = [];
    querySnapshot.forEach((doc) => {
      const feed = { id: doc.id, ...doc.data() };
      newFeedArr.push(feed);
      dispatch(makeNewFeed(newFeedArr));
    });
  };

  // 새 feed를 추가하려면 새 feed를 db에 추가한 뒤, 추가가 완료된 feedList를 db에서 가져와서 store에도 넣어줘야
  // -> db와 store 둘 다에 모두 추가가능
  const addFeed = async (event) => {
    event.preventDefault();
    if (title && content) {
      const newFeed = { title, content, createdAt: String(new Date()), editDone: true };
      const collectionRef = collection(db, 'feedList');
      await addDoc(collectionRef, newFeed);
      // **
      await fetchFeedData();
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
      <div>
        <button onClick={() => setnewFeed(false)}>x</button>
        <div>User사진</div>
        <div>
          여러분의 이야기를 들려주세요!
          <FileUpload />
        </div>
        제목: <input value={title} onChange={(e) => dispatch(myTitle(e.target.value))}></input> <br />
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
