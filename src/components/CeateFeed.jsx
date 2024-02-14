import { auth, db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { myTitle } from 'store/modules/titleReducer';
import { myContent } from 'store/modules/contentReducer';
import { makeNewFeed } from 'store/modules/feedListReducer';
import { collection, query, getDocs, addDoc, orderBy } from 'firebase/firestore';
import FileUpload from './FileUpload';
import { useState } from 'react';

function CreateFeed({ setNewFeed }) {
  const title = useSelector((state) => state.titleReducer.title);
  const content = useSelector((state) => state.contentReducer.content);
  const imgURL = useSelector((state) => state.imgURLReducer);
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    try {
      const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const newFeedArr = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
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
    const user = auth.currentUser;
    try {
      if (user && title && content) {
        const newFeed = {
          email: auth.currentUser.email,
          title,
          content,
          imgURL,
          feedCount: 0,
          createdAt: String(new Date()),
          editDone: true,
          uid: user.uid,
          category
        };
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
      if(!user) {
        alert('글 작성을 위해 로그인 해주세요')
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
      <div>
        <label>음식의 카테고리를 선택해주세요</label>
        <select onChange={(e) => setCategory(e.target.options[e.target.options.selectedIndex].value)}>
          <option defaultValue>메뉴</option>
          <option value="일식">일식</option>
          <option value="중식">중식</option>
          <option value="양식">양식</option>
          <option value="아시안">아시안</option>
          <option value="디저트">디저트</option>
        </select>
      </div>
      <button
        onClick={(e) => {
          addFeed(e);
        }}
      >
        저장하기
      </button>
    </div>
  );
}

export default CreateFeed;
