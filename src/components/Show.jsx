import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getformattedDate } from 'common/util';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { editContentHandeler } from '../redux/modules/editedContentReducer';
import { changeEditDone, makeNewFeed, plusFeedCount } from '../redux/modules/feedListReducer';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
// import { plusCount, minusCount } from '../redux/modules/countReducer';
// import seoulFoodData from "../"

function Show() {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);
  // const count = useSelector((state) => state.countReducer);

  // var xhr = new XMLHttpRequest();
  // var url = 'http://openapi.seoul.go.kr:8088/sample/json/CardSubwayStatsNew/1/5/20220301'; /* JSON URL */
  // xhr.open('GET', url);

  // xhr.onreadystatechange = function () {
  //   if (this.readyState === xhr.DONE) {
  //     if (xhr.status === 200 || xhr.status === 201) {
  //       var jsonResponse = JSON.parse(xhr.responseText);
  //       console.log(jsonResponse); // 여기서 jsonResponse를 활용하여 데이터 처리
  //     }
  //   }
  // };
  // xhr.send('');
  // const [data, setData] = useState(null);
  // const url = 'http://openapi.seoul.go.kr:8088/sample/json/CardSubwayStatsNew/1/5/20220301';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await seoulFood.json();
  //       if (!response.ok) {
  //         console.error('데이터를 불러올 수 없습니다.');
  //         return;
  //       }
  //       const jsonResponse = await response.json();
  //       console.log(jsonResponse);
  //       setData(jsonResponse);
  //     } catch (error) {
  //       console.error('데이터를 불러오지 못했습니다.', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
        dispatch(makeNewFeed(newFeedArr));
      });
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

      const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
      dispatch(makeNewFeed([...restList, editDoneFeed]));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const deleteFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const feedRef = doc(db, 'feedList', foundFeed.id);
      await deleteDoc(feedRef);
      const restList = feedList.filter((feed) => feed.id !== foundFeed.id);
      dispatch(makeNewFeed(restList));
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
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
              <button onClick={() => dispatch(plusFeedCount(feed.id))}>추천</button>
              {/* <button onClick={() => dispatch(minusCount())}>비추천</button> */}
              {feed.count}
            </div>
            <p>최근 수정날짜: {getformattedDate(feed.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Show;
