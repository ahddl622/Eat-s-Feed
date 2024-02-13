import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeNewFeed } from '../redux/modules/feedListReducer';

const useFeedData = () => {
  const dispatch = useDispatch();

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
};

export default useFeedData;
