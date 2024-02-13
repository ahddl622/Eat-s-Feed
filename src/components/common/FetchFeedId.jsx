import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { makeNewFeed } from '../redux/modules/feedListReducer';

export const FetchFeedId = async () => {
  const dispatch = useDispatch();

  const q = query(collection(db, 'feedList'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);

  const newFeedArr = [];
  querySnapshot.forEach((doc) => {
    const feed = { id: doc.id, ...doc.data() };
    console.log(feed);
    newFeedArr.push(feed);
  });
  dispatch(makeNewFeed(newFeedArr));
};

export default FetchFeedId;
