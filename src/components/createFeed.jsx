import { db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { myTitle } from '../redux/modules/titleReducer';
import { myContent } from '../redux/modules/contentReducer';
import { makeNewFeed } from '../redux/modules/feedListReducer';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import FileUpload from './FileUpload';

function CreateFeed({ setNewFeed }) {
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const imgURL = useSelector((state) => state.imgURLReducer);
  // const count = useSelector((state) => state.countReducer);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    try {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        const feed = { id: doc.id, ...doc.data() };
        newFeedArr.push(feed);
      });
      dispatch(makeNewFeed(newFeedArr));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  // 새 feed를 추가하려면 새 feed를 db에 추가한 뒤, 추가가 완료된 feedList를 db에서 가져와서 store에도 넣어줘야
  // -> db와 store 둘 다에 모두 추가가능
  const addFeed = async (event) => {
    event.preventDefault();
    try {
      if (title && content) {
        const newFeed = { title, content, imgURL, feedCount: 0, createdAt: String(new Date()), editDone: true };
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
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  return (
    <div>
      <button onClick={() => setNewFeed(false)}>x</button>
      <div>User사진</div>
      <div>
        여러분의 맛집을 소개해주세요!
        <FileUpload />
      </div>
      제목:{' '}
      <input
        value={title}
        placeholder="맛집의 지역과 상호명을 기재해주세요"
        onChange={(e) => dispatch(myTitle(e.target.value))}
      ></input>
      <br />
      내용:
      <textarea
        value={content}
        placeholder="어떤 점이 좋았나요? 
      당신의 최애 메뉴는?"
        onChange={(e) => dispatch(myContent(e.target.value))}
      ></textarea>
      <button
        onClick={(event) => {
          addFeed(event);
        }}
      >
        저장하기
      </button>
    </div>
  );
}

export default CreateFeed;
