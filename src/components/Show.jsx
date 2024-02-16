import styled from 'styled-components';
import { getformattedDate } from 'components/common/util';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from '../firebaseConfig';
import { collection, query, getDocs, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { editContentHandeler } from 'store/modules/editedContentReducer';
import { estimateGood, estimateBad } from 'store/modules/loginProfileReducer';
import {
  changeEditDone,
  editFeedList,
  makeNewFeed,
  minusFeedCount,
  plusFeedCount
} from 'store/modules/feedListReducer';

export default function Show({ menu }) {
  const dispatch = useDispatch();
  const feedList = useSelector((state) => state.feedListReducer.feedList);
  const editedContent = useSelector((state) => state.editedContentReducer.editedContent);
  const loginProfile = useSelector((state) => state.loginProfileReducer);
  const [click, setClick] = useState({});

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

      const initialClick = newFeedArr.reduce((acc, feed) => {
        return {
          ...acc,
          [feed.id]: { good: 'F', bad: 'T' }
        };
      });
      setClick(initialClick);
    };
    fetchFeedData();
  }, [dispatch]);

  // myPage에서 수정 및 삭제 가능하지만 MainPage에서도 나열되어있는 피드 각각을 수정 및 삭제 가능하도록 함
  // 로그인 데이터 공유되면 내 id의 feed만 수정 및 삭제 가능하도록 할 예정
  const editFeed = async (feedId) => {
    try {
      const foundFeed = feedList.find((feed) => feed.id === feedId);
      const editDoneFeed = { ...foundFeed, content: editedContent, editDone: true, createdAt: String(new Date()) };

      const feedRef = doc(db, 'feedList', foundFeed.id);
      await updateDoc(feedRef, editDoneFeed);

      dispatch(editFeedList(editDoneFeed));
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

  const editGoodFeed = async (feedId) => {
    const profileRef = doc(db, 'profile', loginProfile.id);
    try {
      if (loginProfile.goodFeed.includes(feedId)) {
        console.log(loginProfile.goodFeed);
        const removedGoodFeed = loginProfile.goodFeed.filter((id) => id !== feedId);
        console.log(removedGoodFeed);
        await updateDoc(profileRef, { ...loginProfile, goodFeed: removedGoodFeed });
        dispatch(estimateGood(removedGoodFeed));
      } else {
        const addedGoodFeed = [...loginProfile.goodFeed, feedId];
        await updateDoc(profileRef, { ...loginProfile, goodFeed: addedGoodFeed });
        dispatch(estimateGood(addedGoodFeed));
      }
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const editBadFeed = async (feedId) => {
    const profileRef = doc(db, 'profile', loginProfile.id);
    try {
      if (loginProfile.badFeed.includes(feedId)) {
        const removedBadFeed = loginProfile.badFeed.filter((id) => id !== feedId);
        await updateDoc(profileRef, { ...loginProfile, goodFeed: removedBadFeed });
        dispatch(estimateBad(removedBadFeed));
      } else {
        const addedBadFeed = [...loginProfile.badFeed, feedId];
        await updateDoc(profileRef, { ...loginProfile, badFeed: addedBadFeed });
        dispatch(estimateBad(addedBadFeed));
      }
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  const clickGood = (feedId) => {
    const user = auth.currentUser;

    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
  
    if (loginProfile.goodFeed.includes(feedId)) {
      alert('이미 추천하셨습니다.');
    } else if (loginProfile.badFeed.includes(feedId)) {
      editGoodFeed(feedId);
      editBadFeed(feedId);
      plusCountFeed(feedId);
      setClick((prev) => ({ ...prev, [feedId]: { good: 'T', bad: 'T' } }));
    } else {
      editGoodFeed(feedId);
      plusCountFeed(feedId);
      setClick((prev) => ({ ...prev, [feedId]: { good: 'T', bad: 'T' } }));
    }
    
  };

  const clickBad = (feedId) => {
    const user = auth.currentUser;

    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (loginProfile.badFeed.includes(feedId)) {
      alert('이미 비추천하셨습니다.');
    } else if (loginProfile.goodFeed.includes(feedId)) {
      editGoodFeed(feedId);
      editBadFeed(feedId);
      minusCountFeed(feedId);
      setClick((prev) => ({ ...prev, [feedId]: { good: 'F', bad: 'F' } }));
    } else {
      editBadFeed(feedId);
      minusCountFeed(feedId);
      setClick((prev) => ({ ...prev, [feedId]: { good: 'F', bad: 'F' } }));
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
    } catch (error) {
      alert('데이터를 불러오지 못했습니다. 관리자에게 문의하세요.');
    }
  };

  return (
    <>
      {feedList
        .filter((feed) => (menu === '전체' || menu.length === 0 ? true : feed.category === menu))
        .map((feed) => (
          <FeedDiv key={feed.id}>
            <div>
              <FeedTitleP>{feed.title}</FeedTitleP>
              <FeednicknameP>
                #{feed.category} "{feed.nickname}"님이 알려주신 맛집
              </FeednicknameP>
              <FeedContentNImg>
                <FeedContentDiv>
                  <p>{feed.content}</p>
                </FeedContentDiv>
                <FeedFigure>
                  <FeedImg src={feed.imgURL} alt="맛집소개사진"></FeedImg>
                </FeedFigure>
              </FeedContentNImg>
              <BtnsDiv>
                {loginProfile.email === feed.email ? (
                  <div>
                    {feed.editDone ? (
                      <EditBtn
                        onClick={() => {
                          dispatch(editContentHandeler(feed.content));
                          dispatch(changeEditDone(feed.id));
                        }}
                      >
                        수정하기
                      </EditBtn>
                    ) : (
                      <>
                        <EditBtn
                          onClick={() => {
                            editFeed(feed.id);
                          }}
                        >
                          수정완료
                        </EditBtn>
                        <EditTextArea
                          value={editedContent}
                          onChange={(e) => {
                            dispatch(editContentHandeler(e.target.value));
                          }}
                        ></EditTextArea>
                      </>
                    )}
                    <DeleteBtn
                      onClick={() => {
                        deleteFeed(feed.id);
                      }}
                    >
                      삭제하기
                    </DeleteBtn>
                  </div>
                ) : null}
                {loginProfile.email !== feed.email ? (
                  <div>
                    <GoodBtn click={click[feed.id] && click[feed.id].good} onClick={() => clickGood(feed.id)}>
                      추천
                    </GoodBtn>
                    <BadBtn click={click[feed.id] && click[feed.id].bad} onClick={() => clickBad(feed.id)}>
                      비추천
                    </BadBtn>
                    ♥ {feed.feedCount}
                  </div>
                ) : null}
              </BtnsDiv>
              <LatestDateP>최근 수정날짜 {getformattedDate(feed.createdAt)}</LatestDateP>
            </div>
          </FeedDiv>
        ))}
    </>
  );
}

const FeedDiv = styled.div`
  width: 680px;
  padding: 20px 15px;
  margin: 10px;
  display: flex;
  justify-content: center;

  border: solid 1px #e0aed0;
  border-radius: 30px;
`;

const FeedTitleP = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: #503178;
`;

const FeednicknameP = styled.p`
  color: #503178;
  text-align: end;
`;

const FeedContentNImg = styled.div`
  margin: 10px 0;
  display: flex;
  gap: 15px;
`;

const FeedContentDiv = styled.div`
  width: 300px;
  padding: 15px;

  background-color: #fff4f5;
  border-radius: 30px;

  & p {
    line-height: 25px;
    color: #503178;
  }
`;

const FeedFigure = styled.figure`
  width: 300px;
  height: 280px;
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 30px;
  object-fit: cover;
`;

const BtnsDiv = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const DeleteBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 0 3px;

  color: white;
  background-color: #e0aed0;
  border: solid 1px #e0aed0;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;

const EditTextArea = styled.textarea`
  resize: none;
`;

const EditBtn = styled.button`
  height: 30px;
  width: 80px;
  margin: 0 3px;

  color: #e0aed0;
  background-color: white;
  border: solid 1px #e0aed0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const CountSection = styled.section`
  display: flex;
`;

const GoodBtn = styled.button`
  width: 80px;
  height: 30px;
  margin: 0 3px;

  color: #e0aed0;
  background-color: ${({ click }) => (click === 'T' ? '#756AB6' : 'white')};
  border: solid 1px #e0aed0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;
const BadBtn = styled.button`
  width: 80px;
  height: 30px;
  margin: 0 3px;

  color: #e0aed0;
  background-color: ${({ click }) => (click === 'F' ? '#756AB6' : 'white')};
  border: solid 1px #e0aed0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }
`;

const CountP = styled.p`
  padding-left: 5px;

  line-height: 30px;
  color: #e0aed0;
`;

const LatestDateP = styled.p`
  font-size: 14px;
  text-align: end;
  color: #ac87c5;
`;
