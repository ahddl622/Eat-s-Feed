import Show from '../components/Show';
import { db } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import CreateFeed from 'components/CreateFeed';
import { makeNewFeed } from '../redux/modules/feedListReducer';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

function Main() {
  const [newFeed, setnewFeed] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div>
      Main
      <button onClick={() => setnewFeed(!newFeed)}>새 글 작성하기</button>
      {newFeed ? <CreateFeed /> : null}
      <Show />
    </div>
  );
}

export default Main;
